import { useState, useCallback } from "react";
import { GoogleGenAI } from "@google/genai";
import { searchProjects } from "./projectSearch";
import { buildAIContext } from "./buildContext";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function streamText(text: string, cb: (t: string) => void) {
  const words = text.split(" ");
  let out = "";

  for (let i = 0; i < words.length; i++) {
    out += (i === 0 ? "" : " ") + words[i];
    cb(out);
    await sleep(15);
  }
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      /* =========================
         🔍 STEP 1: FIND PROJECTS
      ========================= */
      const matchedProjects = searchProjects(text);

      /* =========================
         🧠 STEP 2: BUILD CONTEXT
      ========================= */
      const prompt = buildAIContext(text, matchedProjects);

      /* =========================
         🤖 GEMINI CALL
      ========================= */
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const aiText = response.text || "No response";

      /* =========================
         💬 STREAM OUTPUT
      ========================= */
      const assistantId = crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ]);

      await streamText(aiText, (val) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: val } : m
          )
        );
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
}