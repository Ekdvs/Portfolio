import React from 'react';
import {
  CheckCircle2,
  Clock3,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react';
import type { Certificate } from '../types';

interface CertificateCardProps {
  certificate: Certificate;
  onClick: (certificate: Certificate) => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate: c,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(c)}
      className="group relative p-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-blue-500/20 hover:bg-blue-500/[0.03] transition-all duration-200 cursor-pointer"
    >
      {/* Status + External Link */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
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
          {c.status === 'done' ? 'Completed' : 'In progress'}
        </span>

        {c.url && (
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-blue-400"
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>

      {/* Thumbnail */}
      <div className="w-full h-32 rounded-xl border border-white/[0.05] bg-white/[0.02] overflow-hidden mb-3 flex items-center justify-center">
        {c.image ? (
          <img
            src={c.image}
            alt={c.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <ImageIcon size={28} className="text-blue-500/30" />
        )}
      </div>

      <div className="text-[12.5px] font-semibold text-blue-100/80 leading-snug mb-1">
        {c.name}
      </div>

      <div className="text-[11px] text-gray-600 mb-2">
        {c.issuer} · {c.date}
      </div>

      {c.tags && c.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {c.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-1.5 py-0.5 rounded-md border border-blue-500/15 text-blue-400/60 bg-blue-500/5"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {c.expires && (
        <div className="mt-2 text-[10px] text-gray-700">
          Expires {c.expires}
        </div>
      )}
    </div>
  );
};

export default CertificateCard;