import React, { useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Image as ImageIcon,
  Hash,
} from 'lucide-react';
import type { Certificate } from '../types';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate: c,
  onClose,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = prevOverflow || '';
    };
  }, [onClose]);

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  if (!c) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div className="min-h-full flex items-center justify-center p-4 py-10">
        <div
          className="relative w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[#0a0f1c] shadow-2xl shadow-blue-500/10 animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full border border-white/[0.08] bg-black/50 backdrop-blur-sm text-gray-400 hover:text-white hover:border-blue-500/30 hover:bg-black/70 transition-all"
          >
            <X size={16} />
          </button>

          <div className="w-full h-64 sm:h-80 rounded-t-2xl bg-white/[0.02] border-b border-white/[0.05] flex items-center justify-center overflow-hidden">
            {c.image ? (
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-blue-500/30">
                <ImageIcon size={48} />
                <span className="text-xs text-gray-600">
                  No image available
                </span>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-lg font-semibold text-[#f0f6ff] leading-snug">
                {c.name}
              </h3>

              <span
                className={`shrink-0 inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                  c.status === 'done'
                    ? 'border-green-500/25 bg-green-500/8 text-green-400'
                    : 'border-yellow-500/25 bg-yellow-500/8 text-yellow-400'
                }`}
              >
                {c.status === 'done' ? (
                  <CheckCircle2 size={10} />
                ) : (
                  <Clock3 size={10} />
                )}
                {c.status === 'done' ? 'Completed' : 'In Progress'}
              </span>
            </div>

            <div className="text-sm text-cyan-500 mb-1">{c.issuer}</div>

            <div className="text-xs text-gray-600 mb-4">
              {c.date}
              {c.expires ? ` · Expires ${c.expires}` : ''}
            </div>

            {c.description && (
              <p className="text-[13px] text-gray-400 leading-relaxed mb-4">
                {c.description}
              </p>
            )}

            {c.credentialId && (
              <div className="flex items-center gap-2 text-[11px] text-gray-600 mb-4">
                <Hash size={12} className="text-blue-500" />
                <span className="font-mono">{c.credentialId}</span>
              </div>
            )}

            {c.tags && c.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-0.5 rounded-md border border-blue-500/15 text-blue-400/60 bg-blue-500/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {c.url && (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-500/25 bg-blue-500/10 text-blue-300 text-sm font-medium hover:bg-blue-500/15 hover:border-blue-500/40 transition-colors"
              >
                <ExternalLink size={14} />
                Verify Credential
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;