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

/* =========================
   STREAM SIMULATION
========================= */
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

/* =========================
   MAIN HOOK
========================= */
export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     SEND MESSAGE
  ========================= */
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
         PROJECT SEARCH
      ========================= */
      const matchedProjects = searchProjects(text);

      /* =========================
         BUILD PROMPT
      ========================= */
      const prompt = buildAIContext(text, matchedProjects);

      /* =========================
         GEMINI CALL
      ========================= */
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const aiText = response.text || "No response";

      /* =========================
         ADD EMPTY AI MESSAGE FIRST
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

      /* =========================
         STREAM OUTPUT
      ========================= */
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

  /* =========================
     CLEAR CHAT (FIX FOR YOUR ERROR)
  ========================= */
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages, 
  };
}