from fastapi import HTTPException, status

class TranslationAPIException(HTTPException):
    def __init__(self, status_code: int, code: str, message: str, details: dict = None):
        super().__init__(
            status_code=status_code,
            detail={
                "code": code,
                "message": message,
                "details": details or {},
            },
        )

def unsupported_audio_exception():
    return TranslationAPIException(
        status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
        code="UNSUPPORTED_AUDIO",
        message="Unsupported audio format. Use MP3, WAV, M4A, WEBM, or OGG.",
    )

def audio_too_large_exception():
    return TranslationAPIException(
        status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
        code="FILE_TOO_LARGE",
        message="Audio file exceeds maximum size limit of 25 MB.",
    )

def speech_interpretation_exception():
    return TranslationAPIException(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        code="UNABLE_TO_INTERPRET",
        message="Unable to interpret speech. Please speak clearly and try again.",
    )
