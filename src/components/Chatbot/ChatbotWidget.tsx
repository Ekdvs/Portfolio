import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      {isOpen && (
        <div
          className="
            w-[360px] h-[520px]
            bg-slate-800/95 backdrop-blur-md
            border border-slate-700/60
            rounded-2xl shadow-2xl shadow-black/40
            flex flex-col overflow-hidden
            animate-in slide-in-from-bottom-4 fade-in duration-200
          "
        >
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className="
          relative w-14 h-14 rounded-full
          bg-blue-600 hover:bg-blue-500
          shadow-lg shadow-blue-900/40
          flex items-center justify-center
          transition-all duration-200 active:scale-95
          group
        "
      >
        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30 pointer-events-none" />
        )}

        {/* Icon toggle */}
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
          {isOpen ? (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          )}
        </span>

        {/* Tooltip */}
        {!isOpen && (
          <span className="
            absolute right-16 top-1/2 -translate-y-1/2
            whitespace-nowrap text-xs font-medium
            bg-slate-800 text-slate-100
            px-2.5 py-1.5 rounded-lg
            border border-slate-700/60
            opacity-0 group-hover:opacity-100
            pointer-events-none transition-opacity duration-150
          ">
            Chat with me
          </span>
        )}
      </button>
    </div>
  );
};

export default ChatbotWidget;