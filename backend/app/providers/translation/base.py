from dataclasses import dataclass
from typing import Protocol, Optional

@dataclass
class LanguageTranslationResult:
    translation: str
    detected_language: Optional[str] = None

class LanguageTranslationProvider(Protocol):
    async def translate(
        self,
        source_text: str,
        source_language: str,
        target_language: str,
    ) -> LanguageTranslationResult:
        ...
