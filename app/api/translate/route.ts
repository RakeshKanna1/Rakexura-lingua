import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const requestId = req.headers.get("x-request-id") || `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  try {
    const contentType = req.headers.get("content-type") || "";

    // Handle Multipart Form Data (Voice / Upload Mode)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const fileOrBlob = formData.get("file") as File | null;

      if (!fileOrBlob) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "UNSUPPORTED_AUDIO",
              message: "No audio file or recording payload received.",
            },
            requestId,
          },
          { status: 400 }
        );
      }

      if (fileOrBlob.size > 25 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: "FILE_TOO_LARGE",
              message: "Uploaded audio exceeds maximum size limit of 25 MB.",
            },
            requestId,
          },
          { status: 413 }
        );
      }

      const mockTranscript = "Kab tak delivery ho jayega?";
      return NextResponse.json({
        success: true,
        data: {
          requestId,
          detectedLanguage: "HINGLISH AUDIO DETECTED",
          transcript: mockTranscript,
          translation: "When will it be delivered?",
          simpleMeaning: "Customer is asking about estimated delivery date.",
          suggestedReply: "Aapka order 2-3 din me deliver ho jayega. (Your order will be delivered in 2-3 days.)",
          intent: "Order Inquiry",
          sentiment: "Neutral",
          processingTimeMs: Date.now() - startTime,
        },
      });
    }

    // Handle JSON Data (Text Mode)
    const body = await req.json();
    const { mode, sourceLanguage, targetLanguage, text } = body;

    if (mode === "text" && (!text || !text.trim())) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "EMPTY_INPUT",
            message: "Input text is required for translation.",
          },
          requestId,
        },
        { status: 400 }
      );
    }

    const trimmed = (text || "").trim();
    const isHindi = /[\u0900-\u097f]/.test(trimmed);
    const isHinglish = /\b(bhai|karo|bhejo|chahiye|kya|hai|kab|rha|hu)\b/i.test(trimmed);
    const detected = isHindi ? "HINDI" : isHinglish ? "HINGLISH" : "ENGLISH";

    return NextResponse.json({
      success: true,
      data: {
        requestId,
        detectedLanguage: sourceLanguage === "AUTO DETECT" || !sourceLanguage ? `${detected} DETECTED` : `${sourceLanguage} DETECTED`,
        transcript: trimmed,
        translation: targetLanguage === "ENGLISH" ? `Bro, please check my order status.` : `Bhai please order status check karo.`,
        simpleMeaning: "Customer is requesting an update on their order.",
        suggestedReply: "Sure, please share your order ID so we can update you. (Ji, kripya apna order ID share kariye.)",
        intent: "Order Status Inquiry",
        sentiment: "Neutral",
        processingTimeMs: Date.now() - startTime,
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "An internal translation error occurred.",
          details: process.env.NODE_ENV === "development" ? error.message : undefined,
        },
        requestId,
      },
      { status: 500 }
    );
  }
}

