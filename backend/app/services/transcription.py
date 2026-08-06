from pathlib import Path
from app.providers.transcription.factory import get_transcription_provider

class SpeechTranscriptionService:
    def __init__(self):
        self.provider = get_transcription_provider()

    async def transcribe_audio(self, audio_path: Path, mime_type: str) -> str:
        result = await self.provider.transcribe(audio_path, mime_type)
        return result.transcript

transcription_service = SpeechTranscriptionService()
