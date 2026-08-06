import asyncio
from app.providers.translation.base import LanguageTranslationResult, LanguageTranslationProvider

DETERMINISTIC_MAP = {
    "kal meeting kitne baje hai?": "What time is the meeting tomorrow?",
    "kal meeting kitne baje hai": "What time is the meeting tomorrow?",
    "bhai abhi aa raha hoon.": "I'm coming now.",
    "bhai abhi aa raha hoon": "I'm coming now.",
    "mujhe thoda late ho sakta hai.": "I might be a little late.",
    "mujhe thoda late ho sakta hai": "I might be a little late.",
    "aaj office jaana hai kya?": "Do we need to go to the office today?",
    "aaj office jaana hai kya": "Do we need to go to the office today?",
    "bhai game download ho gaya lekin open nahi ho raha": "Brother, the game is downloaded but it is not opening.",
    "game download ho gaya but open nahi ho raha": "The game downloaded but it's not opening.",
}

class MockTranslationProvider(LanguageTranslationProvider):
    async def translate(
        self,
        source_text: str,
        source_language: str,
        target_language: str,
    ) -> LanguageTranslationResult:
        await asyncio.sleep(0.3)
        clean = source_text.strip().lower()

        if clean in DETERMINISTIC_MAP:
            return LanguageTranslationResult(
                translation=DETERMINISTIC_MAP[clean],
                detected_language="HINGLISH DETECTED",
            )

        detected = "HINGLISH DETECTED" if source_language == "AUTO DETECT" else f"{source_language} DETECTED"
        return LanguageTranslationResult(
            translation=f"Development preview: translated meaning for '{source_text}'",
            detected_language=detected,
        )
