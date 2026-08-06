from typing import Optional
from pydantic import BaseModel, Field

class TextTranslationPayload(BaseModel):
    requestId: Optional[str] = Field(None, description="Unique request identifier")
    mode: str = Field("text", description="Input mode: text | voice | upload")
    sourceLanguage: str = Field("AUTO DETECT", description="Source language selection")
    targetLanguage: str = Field("ENGLISH", description="Target language selection")
    text: str = Field(..., min_length=1, max_length=2000, description="Source text to translate")

class TranslationResponseData(BaseModel):
    requestId: str
    detectedLanguage: str
    transcript: Optional[str] = None
    translation: str
    sourceText: Optional[str] = None
    processingTimeMs: float

class TranslationResponseBody(BaseModel):
    success: bool = True
    data: TranslationResponseData

class ErrorResponseBody(BaseModel):
    success: bool = False
    error: dict
    requestId: str
