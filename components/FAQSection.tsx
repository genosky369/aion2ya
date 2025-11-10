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
    <div className="bg-gray-800 rounded-lg p-6 h-[600px] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">자주 묻는 질문</h2>
      <div className="space-y-3">
        {FAQ_DATA.map((faq) => (
          <div
            key={faq.id}
            className="bg-gray-700 rounded-lg overflow-hidden transition-all"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-600 transition-colors"
            >
              <span className="font-medium text-gray-100">{faq.question}</span>
              {openId === faq.id ? (
                <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            {openId === faq.id && (
              <div className="px-4 py-3 bg-gray-750 border-t border-gray-600">
                <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
