import { useState, useCallback, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { searchProjects } from "./projectSearch";
import { buildSystemInstruction, buildTurnContext } from "./buildContext";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// Tried in order. Each model has its own separate quota bucket,
// so falling back also helps when one model's daily quota is exhausted.
const FALLBACK_MODELS = ["gemini-3.5-flash", "gemini-2.5-flash", "gemini-2.5-flash-lite"];
const MAX_RETRIES_PER_MODEL = 2;
const BASE_DELAY_MS = 600;

function isOverloadedError(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    msg.includes("503") ||
    msg.includes("UNAVAILABLE") ||
    msg.toLowerCase().includes("overloaded") ||
    msg.toLowerCase().includes("high demand")
  );
}

function isQuotaError(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    msg.includes("429") ||
    msg.includes("RESOURCE_EXHAUSTED") ||
    msg.toLowerCase().includes("quota")
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatRef = useRef<ReturnType<typeof ai.chats.create> | null>(null);
  const modelIndexRef = useRef(0);

  const ensureChat = useCallback((modelIndex: number) => {
    if (!chatRef.current) {
      chatRef.current = ai.chats.create({
        model: FALLBACK_MODELS[modelIndex],
        config: { systemInstruction: buildSystemInstruction() },
      });
    }
    return chatRef.current;
  }, []);

  // Tries the current model with retries on transient overload; switches to
  // the next model immediately on quota exhaustion or persistent overload,
  // carrying conversation history into the new session.
  const getStreamWithFallback = useCallback(async (turnMessage: string) => {
    let lastErr: unknown = null;

    for (let i = modelIndexRef.current; i < FALLBACK_MODELS.length; i++) {
      if (i !== modelIndexRef.current || !chatRef.current) {
        const history = chatRef.current?.getHistory?.() ?? [];
        chatRef.current = ai.chats.create({
          model: FALLBACK_MODELS[i],
          config: { systemInstruction: buildSystemInstruction() },
          history,
        });
        modelIndexRef.current = i;
      } else {
        ensureChat(i);
      }

      for (let attempt = 0; attempt <= MAX_RETRIES_PER_MODEL; attempt++) {
        try {
          return await chatRef.current!.sendMessageStream({ message: turnMessage });
        } catch (err) {
          lastErr = err;

          if (isQuotaError(err)) {
            // Daily cap hit on this model — retrying won't help, move to next model now.
            break;
          }
          if (!isOverloadedError(err)) throw err;
          if (attempt < MAX_RETRIES_PER_MODEL) {
            await sleep(BASE_DELAY_MS * (attempt + 1));
          }
        }
      }
      // exhausted this model (quota or repeated overload), loop moves to the next one
    }

    throw lastErr;
  }, [ensureChat]);

  const sendMessage = useCallback(
    async (text: string) => {
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

      const assistantId = crypto.randomUUID();

      try {
        const matchedProjects = searchProjects(text);
        const turnMessage = buildTurnContext(text, matchedProjects);

        const stream = await getStreamWithFallback(turnMessage);

        let fullText = "";
        let started = false;

        for await (const chunk of stream) {
          const piece = chunk.text ?? "";
          if (!piece) continue;
          fullText += piece;

          if (!started) {
            started = true;
            setMessages((prev) => [
              ...prev,
              {
                id: assistantId,
                role: "assistant",
                content: fullText,
                timestamp: new Date(),
              },
            ]);
          } else {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, content: fullText } : m
              )
            );
          }
        }

        if (!started) {
          setMessages((prev) => [
            ...prev,
            {
              id: assistantId,
              role: "assistant",
              content: "No response",
              timestamp: new Date(),
            },
          ]);
        }
      } catch (err) {
        if (isQuotaError(err)) {
          setError("Free-tier daily quota reached on all available models. Try again later, or upgrade your Gemini API billing plan.");
        } else if (isOverloadedError(err)) {
          setError("Gemini's models are all experiencing heavy load right now. Please try again shortly.");
        } else {
          setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, getStreamWithFallback]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    chatRef.current = null;
    modelIndexRef.current = 0;
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}