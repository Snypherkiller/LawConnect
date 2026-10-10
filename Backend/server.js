
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.disable("x-powered-by");

const allowedOrigins = (
  process.env.FRONTEND_ORIGINS ||
  "http://localhost:5173,https://snypherkiller.github.io"
)
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json({ limit: "100kb" }));

const SYSTEM_PROMPT = `
You are LawConnect AI, an assistant that provides
general legal information for tourists in Sri Lanka.

Explain Sri Lankan tourist-related laws and procedures
in clear, simple English.

You can help with:
- Tourist visas and immigration
- Driving licences and vehicle rentals
- Police interactions and tourist safety
- Consumer rights and common tourist legal questions

Important rules:
- Provide general information, not professional legal advice.
- Never invent laws, penalties, citations or regulations.
- Explain uncertainty when information may be outdated.
- Recommend official Sri Lankan government sources
  when verification is needed.
- Do not claim you have checked current laws unless
  you have actually verified them.
- Be friendly, concise and professional.
`;

app.get("/", (req, res) => {
  res.json({
    name: "LawConnect API",
    status: "running",
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from the LawConnect Backend!",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "LawConnect Gemini API",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body || {};

    if (
      !Array.isArray(messages) ||
      messages.length === 0 ||
      messages.length > 30
    ) {
      return res.status(400).json({
        error: "Please provide between 1 and 30 messages.",
      });
    }

    const validMessages = messages.every(
      (message) =>
        message &&
        ["user", "assistant"].includes(message.role) &&
        typeof message.content === "string" &&
        message.content.trim().length > 0 &&
        message.content.length <= 4000
    );

    if (!validMessages) {
      return res.status(400).json({
        error: "Invalid message format.",
      });
    }

    if (messages[messages.length - 1].role !== "user") {
      return res.status(400).json({
        error: "The last message must be from the user.",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: "Gemini API key is not configured.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const conversation = messages.filter(
      (message, index) =>
        !(index === 0 && message.role === "assistant")
    );

    const contents = conversation.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content.trim() }],
    }));

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.3,
        maxOutputTokens: 1200,
      },
    });

    const reply = response.text?.trim();

    if (!reply) {
      return res.status(502).json({
        error: "Gemini returned an empty response.",
      });
    }

    return res.json({ reply });
  } catch (error) {
    console.error("Gemini request failed:", error);

    if (Number(error?.status) === 429) {
      return res.status(429).json({
        error: "AI service is busy. Please try again later.",
      });
    }

    return res.status(500).json({
      error: "Unable to generate an AI response.",
    });
  }
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`LawConnect API running on port ${PORT}`);
  });
}
