
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-bold font-brand tracking-tight text-rose-600">مساعد الأم</span>
          </div>
          <nav className="hidden sm:flex items-center space-x-6 space-x-reverse">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-rose-500 transition-colors">نصائح السلامة</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-rose-500 transition-colors">من نحن</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} مساعد الأم. جميع الحقوق محفوظة.
          </p>
          <p className="text-slate-400 text-xs mt-2 leading-relaxed">
            تنبيه: توفر هذه الأداة المدعومة بالذكاء الاصطناعي إرشادات عامة وليست بديلاً عن النصائح الطبية المهنية أو التشخيص أو العلاج. اطلبي دائماً مشورة طبيبك أو غيره من مقدمي الخدمات الصحية المؤهلين.
          </p>
        </div>
      </footer>
    </div>
  );
};
