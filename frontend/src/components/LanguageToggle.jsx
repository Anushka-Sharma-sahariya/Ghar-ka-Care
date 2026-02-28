import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe } from 'lucide-react';

export const LanguageToggle = () => {
  const { language, setLanguage } = useApp();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      data-testid="language-toggle"
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-border/40 text-foreground hover:bg-accent/30 transition-all duration-300 touch-active shadow-sm"
    >
      <Globe size={18} strokeWidth={1.5} />
      <span className="text-sm font-medium">
        {language === 'en' ? 'हिंदी' : 'English'}
      </span>
    </button>
  );
};
