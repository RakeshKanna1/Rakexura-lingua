import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, outputLanguage } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'text' parameter." }, { status: 400 });
    }

    const isHindi = /[\u0900-\u097f]/.test(text);
    const isHinglish = /\b(bhai|karo|bhejo|chahiye|kya|hai|kab|rha|hu)\b/i.test(text);
    const detected = isHindi ? "Hindi" : isHinglish ? "Hinglish" : "English";

    return NextResponse.json({
      success: true,
      data: {
        detected_language: detected,
        cleaned_text: text.trim(),
        translated_text: outputLanguage === "English" ? "Bro, please update on the order status." : "Bhai order status update kar do.",
        simple_meaning: "User is asking for an update regarding their order.",
        suggested_reply: "I have updated your order status in our system.",
        intent: "Order Status Inquiry",
        sentiment: "Neutral"
      }
    });
  } catch (err: unknown) {
    console.error("Translation API error", err);
    return NextResponse.json({ error: "Failed to process translation request." }, { status: 500 });
  }
}

