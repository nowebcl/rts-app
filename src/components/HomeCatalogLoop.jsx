import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid 
} from 'lucide-react';
import MinimalProductCard from './MinimalProductCard';
import { productService } from '../services/productService';

export default function HomeCatalogLoop() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(4);
  const touchStartX = useRef(null);

  // Cargar productos
  const loadProducts = async () => {
    const list = await productService.getAll();
    setProducts(list);
  };

  useEffect(() => {
    loadProducts();
    window.addEventListener('rst_catalog_updated', loadProducts);
    return () => window.removeEventListener('rst_catalog_updated', loadProducts);
  }, []);

  // Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1);
      } else if (width < 1024) {
        setCardsPerView(2);
      } else if (width < 1280) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Seleccionar solo algunos productos destacados (máximo 10 productos)
  // Priorizar máquinas disponibles de diversas categorías
  const featuredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    // Priorizar disponibles
    const available = products.filter(p => !p.isSold);
    const sold = products.filter(p => p.isSold);

    // Combinar dando prioridad a disponibles
    const curated = [...available, ...sold].slice(0, 10);
    return curated;
  }, [products]);

  const maxIndex = useMemo(() => {
    return Math.max(0, featuredProducts.length - cardsPerView);
  }, [featuredProducts.length, cardsPerView]);

  // Si cambia cardsPerView y currentIndex excede maxIndex, ajustar
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Loop automático hacia al lado (cada 3.8 segundos)
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 3800);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex, nextSlide]);

  // Manejo de deslizamiento táctil (Swipe)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
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
    setIsPaused(false);
  };

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section 
      id="catalogo" 
      className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* 1. Encabezado de la Sección con controles de navegación */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2 text-left max-w-2xl">
            <div className="antek-dashes">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
              Catálogo Oficial · Entrega Inmediata
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase text-slate-900 leading-tight">
              Modelos Oficiales RST
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Catálogo oficial de mini excavadoras y excavadoras disponibles para faena inmediata con inducción y entrega directa en camión rampa en todo Chile.
            </p>
          </div>

          {/* Botones de Navegación del Slider */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            <div className="hidden sm:flex items-center text-xs font-bold text-slate-400 mr-2">
              <span>{currentIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>{maxIndex + 1}</span>
            </div>

            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-slate-900 hover:text-white hover:border-slate-900 text-slate-700 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Equipo anterior"
              title="Anterior"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-slate-300 bg-white hover:bg-[#FE8003] hover:text-white hover:border-[#FE8003] text-slate-700 flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
              aria-label="Siguiente equipo"
              title="Siguiente"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* 2. Loop Horizontal Automático (Carousel Slider) */}
        <div 
          className="relative w-full overflow-hidden py-3"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Contenedor deslizante */}
          <div
            className="flex items-stretch transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
            }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="shrink-0 px-2.5 sm:px-3 flex flex-col"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <MinimalProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de posición (Dots) */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-6 h-2 bg-[#FE8003]'
                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Ir al grupo ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* 3. Bloque de Llamado a la Acción: VER TODO EL CATÁLOGO */}
        <div className="pt-8 sm:pt-10 border-t border-slate-200 text-center space-y-4">
          <div className="max-w-md mx-auto">
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-[#FE8003] hover:bg-[#e57302] text-white px-8 sm:px-12 py-4 rounded-[2px] font-heading font-black text-sm sm:text-base uppercase tracking-wider shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <LayoutGrid className="w-5 h-5 text-white stroke-[2.2]" />
              <span>Ver Todo el Catálogo</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Explora nuestras <strong>maquinarias y equipos</strong> con filtrador por categoría, motor y especificaciones técnicas completas con paginación.
          </p>
        </div>

      </div>
    </section>
  );
}
