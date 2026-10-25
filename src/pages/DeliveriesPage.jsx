import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  MessageCircle
} from 'lucide-react';
import { deliveries } from '../data/deliveries';
import { factoryImages } from '../data/factoryGallery';
import { companyData } from '../data/excavators';

export default function DeliveriesPage() {
  const [activeDeliveryIndex, setActiveDeliveryIndex] = useState(null);
  const [activeFactoryIndex, setActiveFactoryIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dividir las 33 imágenes en dos líneas alternadas para balancear contenido
  const rowTop = useMemo(() => deliveries.filter((_, i) => i % 2 === 0), []);     // 17 imágenes
  const rowBottom = useMemo(() => deliveries.filter((_, i) => i % 2 !== 0), []);  // 16 imágenes

  // Duplicar cada fila para conseguir el bucle infinito continuo sin saltos
  const duplicatedTop = useMemo(() => [...rowTop, ...rowTop], [rowTop]);
  const duplicatedBottom = useMemo(() => [...rowBottom, ...rowBottom], [rowBottom]);

  // Teclado para navegar en el visor en pantalla completa
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeDeliveryIndex !== null) {
        if (e.key === 'Escape') setActiveDeliveryIndex(null);
        if (e.key === 'ArrowRight') {
          setActiveDeliveryIndex((prev) => (prev + 1) % deliveries.length);
        }
        if (e.key === 'ArrowLeft') {
          setActiveDeliveryIndex((prev) => (prev - 1 + deliveries.length) % deliveries.length);
        }
      } else if (activeFactoryIndex !== null) {
        if (e.key === 'Escape') setActiveFactoryIndex(null);
        if (e.key === 'ArrowRight') {
          setActiveFactoryIndex((prev) => (prev + 1) % factoryImages.length);
        }
        if (e.key === 'ArrowLeft') {
          setActiveFactoryIndex((prev) => (prev - 1 + factoryImages.length) % factoryImages.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDeliveryIndex, activeFactoryIndex]);

  const activeDeliveryItem = activeDeliveryIndex !== null ? deliveries[activeDeliveryIndex] : null;
  const activeFactoryItem = activeFactoryIndex !== null ? factoryImages[activeFactoryIndex] : null;

  const handleOpenDeliveryImage = (id) => {
    const originalIndex = deliveries.findIndex((d) => d.id === id);
    if (originalIndex !== -1) {
      setActiveDeliveryIndex(originalIndex);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 w-full max-w-full overflow-x-hidden">
      
      {/* 1. Header */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-[#FE8003] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-bold">Entrega a nuestros clientes</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div className="space-y-2 max-w-3xl text-left">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
                Entrega a nuestros clientes
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase text-slate-900 tracking-tight">
                Entrega a nuestros clientes
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Fotografías reales de maquinarias entregadas directamente en predios, parcelaciones y faenas en todo Chile con inducción en terreno.
              </p>

              {/* Bloque Imagen 2: Especialistas en Mini Excavadoras Nuevas con Entrega Inmediata */}
              <div className="pt-4 mt-2 border-t border-slate-200/90 space-y-3">
                <h2 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 tracking-tight leading-snug">
                  Especialistas en Venta de Maquinaria Nueva y Semi Nueva con Entrega Inmediata
                </h2>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    En <strong className="text-slate-900 font-bold">RST Chile</strong> somos la empresa referente en la importación directa, venta de maquinaria nueva y semi nueva, comercialización y servicio postventa de <strong className="text-slate-900 font-bold">mini excavadoras compactas RIPPA</strong> y maquinaria de 0.8 a 7.5 toneladas en nuestro país.
                  </p>
                  <p>
                    Nacimos con el objetivo de brindar a contratistas, agricultores, parceleros y empresas constructoras herramientas de máxima confiabilidad y rendimiento, eliminando intermediarios y entregando respaldo directo de fábrica con repuestos originales y soporte técnico garantizado.
                  </p>
                </div>
              </div>
            </div>

            {/* Indicador de interacción */}
            <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-full border border-slate-200 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Pasa el cursor para pausar · Clic para ampliar</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dos Líneas de Imágenes en Movimiento Continuo */}
      <section 
        className="py-10 sm:py-14 space-y-5 overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Degradados sutiles en los bordes para suavizar la entrada/salida */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-28 bg-gradient-to-r from-slate-50 to-transparent z-20"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-28 bg-gradient-to-l from-slate-50 to-transparent z-20"></div>

        {/* LÍNEA 1 (ARRIBA): Se mueve hacia la DERECHA */}
        <div className="w-full overflow-hidden select-none">
          <div 
            className={`animate-marquee-right flex gap-3 sm:gap-4 md:gap-5 ${isPaused ? '[animation-play-state:paused]' : ''}`}
          >
            {duplicatedTop.map((item, idx) => (
              <div
                key={`top-${item.id}-${idx}`}
                onClick={() => handleOpenDeliveryImage(item.id)}
                className="group relative shrink-0 w-[240px] sm:w-[320px] md:w-[380px] h-[170px] sm:h-[220px] md:h-[250px] bg-slate-900 rounded-[3px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-[#FE8003]"
                title="Click para ampliar fotografía"
              >
                <picture>
                  <source srcSet={item.webp} type="image/webp" />
                  <img
                    src={item.image}
                    alt="Entrega real RST en terreno"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                  />
                </picture>

                {/* Hover con icono de ampliación */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-lg transform scale-80 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5 text-[#FE8003]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LÍNEA 2 (ABAJO): Se mueve hacia la IZQUIERDA */}
        <div className="w-full overflow-hidden select-none pt-1">
          <div 
            className={`animate-marquee-left flex gap-3 sm:gap-4 md:gap-5 ${isPaused ? '[animation-play-state:paused]' : ''}`}
          >
            {duplicatedBottom.map((item, idx) => (
              <div
                key={`bottom-${item.id}-${idx}`}
                onClick={() => handleOpenDeliveryImage(item.id)}
                className="group relative shrink-0 w-[240px] sm:w-[320px] md:w-[380px] h-[170px] sm:h-[220px] md:h-[250px] bg-slate-900 rounded-[3px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-[#FE8003]"
                title="Click para ampliar fotografía"
              >
                <picture>
                  <source srcSet={item.webp} type="image/webp" />
                  <img
                    src={item.image}
                    alt="Entrega real RST en terreno"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                  />
                </picture>

                {/* Hover con icono de ampliación */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-lg transform scale-80 group-hover:scale-100 transition-transform">
                    <ZoomIn className="w-5 h-5 text-[#FE8003]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 3. SECCIÓN: EQUIPOS EN FÁBRICA */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-slate-900 tracking-tight">
              Equipos en fábrica
            </h2>
          </div>

          {/* Galería normal de imágenes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {factoryImages.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActiveFactoryIndex(index)}
                className="overflow-hidden rounded border border-slate-200 bg-slate-50 hover:border-[#FE8003] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center"
              >
                <picture className="w-full">
                  <source srcSet={item.webp} type="image/webp" />
                  <img
                    src={item.image}
                    alt="Equipo en fábrica"
                    loading="lazy"
                    className="w-full h-auto object-cover block"
                  />
                </picture>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Banner Inferior */}
      <section className="bg-slate-50 py-10 sm:py-14 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1e1e1e] rounded-[3px] p-6 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl border border-slate-800">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white">
                ¿Quieres recibir tu mini excavadora en tu propio predio?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Despachamos directo a tu terreno en cualquier punto de Chile. Puesta en marcha, inducción operativa y entrega con toda la documentación oficial.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                to="/catalogo"
                className="btn-antek btn-antek-primary w-full sm:w-auto text-xs"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20cotizar%20un%20equipo%20con%20despacho%20para%20mi%20predio.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-antek btn-antek-outline w-full sm:w-auto text-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#FE8003]" />
                <span>Cotizar Despacho</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Visor en Pantalla Completa (Entregas en Terreno) */}
      {activeDeliveryItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveDeliveryIndex(null)}
        >
          {/* Botón Cerrar */}
          <button
            onClick={() => setActiveDeliveryIndex(null)}
            className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar visor"
            title="Cerrar (Esc)"
          >
            <X className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Flecha Anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveDeliveryIndex((prev) => (prev - 1 + deliveries.length) % deliveries.length);
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-[#FE8003] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Foto anterior"
            title="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Flecha Siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveDeliveryIndex((prev) => (prev + 1) % deliveries.length);
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-[#FE8003] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Foto siguiente"
            title="Foto siguiente"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Contenedor de la Imagen */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full flex flex-col items-center justify-center"
          >
            <div className="relative max-h-[85vh] flex items-center justify-center overflow-hidden rounded-lg shadow-2xl bg-black">
              <picture>
                <source srcSet={activeDeliveryItem.webp} type="image/webp" />
                <img
                  src={activeDeliveryItem.image}
                  alt="Entrega RST en terreno"
                  className="max-h-[80vh] w-auto max-w-full object-contain select-none"
                />
              </picture>
            </div>

            {/* Contador */}
            <div className="mt-3 flex items-center justify-between w-full max-w-md px-4 text-xs text-white/70">
              <span className="font-mono">
                Foto {activeDeliveryIndex + 1} de {deliveries.length}
              </span>
              <a
                href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20estoy%20viendo%20las%20fotos%20de%20entregas%20y%20quiero%20consultar%20por%20un%20equipo.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white hover:text-[#FE8003] font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#FE8003]" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 6. Visor en Pantalla Completa (Equipos en Fábrica) */}
      {activeFactoryItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveFactoryIndex(null)}
        >
          {/* Botón Cerrar */}
          <button
            onClick={() => setActiveFactoryIndex(null)}
            className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar visor"
            title="Cerrar (Esc)"
          >
            <X className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Flecha Anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveFactoryIndex((prev) => (prev - 1 + factoryImages.length) % factoryImages.length);
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-[#FE8003] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Foto anterior"
            title="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Flecha Siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveFactoryIndex((prev) => (prev + 1) % factoryImages.length);
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-[#FE8003] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Foto siguiente"
            title="Foto siguiente"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Contenedor de la Imagen */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full flex flex-col items-center justify-center"
          >
            <div className="relative max-h-[85vh] flex items-center justify-center overflow-hidden rounded-lg shadow-2xl bg-black">
              <picture>
                <source srcSet={activeFactoryItem.webp} type="image/webp" />
                <img
                  src={activeFactoryItem.image}
                  alt="Equipo en fábrica"
                  className="max-h-[80vh] w-auto max-w-full object-contain select-none"
                />
              </picture>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
