import os
from app.providers.transcription.base import TranscriptionProvider
from app.providers.transcription.mock import MockTranscriptionProvider
from app.providers.transcription.provider import RealTranscriptionProvider

def get_transcription_provider() -> TranscriptionProvider:
    provider_type = os.getenv("TRANSCRIPTION_PROVIDER", "mock").lower()

    if provider_type == "mock":
        return MockTranscriptionProvider()
    elif provider_type in ("provider", "whisper", "gemini", "openai"):
        return RealTranscriptionProvider()
    else:
        raise ValueError(f"Unsupported TRANSCRIPTION_PROVIDER: {provider_type}")
