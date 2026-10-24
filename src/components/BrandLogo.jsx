import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo({ 
  className = "h-12 sm:h-14 md:h-16", 
  variant = "horizontal", // "horizontal" | "emblem" | "full" | "light"
  showText = false,
  linkToHome = true
}) {
  const [imageError, setImageError] = useState(false);

  const LogoContent = (
    <div className="flex items-center gap-3 group">
      {/* Official RST Brand Logo Badge */}
      <div className="relative flex items-center justify-center shrink-0">
        {!imageError ? (
          <img 
            src="/brand/rst_logo_official.png" 
            alt="RST Maquinarias - Mini Excavadoras Chile" 
            className={`${className} w-auto object-contain rounded-[3px] transition-transform duration-300 group-hover:scale-105`}
            onError={() => setImageError(true)}
          />
        ) : (
          /* High-fidelity Vector Fallback using official brand colors */
          <div className="flex items-center justify-center bg-slate-950 text-white p-2 rounded-lg border border-[#FE8003]/40 shadow-md">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" rx="16" fill="#0816FF" />
              <path d="M20 75L40 25H60L80 75H65L50 38L35 75H20Z" fill="#FE8003" />
              <circle cx="50" cy="40" r="10" fill="#FFFFFF" />
            </svg>
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`text-2xl font-black tracking-tight ${variant === 'light' ? 'text-white' : 'text-slate-900'} group-hover:text-[#FE8003] transition-colors`}>
              RST
            </span>
            <span className="text-xs uppercase font-extrabold tracking-widest px-1.5 py-0.5 rounded bg-[#FE8003] text-white">
              CHILE
            </span>
          </div>
          <span className={`text-[11px] font-bold tracking-wider ${variant === 'light' ? 'text-slate-400' : 'text-slate-500'} uppercase mt-0.5`}>
            Mini Excavadoras
          </span>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-flex items-center focus:outline-none" aria-label="RST Mini Excavadoras Inicio">
        {LogoContent}
      </Link>
    );
  }

  return LogoContent;
}
