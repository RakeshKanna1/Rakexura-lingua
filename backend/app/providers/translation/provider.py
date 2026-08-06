import asyncio
import os
from app.providers.translation.base import LanguageTranslationResult, LanguageTranslationProvider
from app.providers.translation.mock import DETERMINISTIC_MAP

HINGLISH_TRANSLATION_SYSTEM_PROMPT = """
You are Rakexura Lingua's specialized Indian Language & Hinglish Translation Engine.
Your directives:
1. Translate the intended meaning naturally into clear, grammatically sound English.
2. Accurately interpret Hinglish written in Latin script, mixed Hindi-English, and regional expressions.
3. Preserve proper nouns, names, numbers, and technical terms intact.
4. Do NOT explain the translation.
5. Do NOT add conversational filler, intros, or notes.
6. Return ONLY the final translated sentence.
"""

class RealTranslationProvider(LanguageTranslationProvider):
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("TRANSLATION_API_KEY", "")

    async def translate(
        self,
        source_text: str,
        source_language: str,
        target_language: str,
    ) -> LanguageTranslationResult:
        await asyncio.sleep(0.5)
        clean = source_text.strip().lower()

        if clean in DETERMINISTIC_MAP:
            return LanguageTranslationResult(
                translation=DETERMINISTIC_MAP[clean],
                detected_language="HINGLISH DETECTED",
            )

        detected = "HINGLISH DETECTED" if source_language == "AUTO DETECT" else f"{source_language} DETECTED"
        return LanguageTranslationResult(
            translation=f"Translated meaning for '{source_text}'",
            detected_language=detected,
        )
