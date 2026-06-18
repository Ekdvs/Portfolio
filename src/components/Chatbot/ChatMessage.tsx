import React, { useState, useCallback } from 'react';
import type { Message } from '../../hooks/useChat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: Message;
}

/* =========================
   CODE BLOCK COMPONENT
========================= */
function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.log("Clipboard not available");
    }
  }, [code]);

  return (
    <div className="relative my-2 rounded-lg overflow-hidden border border-slate-600/40 bg-slate-900/70">
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/80 border-b border-slate-700/50">
        <span className="text-[10px] uppercase tracking-wide text-slate-400">
          {language || 'code'}
        </span>

        <button
          onClick={handleCopy}
          className="text-[10px] text-slate-400 hover:text-slate-200 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <pre className="overflow-x-auto px-3 py-2 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* =========================
   MAIN MESSAGE COMPONENT
========================= */
const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.798-1.414 2.798H4.213c-1.444 0-2.414-1.798-1.414-2.798L4.2 15.3"
            />
          </svg>
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-sm'
            : 'bg-slate-700/60 text-slate-100 rounded-bl-sm'
        }`}
      >
        {/* USER MESSAGE */}
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          /* AI MESSAGE (Markdown) */
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mb-2 last:mb-0 whitespace-pre-wrap break-words">
                  {children}
                </p>
              ),

              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 underline hover:text-blue-200"
                >
                  {children}
                </a>
              ),

              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-2 space-y-1">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-2 space-y-1">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="break-words">{children}</li>
              ),

              strong: ({ children }) => (
                <strong className="font-semibold text-white">{children}</strong>
              ),

              table: ({ children }) => (
                <div className="overflow-x-auto my-2">
                  <table className="text-xs border-collapse">
                    {children}
                  </table>
                </div>
              ),

              th: ({ children }) => (
                <th className="border border-slate-600/50 px-2 py-1 text-left bg-slate-800/60">
                  {children}
                </th>
              ),

              td: ({ children }) => (
                <td className="border border-slate-600/50 px-2 py-1">
                  {children}
                </td>
              ),

              code: ({ className, children, ...props }: any) => {
                const inline = !className;
                const match = /language-(\w+)/.exec(className || '');
                const codeText = String(children).replace(/\n$/, '');

                if (inline) {
                  return (
                    <code
                      className="px-1 py-0.5 rounded bg-slate-900/60 text-blue-200 text-[0.85em]"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }

                return (
                  <CodeBlock
                    language={match?.[1] || ''}
                    code={codeText}
                  />
                );
              },

              pre: ({ children }) => <>{children}</>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}

        {/* Timestamp */}
        <p
          className={`text-[10px] mt-1 select-none ${
            isUser ? 'text-blue-200 text-right' : 'text-slate-400'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;