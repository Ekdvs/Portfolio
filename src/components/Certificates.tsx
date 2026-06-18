import React, { useState } from 'react';
import { Award } from 'lucide-react';
import type { Certificate } from '../types';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';

interface CertificatesProps {
  certificates: Certificate[];
}

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedCertificates = showAll
    ? certificates
    : certificates.slice(0, 8);

  return (
    <section id="certificates" className="py-24 bg-[#060b14] relative overflow-hidden">
      <div className="absolute top-40 right-0 w-72 h-72 bg-blue-600 opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-cyan-500 opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-widest font-semibold text-blue-500 uppercase mb-3">
            Achievements
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold text-[#f0f6ff] tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Certifications
            </span>{' '}
            & Licenses
          </h2>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-blue-400/80 font-semibold uppercase tracking-widest mb-6">
          <Award size={13} className="text-blue-500" />
          All Certificates ({certificates.length})
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayedCertificates.map((c) => (
            <CertificateCard
              key={c.id}
              certificate={c}
              onClick={setSelected}
            />
          ))}
        </div>

        {certificates.length > 9 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300"
            >
              {showAll
                ? 'Show Less'
                : `Show More (${certificates.length - 8} More)`}
            </button>
          </div>
        )}
      </div>

      <CertificateModal
        certificate={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
};

export default Certificates;