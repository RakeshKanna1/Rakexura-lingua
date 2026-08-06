import asyncio
from pathlib import Path
from app.providers.transcription.base import TranscriptionResult, TranscriptionProvider

class MockTranscriptionProvider(TranscriptionProvider):
    async def transcribe(
        self,
        audio_path: Path,
        mime_type: str,
    ) -> TranscriptionResult:
        await asyncio.sleep(0.4)
        return TranscriptionResult(
            transcript="Bhai game download ho gaya lekin open nahi ho raha",
            detected_language="HINGLISH",
            duration_ms=4500,
        )
