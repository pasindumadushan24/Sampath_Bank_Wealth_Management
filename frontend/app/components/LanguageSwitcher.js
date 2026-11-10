'use client';
import { useState, useEffect, useRef } from 'react';

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'si', label: 'සි', name: 'Sinhala' },
  { code: 'ta', label: 'த', name: 'Tamil' },
];

export default function LanguageSwitcher({ light = false }) {
  const [current, setCurrent] = useState('en');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('sampath_language');
    if (stored && languages.find((l) => l.code === stored)) {
      setCurrent(stored);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setCurrent(code);
    localStorage.setItem('sampath_language', code);
    setOpen(false);
  };

  const currentLang = languages.find((l) => l.code === current) || languages[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
          light
            ? 'border-white/30 text-white hover:bg-white/10'
            : 'border-gray-200 text-gray-700 hover:border-[#C8961E] hover:text-[#C8961E]'
        }`}
        aria-label="Select language"
      >
        <span>🌐</span>
        <span>{currentLang.label}</span>
        <span className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 min-w-[140px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                current === lang.code
                  ? 'bg-[#F5E6C0] text-[#1B2B5B] font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="font-bold w-6 text-center">{lang.label}</span>
              <span>{lang.name}</span>
              {current === lang.code && <span className="ml-auto text-[#C8961E]">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
