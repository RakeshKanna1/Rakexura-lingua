import os
import re
import time
import uuid
import tempfile
from pathlib import Path
from fastapi import APIRouter, File, UploadFile, Form, Header, Request, Response, HTTPException, status
from app.schemas.translation import TextTranslationPayload, TranslationResponseBody, TranslationResponseData
from app.services.transcription import transcription_service
from app.services.translation import translation_service
from app.core.logging import log_api_event
from app.core.errors import unsupported_audio_exception, audio_too_large_exception, speech_interpretation_exception
from app.core.rate_limit import rate_limiter

router = APIRouter()

ALLOWED_EXTENSIONS = {".mp3", ".wav", ".m4a", ".webm", ".ogg"}
ALLOWED_MIME_TYPES = {
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/mp4",
    "audio/m4a",
    "audio/x-m4a",
    "audio/webm",
    "audio/ogg",
    "application/ogg",
    "application/octet-stream",  # Fallback for browser blob uploads
}

MAX_FILE_SIZE = 25 * 1024 * 1024  # 25 MB
CHUNK_SIZE = 1024 * 1024  # 1 MB chunk

def sanitize_request_id(req_id: str | None) -> str:
    """Sanitize client-provided request ID to prevent header injection or path traversal."""
    if not req_id:
        return f"req_{uuid.uuid4().hex[:8]}"
    clean_id = re.sub(r"[^a-zA-Z0-9_\-]", "", req_id)[:64]
    return clean_id if clean_id else f"req_{uuid.uuid4().hex[:8]}"

def validate_audio_header(header_bytes: bytes, extension: str) -> bool:
    if not header_bytes:
        return False
    if extension == ".wav" and header_bytes.startswith(b"RIFF"):
        return True
    if extension == ".mp3" and (header_bytes.startswith(b"ID3") or header_bytes.startswith(b"\xff\xfb") or header_bytes.startswith(b"\xff\xf3")):
        return True
    if extension == ".ogg" and header_bytes.startswith(b"OggS"):
        return True
    if extension == ".webm" and header_bytes.startswith(b"\x1a\x45\xdf\xa3"):
        return True
    if extension == ".m4a" and (b"ftyp" in header_bytes[:20]):
        return True
    return True

@router.post("/translate/text", response_model=TranslationResponseBody)
async def translate_text_endpoint(
    payload: TextTranslationPayload,
    request: Request,
    response: Response,
    x_request_id: str = Header(None)
):
    rate_limiter.check_rate_limit(request, "text", response)

    start_time = time.time()
    request_id = sanitize_request_id(payload.requestId or x_request_id)

    if await request.is_disconnected():
        log_api_event("translation_text_cancelled", request_id, "text", 0)
        raise HTTPException(status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Client disconnected")

    translated, detected = await translation_service.translate_text(
        payload.text, payload.sourceLanguage, payload.targetLanguage
    )

    duration_ms = (time.time() - start_time) * 1000
    log_api_event("translation_text_completed", request_id, "text", duration_ms)

    return TranslationResponseBody(
        success=True,
        data=TranslationResponseData(
            requestId=request_id,
            detectedLanguage=detected,
            translation=translated,
            transcript=payload.text,
            processingTimeMs=duration_ms,
        )
    )

@router.post("/translate/audio", response_model=TranslationResponseBody)
async def translate_audio_endpoint(
    request: Request,
    response: Response,
    file: UploadFile = File(...),
    mode: str = Form("voice"),
    sourceLanguage: str = Form("AUTO DETECT"),
    targetLanguage: str = Form("ENGLISH"),
    x_request_id: str = Header(None)
):
    rate_limiter.check_rate_limit(request, mode, response)

    start_time = time.time()
    request_id = sanitize_request_id(x_request_id)

    # Extension Validation
    ext = "." + file.filename.split(".")[-1].lower() if "." in file.filename else ".webm"
    if ext and ext not in ALLOWED_EXTENSIONS:
        log_api_event("translation_audio_failed", request_id, mode, 0, "UNSUPPORTED_EXTENSION")
        raise unsupported_audio_exception()

    # Content-Type Validation
    if file.content_type and file.content_type.lower() not in ALLOWED_MIME_TYPES:
        log_api_event("translation_audio_failed", request_id, mode, 0, "UNSUPPORTED_MIME")
        raise unsupported_audio_exception()

    # Disk-Streamed Temporary File Creation
    temp_file = tempfile.NamedTemporaryFile(suffix=ext, delete=False)
    temp_path = Path(temp_file.name)
    total_size = 0
    header_sample = b""

    try:
        while chunk := await file.read(CHUNK_SIZE):
            if await request.is_disconnected():
                log_api_event("translation_audio_cancelled", request_id, mode, 0)
                raise HTTPException(status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Client disconnected")

            total_size += len(chunk)
            if total_size > MAX_FILE_SIZE:
                log_api_event("translation_audio_failed", request_id, mode, 0, "FILE_TOO_LARGE")
                raise audio_too_large_exception()

            if not header_sample:
                header_sample = chunk[:32]

            temp_file.write(chunk)

        temp_file.close()

        # Header Magic Bytes Validation
        if not validate_audio_header(header_sample, ext):
            log_api_event("translation_audio_failed", request_id, mode, 0, "INVALID_MAGIC_BYTES")
            raise unsupported_audio_exception()

        # Transcription & Translation
        transcript = await transcription_service.transcribe_audio(temp_path, file.content_type or "audio/webm")
        if not transcript:
            raise speech_interpretation_exception()

        translated, detected = await translation_service.translate_text(
            transcript, sourceLanguage, targetLanguage
        )

        duration_ms = (time.time() - start_time) * 1000
        log_api_event("translation_audio_completed", request_id, mode, duration_ms)

        return TranslationResponseBody(
            success=True,
            data=TranslationResponseData(
                requestId=request_id,
                detectedLanguage=detected,
                transcript=transcript,
                translation=translated,
                processingTimeMs=duration_ms,
            )
        )
    finally:
        if temp_path.exists():
            try:
                os.remove(temp_path)
            except OSError:
                pass
