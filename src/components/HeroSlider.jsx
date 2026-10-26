import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { companyData } from '../data/excavators';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(null);

  const slides = [
    {
      id: 1,
      image: "/HERO/hero-slide-1.webp",
      fallbackImage: "/HERO/hero-slide-1.jpg",
      subtitle: "Venta de maquinaria nueva y semi nueva con despacho inmediato y garantía a todo Chile",
      titleLine1: "Catálogo Completo",
      titleLine2: "de Mini Excavadoras",
      badgeText: "Venta Nueva y Semi Nueva",
      cta1Text: "Ver Catálogo Completo",
      cta1Link: "/catalogo",
      cta2Text: "Cotizar por WhatsApp",
      cta2Link: `https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20cotizar%20un%20equipo%20del%20catálogo.`
    },
    {
      id: 2,
      image: "/images/hero-slide-2.webp",
      fallbackImage: "/images/hero-slide-2.jpg",
      subtitle: "Maquinarias nuevas y semi nuevas operando con éxito en parcelaciones, obras y predios",
      titleLine1: "Cientos de Clientes",
      titleLine2: "Felices en Todo Chile",
      badgeText: "Respaldo y Confianza",
      cta1Text: "Ver Portafolio",
      cta1Link: "/entregas-exitosas",
      cta2Text: "Asesoría por WhatsApp",
      cta2Link: `https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20conocer%20experiencias%20de%20clientes%20y%20entregas.`
    },
    {
      id: 3,
      image: "/images/hero-slide-3.webp",
      fallbackImage: "/images/hero-slide-3.jpg",
      subtitle: "Faenas especializadas en terreno, mantenciones y repuestos originales",
      titleLine1: "Servicios con Mini Excavadoras",
      badgeText: "Soporte Oficial",
      cta1Text: "Consultar Servicios",
      cta1Link: "/servicios",
      cta2Text: "Consultar por WhatsApp",
      cta2Link: `https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20necesito%20consultar%20por%20servicios%20en%20terreno.`
    }
  ];

  // Auto advance every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative w-full max-w-full overflow-hidden bg-[#161616] border-b-4 border-[#FE8003] select-none group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slides with Fade Transition & Ken Burns Effect */}
      <div className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
        {slides.map((s, index) => {
          const isActive = index === currentSlide;
          const kenBurnsClass = isActive
            ? (index % 2 === 0 ? 'kenburns-zoom-in' : 'kenburns-zoom-out')
            : 'kenburns-idle';

          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image: High Contrast & Brightness */}
              <picture className="absolute inset-0 w-full h-full overflow-hidden">
                {s.image?.endsWith('.webp') && (
                  <source srcSet={s.image} type="image/webp" />
                )}
                <img
                  src={s.fallbackImage || s.image}
                  alt={`${s.titleLine1} ${s.titleLine2 || ''}`.trim()}
                  className={`w-full h-full object-cover object-center contrast-[1.08] saturate-[1.08] brightness-[1.05] ${kenBurnsClass}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding={index === 0 ? "sync" : "async"}
                />
              </picture>

              {/* Overlay lateral con luminosidad para que el fondo se aprecie claramente */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 sm:via-black/25 to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none"></div>
            </div>
          );
        })}

        {/* Content Aligned to Left (Compacto, Ordenado y Máximo 3 líneas) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex items-center justify-start">
          <div 
            key={currentSlide}
            className="animate-hero-fade-up max-w-2xl lg:max-w-3xl text-left flex flex-col items-start justify-center space-y-4 sm:space-y-5"
          >
            {/* 1. Iconos de Maquinaria del Catálogo RST alineados a la izquierda */}
            <div className="flex items-center justify-start gap-4 sm:gap-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              <Link
                to="/catalogo?tonnage=micro"
                title="Ultra Compactas (< 1.0 Ton) - Rippa R06 (0.75 Ton)"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center opacity-85 hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <img 
                  src="/icons/ico-slideshow-1.svg" 
                  alt="Mini Excavadora Ultra Compacta (< 1.0 Ton)" 
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </Link>
              <Link
                to="/catalogo?tonnage=compact"
                title="Compactas Versátiles (1.0T – 1.8T) - Rippa R10 Eco y R15"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center opacity-85 hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <img 
                  src="/icons/ico-slideshow-2.svg" 
                  alt="Mini Excavadora Compacta Versátil (1.0T – 1.8T)" 
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </Link>
              <Link
                to="/catalogo?category=sany"
                title="Faena Pesada & Cabina (3.5T – 7.5T) - SANY SY35U, SY60C y SY75C"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center opacity-85 hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
              >
                <img 
                  src="/icons/ico-slideshow-3.svg" 
                  alt="Excavadoras de Faena Pesada con Cabina SANY (3.5T – 7.5T)" 
                  className="w-full h-full object-contain filter drop-shadow"
                />
              </Link>
            </div>

            {/* 2. Small Horizontal Orange Dashes (decor-title-2) */}
            <div className="flex justify-start -mt-2.5">
              <img 
                src="/decor/decor-title-2.svg" 
                alt="" 
                className="w-12 h-1.5 sm:w-14 sm:h-2 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* 3. Small Clean Subtitle alineado a la izquierda */}
            <p className="text-white text-xs sm:text-sm lg:text-base font-medium tracking-wide text-left max-w-xl [text-shadow:_0_1px_8px_rgba(0,0,0,0.9),_0_2px_16px_rgba(0,0,0,0.7)]">
              {slide.subtitle}
            </p>

            {/* 4. Título Principal Compacto (Máximo 2 a 3 líneas) */}
            <h1 className="hero-slider-title text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px] font-black text-white tracking-tight leading-[1.08] text-left normal-case [text-shadow:_0_2px_14px_rgba(0,0,0,0.85),_0_4px_28px_rgba(0,0,0,0.75)]">
              <span className="block text-left">{slide.titleLine1}</span>
              {slide.titleLine2 && (
                <span className="block text-left mt-1 sm:mt-1.5 text-white">
                  {slide.titleLine2}
                </span>
              )}
              {slide.titleLine3 && (
                <span className="block text-left mt-1 sm:mt-1.5 text-white">
                  {slide.titleLine3}
                </span>
              )}
            </h1>

            {/* 5. Diagonal Hatched SVG Line (decor-lines.svg) alineado a la izquierda */}
            <div 
              className="w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[460px] h-[16px] sm:h-[20px] lg:h-[22px] mr-auto mt-1 sm:mt-2 mb-1 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
              style={{
                backgroundImage: "url('/decor/decor-lines.svg')",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "left center",
                backgroundSize: "auto 100%"
              }}
              role="presentation"
              aria-hidden="true"
            />

            {/* 6. Dual Action Buttons alineados a la izquierda */}
            <div className="pt-1.5 flex flex-col sm:flex-row items-start justify-start gap-4">
              <Link
                to={slide.cta1Link}
                className="btn-antek btn-antek-primary shadow-xl shadow-orange-500/20"
              >
                <span>{slide.cta1Text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={slide.cta2Link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-antek btn-antek-outline"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{slide.cta2Text}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Left Arrow Navigation Button */}
        <button
          onClick={prevSlide}
          className="hidden sm:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/40 hover:bg-[#FE8003] text-white items-center justify-center transition-all duration-300 rounded-[2px] border border-white/20 group cursor-pointer"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Right Arrow Navigation Button */}
        <button
          onClick={nextSlide}
          className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-black/40 hover:bg-[#FE8003] text-white items-center justify-center transition-all duration-300 rounded-[2px] border border-white/20 group cursor-pointer"
          aria-label="Siguiente slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        {/* Bottom Slide Indicator Lines (3 Slides) */}
        <div className="absolute bottom-6 left-6 sm:left-8 lg:left-12 z-30 flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 transition-all duration-300 rounded-xs cursor-pointer ${
                i === currentSlide ? 'w-10 bg-[#FE8003]' : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ir al slide ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
