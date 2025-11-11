'use client';

import { FAQ_DATA } from '@/lib/constants';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-lg p-6 h-[600px] overflow-y-auto custom-scrollbar shadow-lg shadow-cyan-500/10">
      <h2 className="text-2xl font-bold mb-4 text-cyan-100">자주 묻는 질문</h2>
      <div className="space-y-3">
        {FAQ_DATA.map((faq) => (
          <div
            key={faq.id}
            className="bg-slate-800/50 border border-cyan-500/20 rounded-lg overflow-hidden transition-all hover:border-cyan-500/40 hover:shadow-cyan-500/10 hover:shadow-md"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-800 transition-colors"
            >
              <span className="font-medium text-cyan-100">{faq.question}</span>
              {openId === faq.id ? (
                <ChevronUp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-cyan-500/70 flex-shrink-0" />
              )}
            </button>
            {openId === faq.id && (
              <div className="px-4 py-3 bg-slate-900/50 border-t border-cyan-500/20">
                <p className="text-cyan-200/80 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(15 23 42 / 0.5);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #22d3ee, #60a5fa);
        }
      `}</style>
    </div>
  );
}
