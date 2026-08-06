from dataclasses import dataclass
from pathlib import Path
from typing import Protocol, Optional

@dataclass
class TranscriptionResult:
    transcript: str
    detected_language: Optional[str] = None
    duration_ms: Optional[int] = None

class TranscriptionProvider(Protocol):
    async def transcribe(
        self,
        audio_path: Path,
        mime_type: str,
    ) -> TranscriptionResult:
        ...
