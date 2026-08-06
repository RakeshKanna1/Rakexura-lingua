from app.providers.translation.factory import get_translation_provider

class LanguageTranslationService:
    def __init__(self):
        self.provider = get_translation_provider()

    async def translate_text(self, text: str, source_lang: str, target_lang: str) -> tuple[str, str]:
        result = await self.provider.translate(text, source_lang, target_lang)
        return result.translation, result.detected_language or "HINGLISH DETECTED"

translation_service = LanguageTranslationService()
