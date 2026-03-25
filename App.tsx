
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { AdviceDisplay } from './components/AdviceDisplay';
import { getChildAdvice } from './services/geminiService';
import { ChildAdvice, ConsultationData, LoadingState } from './types';

export default function App() {
  const [formData, setFormData] = useState<ConsultationData>({
    age: '',
    ageUnit: 'years',
    problem: ''
  });
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [advice, setAdvice] = useState<ChildAdvice | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.age || !formData.problem) return;

    setLoadingState(LoadingState.LOADING);
    setError(null);
    
    try {
      const result = await getChildAdvice(formData);
      setAdvice(result);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("عذراً، لم أتمكن من معالجة طلبكِ. يرجى المحاولة مرة أخرى أو إعادة صياغة مشكلتكِ.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleReset = () => {
    setAdvice(null);
    setLoadingState(LoadingState.IDLE);
    setFormData({ age: '', ageUnit: 'years', problem: '' });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 font-brand">كيف يمكننا مساعدتكِ اليوم؟</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            احصلي على نصائح مخصصة وطرق علاج تتناسب مع عمر طفلكِ والمشاكل التي يواجهها.
          </p>
        </div>

        {loadingState !== LoadingState.SUCCESS ? (
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transition-all duration-300">
            <div className="p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">عمر الطفل</label>
                    <div className="flex space-x-2 space-x-reverse">
                      <input
                        type="number"
                        required
                        min="0"
                        value={formData.age}
                        onChange={(e) => setFormData(p => ({ ...p, age: e.target.value }))}
                        className="flex-grow px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all outline-none"
                        placeholder="مثال: 3"
                      />
                      <select
                        value={formData.ageUnit}
                        onChange={(e) => setFormData(p => ({ ...p, ageUnit: e.target.value as any }))}
                        className="px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all outline-none bg-slate-50 font-medium"
                      >
                        <option value="days">أيام</option>
                        <option value="months">أشهر</option>
                        <option value="years">سنوات</option>
                      </select>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="h-full bg-rose-50 rounded-2xl flex items-center p-4 border border-rose-100">
                      <p className="text-xs text-rose-700 leading-relaxed">
                        تحديد العمر بدقة أمر حيوي لأن مراحل التطور تتغير بسرعة كبيرة في مرحلة الطفولة المبكرة.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ما هي المشكلة أو القلق الذي يواجهك؟</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.problem}
                    onChange={(e) => setFormData(p => ({ ...p, problem: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all outline-none resize-none"
                    placeholder="صفي الأعراض، السلوك، أو أي أسئلة لديكِ... (مثلاً: رفض الأكل، حرارة، عادات النوم)"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loadingState === LoadingState.LOADING}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center space-x-2 space-x-reverse
                    ${loadingState === LoadingState.LOADING 
                      ? 'bg-slate-300 cursor-not-allowed' 
                      : 'bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98] shadow-rose-200 hover:shadow-rose-300'
                    }`}
                >
                  {loadingState === LoadingState.LOADING ? (
                    <>
                      <svg className="animate-spin h-5 w-5 ml-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>جاري استشارة الأخصائيين...</span>
                    </>
                  ) : (
                    <span>احصلي على نصيحة الخبراء</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          advice && <AdviceDisplay advice={advice} onReset={handleReset} />
        )}

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-xl font-bold">١</div>
            <h4 className="font-bold text-slate-800 mb-1">إدخال التفاصيل</h4>
            <p className="text-sm text-slate-500">حددي العمر وتفاصيل المشكلة الحالية.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 text-xl font-bold">٢</div>
            <h4 className="font-bold text-slate-800 mb-1">تحليل الذكاء الاصطناعي</h4>
            <p className="text-sm text-slate-500">يقوم نموذجنا بمراجعة الإرشادات التربوية والطبية.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-xl font-bold">٣</div>
            <h4 className="font-bold text-slate-800 mb-1">تلقي الإرشادات</h4>
            <p className="text-sm text-slate-500">احصلي على خطوات عملية وطرق للتعامل مع الحالة.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
