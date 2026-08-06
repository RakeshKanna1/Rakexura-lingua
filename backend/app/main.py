from fastapi import FastAPI, Request, status as http_status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from app.core.config import settings
from app.core.logging import logger
from app.core.errors import TranslationAPIException
from app.api import translate
from app.services.transcription import transcription_service
from app.services.translation import translation_service

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

cors_origins = (
    settings.BACKEND_CORS_ORIGINS
    if isinstance(settings.BACKEND_CORS_ORIGINS, list)
    else [settings.BACKEND_CORS_ORIGINS]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

@app.exception_handler(TranslationAPIException)
async def custom_translation_exception_handler(request: Request, exc: TranslationAPIException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "requestId": request.headers.get("x-request-id", "unknown"),
        },
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content={
            "success": False,
            "error": {
                "code": "UNSUPPORTED_AUDIO",
                "message": "Invalid or missing translation request payload parameters.",
            },
            "requestId": request.headers.get("x-request-id", "unknown"),
        },
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global Exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": {
                "code": "SERVER_ERROR",
                "message": "Translation service unavailable.",
            },
            "requestId": request.headers.get("x-request-id", "unknown"),
        },
    )

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": settings.PROJECT_NAME}

@app.get("/ready")
async def readiness_check():
    transcription_ready = hasattr(transcription_service, "provider") and transcription_service.provider is not None
    translation_ready = hasattr(translation_service, "provider") and translation_service.provider is not None

    all_ready = transcription_ready and translation_ready

    response_data = {
        "status": "ready" if all_ready else "not_ready",
        "service": settings.PROJECT_NAME,
        "services": {
            "transcription": "ready" if transcription_ready else "unavailable",
            "translation": "ready" if translation_ready else "unavailable",
        },
    }

    if not all_ready:
        return JSONResponse(status_code=http_status.HTTP_503_SERVICE_UNAVAILABLE, content=response_data)

    return response_data

app.include_router(translate.router, prefix=settings.API_V1_STR, tags=["Translation"])
