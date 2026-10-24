import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BannerSlider() {
  const banners = [
    {
      id: 1,
      desktopSrc: '/images/banners/banner-1.png',
      mobileSrc: '/images/banners/mobile/banner-1-mobile.png',
      alt: 'RST Importación & Servicios - Mini Excavadoras y Maquinaria en Faena'
    },
    {
      id: 2,
      desktopSrc: '/images/banners/banner-2.png',
      mobileSrc: '/images/banners/mobile/banner-2-mobile.png',
      alt: 'RST Importación & Servicios - Distribución y Stock de Excavadoras'
    },
    {
      id: 3,
      desktopSrc: '/images/banners/banner-3.png',
      mobileSrc: '/images/banners/mobile/banner-3-mobile.png',
      alt: 'RST Importación & Servicios - Respaldo Técnico y Repuestos Oficiales'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  // Autoplay timer (5 segundos)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  // Touch handlers para deslizamiento táctil en móviles
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

  return (
    <section
      aria-label="Banners Promocionales RST"
      className="relative w-full max-w-full overflow-hidden bg-white select-none group border-y border-slate-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carrusel horizontal adaptativo: Banners específicos para Móvil y Desktop */}
      <div
        className="flex w-full transition-transform duration-700 ease-in-out bg-white"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="w-full min-w-full flex-shrink-0 bg-white">
            <picture className="w-full block bg-white">
              <source media="(max-width: 767px)" srcSet={banner.mobileSrc} />
              <source media="(min-width: 768px)" srcSet={banner.desktopSrc} />
              <img
                src={banner.desktopSrc}
                alt={banner.alt}
                className="w-full max-w-full h-auto block select-none bg-white object-contain"
                draggable="false"
              />
            </picture>
          </div>
        ))}
      </div>

      {/* Flecha Izquierda */}
      <button
        onClick={prevSlide}
        aria-label="Banner anterior"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#FE8003] text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md focus:outline-none focus:opacity-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Flecha Derecha */}
      <button
        onClick={nextSlide}
        aria-label="Siguiente banner"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-[#FE8003] text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md focus:outline-none focus:opacity-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicadores / Puntos de Navegación */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir al banner ${index + 1}`}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-6 sm:w-8 bg-[#FE8003]'
                : 'w-2 bg-white/70 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
