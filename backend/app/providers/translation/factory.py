import os
from app.providers.translation.base import LanguageTranslationProvider
from app.providers.translation.mock import MockTranslationProvider
from app.providers.translation.provider import RealTranslationProvider

def get_translation_provider() -> LanguageTranslationProvider:
    provider_type = os.getenv("TRANSLATION_PROVIDER", "mock").lower()

    if provider_type == "mock":
        return MockTranslationProvider()
    elif provider_type in ("provider", "gemini", "openai", "deepl"):
        return RealTranslationProvider()
    else:
        raise ValueError(f"Unsupported TRANSLATION_PROVIDER: {provider_type}")
