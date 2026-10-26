import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageToggle({ variant = 'topbar', className = '' }) {
  const [currentLang, setCurrentLang] = useState('es');

  // Detect current language from cookies or localStorage
  useEffect(() => {
    const detectLang = () => {
      const cookies = document.cookie;
      if (cookies.includes('googtrans=/es/en') || cookies.includes('googtrans=%2Fes%2Fen')) {
        return 'en';
      }
      const saved = localStorage.getItem('site_lang');
      return saved === 'en' ? 'en' : 'es';
    };

    setCurrentLang(detectLang());

    // Initialize Google Translate Element if not already loaded
    if (!document.getElementById('google-translate-script')) {
      // 1. Container
      if (!document.getElementById('google_translate_element')) {
        const div = document.createElement('div');
        div.id = 'google_translate_element';
        div.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;';
        document.body.appendChild(div);
      }

      // 2. Global init callback
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'es',
              includedLanguages: 'en,es',
              autoDisplay: false
            },
            'google_translate_element'
          );
        }
      };

      // 3. Inject script
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    const hostname = window.location.hostname;
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
    document.cookie = `${name}=${value || ''}${expires}; domain=${hostname}; path=/`;

    const parts = hostname.split('.');
    if (parts.length > 2) {
      const rootDomain = parts.slice(-2).join('.');
      document.cookie = `${name}=${value || ''}${expires}; domain=.${rootDomain}; path=/`;
    }
  };

  const clearCookie = (name) => {
    const hostname = window.location.hostname;
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;
    document.cookie = `${name}=; Max-Age=-99999999; domain=${hostname}; path=/`;
    const parts = hostname.split('.');
    if (parts.length > 2) {
      const rootDomain = parts.slice(-2).join('.');
      document.cookie = `${name}=; Max-Age=-99999999; domain=.${rootDomain}; path=/`;
    }
  };

  const toggleLanguage = () => {
    const targetLang = currentLang === 'es' ? 'en' : 'es';

    if (targetLang === 'en') {
      // Switch to English
      setCookie('googtrans', '/es/en', 7);
      localStorage.setItem('site_lang', 'en');
      setCurrentLang('en');

      const select = document.querySelector('select.goog-te-combo');
      if (select) {
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
      } else {
        // Fallback: reload with cookie to trigger instant translation
        window.location.reload();
      }
    } else {
      // Revert back to pristine Spanish
      clearCookie('googtrans');
      setCookie('googtrans', '/es/es', -1);
      localStorage.setItem('site_lang', 'es');
      setCurrentLang('es');

      const select = document.querySelector('select.goog-te-combo');
      if (select) {
        select.value = 'es';
        select.dispatchEvent(new Event('change'));
        // Clean reload ensures zero residual artifacts
        setTimeout(() => {
          window.location.reload();
        }, 150);
      } else {
        window.location.reload();
      }
    }
  };

  if (variant === 'drawer') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-white/15 hover:bg-white/25 border border-white/20 transition-all text-xs font-semibold text-white cursor-pointer select-none ${className}`}
        title={currentLang === 'es' ? 'Switch website to English' : 'Cambiar a Español'}
        aria-label="Cambiar idioma / Switch language"
      >
        <Globe className="w-3.5 h-3.5 text-white shrink-0" />
        <span className={currentLang === 'es' ? 'font-black underline underline-offset-2' : 'opacity-70'}>
          ES
        </span>
        <span className="opacity-40">/</span>
        <span className={currentLang === 'en' ? 'font-black underline underline-offset-2' : 'opacity-70'}>
          EN
        </span>
      </button>
    );
  }

  // Default: Minimal topbar pill
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2a2a2a] hover:bg-[#333333] border border-[#3e3e3e] hover:border-[#FE8003]/60 transition-all text-[11px] font-semibold text-[#dddddd] shadow-2xs group cursor-pointer select-none shrink-0 ${className}`}
      title={currentLang === 'es' ? 'Traducir al Inglés / Translate to English' : 'Volver a Español'}
      aria-label="Traducir al Inglés / Switch to English"
    >
      <Globe className="w-3.5 h-3.5 text-[#FE8003] transition-transform duration-300 group-hover:rotate-45 shrink-0" />
      <span className={`transition-colors ${currentLang === 'es' ? 'text-[#FE8003] font-bold' : 'text-[#888888]'}`}>
        ES
      </span>
      <span className="text-[#555555] text-[10px]">/</span>
      <span className={`transition-colors ${currentLang === 'en' ? 'text-[#FE8003] font-bold' : 'text-[#888888]'}`}>
        EN
      </span>
    </button>
  );
}
