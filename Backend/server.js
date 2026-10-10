
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

const allowedOrigins = (
  process.env.FRONTEND_ORIGINS ||
  "http://localhost:5173,https://snypherkiller.github.io"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "100kb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later.",
  },
});

app.use("/api/chat", limiter);

const SYSTEM_PROMPT = `
You are LawConnect AI, a helpful legal information assistant
for tourists visiting Sri Lanka.

Your responsibilities:
- Explain general Sri Lankan legal information in simple English.
- Help visitors understand visa rules, driving regulations,
  vehicle rentals, police procedures, and tourist safety.
- Provide practical guidance and clear explanations.
- Be polite, professional, and easy to understand.
- Clearly distinguish general information from legal advice.
- Do not invent laws, penalties, government requirements,
  official citations, or legal procedures.
- Do not claim that information has been officially verified
  unless an actual verification process has occurred.
- When uncertain, explain the uncertainty and recommend
  checking the relevant Sri Lankan government authority.
- For emergencies, recommend contacting the appropriate
  local emergency services.
- Never pretend to be a lawyer.

Use readable paragraphs and short lists when useful.
`;

app.get("/", (req, res) => {
  res.json({
    name: "LawConnect API",
    status: "running",
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

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing");

      return res.status(503).json({
        error: "AI service is not configured.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    // Exclude the frontend's static welcome message.
    const conversation = messages.filter(
      (message, index) =>
        !(
          index === 0 &&
          message.role === "assistant"
        )
    );

    const contents = conversation.map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: message.content.trim(),
        },
      ],
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
        error: "The AI returned an empty response.",
      });
    }

    return res.json({
      reply,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    const status = error?.status || error?.code;

    if (status === 429 || status === "429") {
      return res.status(429).json({
        error: "AI service is busy. Please try again later.",
      });
    }

    return res.status(500).json({
      error: "Unable to generate a response right now.",
    });
  }
});

// Local development only.
// Vercel imports the exported Express app.
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`LawConnect API running on port ${PORT}`);
  });
}

export default app;
