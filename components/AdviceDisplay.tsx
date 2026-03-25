
import React from 'react';
import { ChildAdvice } from '../types';

interface AdviceDisplayProps {
  advice: ChildAdvice;
  onReset: () => void;
}

export const AdviceDisplay: React.FC<AdviceDisplayProps> = ({ advice, onReset }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold font-brand text-rose-800 mb-4">نصائح من أجل صغيركِ</h2>
        <p className="text-rose-900/80 leading-relaxed mb-6 italic">"{advice.summary}"</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white rounded-xl p-5 shadow-sm border border-rose-100">
            <h3 className="text-lg font-bold text-rose-700 flex items-center mb-3">
              <span className="bg-rose-100 p-1.5 rounded-lg ml-2">🚀</span>
              خطوات فورية
            </h3>
            <ul className="space-y-2">
              {advice.immediateSteps.map((step, i) => (
                <li key={i} className="flex items-start text-slate-700 text-sm">
                  <span className="text-rose-400 ml-2">•</span>
                  {step}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-xl p-5 shadow-sm border border-rose-100">
            <h3 className="text-lg font-bold text-rose-700 flex items-center mb-3">
              <span className="bg-rose-100 p-1.5 rounded-lg ml-2">🌱</span>
              استراتيجيات التعامل
            </h3>
            <ul className="space-y-2">
              {advice.managementStrategies.map((strategy, i) => (
                <li key={i} className="flex items-start text-slate-700 text-sm">
                  <span className="text-rose-400 ml-2">•</span>
                  {strategy}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-6 space-y-6">
          <section className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-700 flex items-center mb-3">
              <span className="bg-indigo-100 p-1.5 rounded-lg ml-2">💡</span>
              نصائح الخبراء
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {advice.expertTips.map((tip, i) => (
                <li key={i} className="flex items-center text-indigo-900 text-sm font-medium">
                  <svg className="w-4 h-4 ml-2 text-indigo-400 shrink-0 transform rotate-180" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <h3 className="text-lg font-bold text-amber-700 flex items-center mb-3">
              <span className="bg-amber-100 p-1.5 rounded-lg ml-2">⚠️</span>
              متى يجب زيارة الطبيب
            </h3>
            <ul className="space-y-2">
              {advice.warningSigns.map((sign, i) => (
                <li key={i} className="flex items-start text-amber-900 text-sm font-semibold">
                  <span className="text-amber-500 ml-2">•</span>
                  {sign}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <button
          onClick={onReset}
          className="mt-8 w-full bg-rose-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all active:scale-95"
        >
          طرح سؤال آخر
        </button>
      </div>
    </div>
  );
};
