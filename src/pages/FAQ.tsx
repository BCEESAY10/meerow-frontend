import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "../components/layout/PageWrapper";
import { faqItems } from "../utils/faqData";

export const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const toggleOpen = (index: number) => {
    const newIndices = new Set(openIndices);
    if (newIndices.has(index)) {
      newIndices.delete(index);
    } else {
      newIndices.add(index);
    }
    setOpenIndices(newIndices);
  };

  return (
    <PageWrapper>
      <div className="py-12 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-[#E8622A] dark:text-[#F07A3D] hover:text-[#CC5220] dark:hover:text-[#E06A2D] font-medium flex items-center gap-2 transition-colors">
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-[#1E1E2E] dark:text-[#FDF6EE]">
            Frequently Asked Questions
          </h1>
        </div>
        <p className="text-[#6B6B7D] dark:text-[#B8B8C8] mb-12">
          Find answers to common questions about Meerow.
        </p>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#2A2A3E] rounded-lg border border-gray-200 dark:border-[#3A3A52] overflow-hidden">
              <button
                onClick={() => toggleOpen(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#3A3A52] transition-colors">
                <h3 className="text-lg font-semibold text-[#1E1E2E] dark:text-[#FDF6EE] text-left">
                  {item.question}
                </h3>
                <span
                  className={`flex-shrink-0 ml-4 text-[#E8622A] dark:text-[#F07A3D] transition-transform ${
                    openIndices.has(index) ? "rotate-180" : ""
                  }`}>
                  ▼
                </span>
              </button>

              {openIndices.has(index) && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-[#1E1E2E] border-t border-gray-200 dark:border-[#3A3A52]">
                  <p className="text-[#6B6B7D] dark:text-[#B8B8C8] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-blue-900 dark:text-blue-300">
            <strong>Didn't find what you're looking for?</strong> Visit our{" "}
            <a
              href="/feedback"
              className="font-semibold underline hover:text-blue-700 dark:hover:text-blue-400">
              feedback page
            </a>{" "}
            to send us your questions or suggestions.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default FAQ;
