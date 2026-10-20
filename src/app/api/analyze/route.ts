import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      imageBase64,
      mimeType = "image/jpeg",
      courseNames = [],
      customPrompt = "",
      apiKey: userApiKey,
      lang = "tr",
    } = body;

    const apiKey = userApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            lang === "en"
              ? "Gemini API Key missing. Please click Settings to configure your key."
              : lang === "es"
              ? "Falta la clave API de Gemini. Por favor haz clic en Ajustes para configurarla."
              : "Gemini API anahtarı bulunamadı. Lütfen sağ üstteki 'Ayarlar' ikonundan anahtarınızı girin.",
        },
        { status: 400 }
      );
    }

    if (!imageBase64) {
      return NextResponse.json(
        {
          error:
            lang === "en"
              ? "Please provide an image."
              : lang === "es"
              ? "Por favor proporciona una imagen."
              : "Lütfen analiz edilecek bir görsel yükleyin.",
        },
        { status: 400 }
      );
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, "");

    const coursesContext =
      courseNames && courseNames.length > 0
        ? `Existing courses list: ${courseNames.join(", ")}.`
        : "";

    const langInstruction =
      lang === "en"
        ? "Respond strictly in English. Generate an English title, course suggestion, full text transcription, summary, keyPoints, and examTips."
        : lang === "es"
        ? "Responde estrictamente en español. Genera título, materia sugerida, transcripción completa, resumen, keyPoints y examTips en español."
        : "Yanıtı tamamen Türkçe üret. Başlık, ders adı önerisi, tam metin, özet, önemli maddeler ve sınav tüyolarını Türkçe yaz.";

    const systemPrompt = `You are an expert Academic Study and Lecture Note Assistant.
Your tasks:
1. Accurately transcribe all handwritten or printed text, board diagrams, and formulas from the image (OCR).
2. Format mathematical and scientific formulas in clean LaTeX / KaTeX format (e.g. $E=mc^2$ or $$\\int_a^b f(x)dx$$).
3. Thoroughly analyze the extracted content and return a structured JSON response.
4. ${langInstruction}

Expected JSON Schema:
{
  "title": "Clear, concise lecture topic title",
  "courseName": "Best matching course name (Pick from ${coursesContext} if applicable, otherwise propose a concise subject name)",
  "rawText": "Exact, complete transcription of text, equations, and board notes from the image, neatly formatted with markdown headings/bullet points",
  "summary": "High-yield executive summary explaining the main lecture concepts clearly in 2-3 minutes",
  "keyPoints": [
    "Key takeaway or formula 1",
    "Key takeaway or formula 2",
    "Key takeaway or formula 3"
  ],
  "examTips": [
    "Likely exam question or common student pitfall 1",
    "Likely exam question or critical step to watch out for 2"
  ],
  "tags": ["Tag1", "Tag2", "Tag3"]
}

Strict Rules:
- Return ONLY valid JSON. No conversational text or markdown code fences outside JSON.
- Handle messy or partially erased handwriting by inferring academic context accurately.
${customPrompt ? `User custom instruction: ${customPrompt}` : ""}`;

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: mimeType || "image/jpeg",
                data: cleanBase64,
              },
            },
            {
              text: systemPrompt,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "";
    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse JSON response from AI.");
      }
    }

    return NextResponse.json({
      success: true,
      data: parsedResult,
    });
  } catch (error: any) {
    console.error("Gemini OCR Analysis Error:", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "An error occurred while analyzing the image. Please verify your Gemini API key.",
      },
      { status: 500 }
    );
  }
}
