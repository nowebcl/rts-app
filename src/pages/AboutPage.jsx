import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  Wrench, 
  ArrowRight,
  Target,
  Eye,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../components/SocialIcons';
import { companyData } from '../data/excavators';
import { aboutGalleryPhotos } from '../data/servicesGallery';

export default function AboutPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dividir las fotos en 2 filas alternadas para balancear contenido
  const rowTop = useMemo(() => aboutGalleryPhotos.filter((_, i) => i % 2 === 0), []);
  const rowBottom = useMemo(() => aboutGalleryPhotos.filter((_, i) => i % 2 !== 0), []);

  // Duplicar cada fila para bucle infinito continuo idéntico a sección clientes
  const duplicatedTop = useMemo(() => [...rowTop, ...rowTop], [rowTop]);
  const duplicatedBottom = useMemo(() => [...rowBottom, ...rowBottom], [rowBottom]);

  // Teclado para navegar en el visor en pantalla completa
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex !== null) {
        if (e.key === 'Escape') setActiveImageIndex(null);
        if (e.key === 'ArrowRight') {
          setActiveImageIndex((prev) => (prev + 1) % aboutGalleryPhotos.length);
        }
        if (e.key === 'ArrowLeft') {
          setActiveImageIndex((prev) => (prev - 1 + aboutGalleryPhotos.length) % aboutGalleryPhotos.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  const activeItem = activeImageIndex !== null ? aboutGalleryPhotos[activeImageIndex] : null;

  const handleOpenImage = (id) => {
    const originalIndex = aboutGalleryPhotos.findIndex((item) => item.id === id);
    if (originalIndex !== -1) {
      setActiveImageIndex(originalIndex);
    }
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen pb-24 w-full max-w-full overflow-x-hidden">
      {/* ANTEK: page-head banner */}
      <div className="bg-[#1a1a1a] text-white py-14 border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="text-xs font-heading font-bold text-[#FE8003] uppercase tracking-widest">
                Trayectoria Real en Terreno & Respaldo Oficial
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white tracking-wide">
                Quiénes Somos & Trayectoria RST
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#888888]">
              <Link to="/" className="hover:text-[#FE8003] transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-[#FE8003]">Quiénes Somos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* 1. Sección Principal: Presentación de Quiénes Somos con Foto Principal Oficial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          {/* FOTO PRINCIPAL OFICIAL DE QUIÉNES SOMOS (A la izquierda, sin recuadro negro, bordes redondeados) */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl shadow-xl bg-white">
              <img
                src="/images/quienes-somos-principal.png"
                alt="RST Maquinaria en terreno"
                className="w-full h-auto object-cover block rounded-2xl"
                loading="eager"
              />
            </div>
          </div>

          {/* Columna Texto: Quiénes Somos */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="antek-dashes shrink-0">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
                Líderes en Maquinaria Compacta · Sur de Chile
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase text-[#222222] leading-tight">
              Quiénes Somos
            </h2>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
              Comenzamos como pioneros en servicios con mini excavadoras y mini tractores en el sur de Chile. Nuestra experiencia en terreno nos llevó a viajar a Japón para iniciar la importación de maquinaria y posteriormente a China, buscando nuevas tecnologías y soluciones para mantenernos a la vanguardia de la industria.
            </p>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
              Hoy, nuestra pasión nos impulsa a recorrer el mundo en busca de equipos confiables, eficientes e innovadores para el sur de Chile. Conocemos y trabajamos con lo que comercializamos, lo que nos permite comprender las necesidades reales de nuestros clientes y asesorarlos para encontrar las mejores soluciones para sus proyectos.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-4 border border-[#e5e5e5] rounded-[2px] shadow-2xs">
                <span className="text-3xl font-heading font-black text-[#FE8003]">9 Años</span>
                <span className="text-xs font-heading font-bold uppercase text-[#222222] block mt-1">En Servicios</span>
                <span className="text-[11px] text-[#777777] block">Soporte técnico y postventa</span>
              </div>
              <div className="bg-white p-4 border border-[#e5e5e5] rounded-[2px] shadow-2xs">
                <span className="text-3xl font-heading font-black text-[#FE8003]">6 Años</span>
                <span className="text-xs font-heading font-bold uppercase text-[#222222] block mt-1">En Importaciones</span>
                <span className="text-[11px] text-[#777777] block">Importación directa de maquinaria</span>
              </div>
              <Link 
                to="/alianza-rippa"
                className="bg-white p-4 border border-[#FE8003]/40 hover:border-[#FE8003] rounded-[2px] shadow-2xs col-span-2 sm:col-span-1 group transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-heading font-black text-[#FE8003]">Alianza</span>
                  <ArrowRight className="w-4 h-4 text-[#FE8003] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs font-heading font-bold uppercase text-[#222222] block mt-1">Fábrica RIPPA</span>
                <span className="text-[11px] text-[#777777] group-hover:text-[#FE8003] transition-colors block">Ver Alianza Oficial ›</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. Sección: Misión y Visión */}
        <div className="bg-white p-8 sm:p-12 border border-[#e5e5e5] rounded-[2px] shadow-2xs text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="text-xs font-heading font-bold uppercase text-[#FE8003] tracking-widest">
                Nuestros Fundamentos
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#222222] tracking-tight">
                Misión y Visión
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                Nuestros principios estratégicos guían cada importación, cada entrega en terreno y cada servicio de soporte técnico a lo largo de todo Chile.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-6">
              {/* Misión Extendida */}
              <div className="bg-[#f8f9fa] border-l-4 border-[#FE8003] p-5 sm:p-6 rounded-[2px] shadow-2xs space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[2px] bg-[#FE8003] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base uppercase text-[#222222] tracking-wide">
                      Misión RST
                    </h3>
                    <span className="text-[11px] font-heading font-bold uppercase text-[#FE8003] tracking-wider block">
                      Propósito Operativo y Rendimiento en Terreno
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#444444] leading-relaxed">
                  Importamos y comercializamos maquinaria compacta confiable y eficiente, con tecnología de vanguardia a precios competitivos, para reducir el esfuerzo físico y aumentar la productividad en los sectores agrícola, construcción e Industrial.
                </p>
              </div>

              {/* Visión Extendida */}
              <div className="bg-[#f8f9fa] border-l-4 border-[#222222] p-5 sm:p-6 rounded-[2px] shadow-2xs space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[2px] bg-[#222222] text-[#FE8003] flex items-center justify-center shrink-0 shadow-xs">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base uppercase text-[#222222] tracking-wide">
                      Nuestra Visión
                    </h3>
                    <span className="text-[11px] font-heading font-bold uppercase text-[#777777] tracking-wider block">
                      Liderazgo, Innovación y Proyección Global
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#444444] leading-relaxed">
                  Buscar, importar y acercar tecnología e innovación de calidad, para resolver necesidades reales y mejorar la eficiencia en los distintos sectores productivos de la región, nuestro país y el mundo.
                </p>
              </div>

              {/* Botones de acción */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/alianza-rippa"
                  className="btn-antek btn-antek-dark inline-flex items-center gap-3 text-xs"
                >
                  <span>Conocer Alianza con RIPPA</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#galeria-trayectoria"
                  className="btn-antek btn-antek-outline-dark inline-flex items-center gap-3 text-xs"
                >
                  <span>Ver Galería de Fotos</span>
                  <ArrowRight className="w-4 h-4 text-[#FE8003]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. GALERÍA: 2 CORRIDAS DE IMÁGENES EN LOOP AUTOMÁTICO (IGUAL QUE SECCIÓN CLIENTES) */}
        <section id="galeria-trayectoria" className="space-y-6 text-left scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e5e5e5] pb-5">
            <div className="space-y-2 max-w-3xl">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
                Galería de Faenas & Maquinaria en Terreno
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase text-[#222222] tracking-tight">
                Nuestra Trayectoria en Terreno
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-medium">
                Fotografías reales de nuestras maquinarias, faenas y operaciones en terreno en el sur de Chile.
              </p>
            </div>

            {/* Indicador de interacción idéntico a sección clientes */}
            <div className="text-xs text-slate-500 flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-full border border-slate-200 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Pasa el cursor para pausar · Clic para ampliar</span>
            </div>
          </div>

          {/* Carrusel con 2 corridas de imagen en loop continuo automático */}
          <div 
            className="py-4 sm:py-6 space-y-4 sm:space-y-5 overflow-hidden relative rounded-[2px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Degradados laterales para suavizar entrada y salida */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-28 bg-gradient-to-r from-[#f9f9f9] to-transparent z-20"></div>
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-28 bg-gradient-to-l from-[#f9f9f9] to-transparent z-20"></div>

            {/* LÍNEA 1 (ARRIBA): Se mueve hacia la DERECHA */}
            <div className="w-full overflow-hidden select-none">
              <div 
                className={`animate-marquee-right flex gap-3 sm:gap-4 md:gap-5 ${isPaused ? '[animation-play-state:paused]' : ''}`}
              >
                {duplicatedTop.map((item, idx) => (
                  <div
                    key={`top-${item.id}-${idx}`}
                    onClick={() => handleOpenImage(item.id)}
                    className="group relative shrink-0 w-[240px] sm:w-[320px] md:w-[380px] h-[170px] sm:h-[220px] md:h-[250px] bg-slate-900 rounded-[3px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-[#FE8003]"
                    title="Click para ampliar fotografía"
                  >
                    <img
                      src={item.src}
                      alt="Fotografía de maquinaria en terreno"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                    />

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
                    onClick={() => handleOpenImage(item.id)}
                    className="group relative shrink-0 w-[240px] sm:w-[320px] md:w-[380px] h-[170px] sm:h-[220px] md:h-[250px] bg-slate-900 rounded-[3px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-[#FE8003]"
                    title="Click para ampliar fotografía"
                  >
                    <img
                      src={item.src}
                      alt="Fotografía de maquinaria en terreno"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                    />

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
          </div>
        </section>

        {/* 4. Pilares de Respaldo Técnico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-8 border border-[#e5e5e5] rounded-[2px] space-y-3 shadow-2xs">
            <div className="w-12 h-12 bg-[#FE8003]/10 text-[#FE8003] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-base uppercase text-[#222222]">
              Garantía Escrita Oficial
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              12 meses o 1.000 horas para motor y componentes hidráulicos principales, con respaldo y asesoría técnica directa.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#e5e5e5] rounded-[2px] space-y-3 shadow-2xs">
            <div className="w-12 h-12 bg-[#FE8003]/10 text-[#FE8003] flex items-center justify-center font-bold">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-base uppercase text-[#222222]">
              Stock Permanente de Repuestos
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Kits de filtros para mantención (250, 500 y 1.000 hrs), bombas hidráulicas, orugas de caucho, sellos y pasadores originales.
            </p>
          </div>

          <div className="bg-white p-8 border border-[#e5e5e5] rounded-[2px] space-y-3 shadow-2xs">
            <div className="w-12 h-12 bg-[#FE8003]/10 text-[#FE8003] flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-base uppercase text-[#222222]">
              Despachos y Cobertura Nacional
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Entregamos en cualquier punto de Chile en camión rampa con máquina probada en terreno y capacitación de mandos.
            </p>
          </div>
        </div>

        {/* 5. Banner de Redes Sociales y Comunidad */}
        <div className="bg-[#1f1f1f] text-white p-8 sm:p-10 rounded-[2px] border border-[#333333] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <div className="text-xs font-heading font-bold text-[#FE8003] uppercase tracking-wider">
              Comunidad y Clientes Reales
            </div>
            <h3 className="font-heading font-black text-2xl uppercase text-white">
              Conoce Nuestras Entregas y Pruebas en Terreno
            </h3>
            <p className="text-xs text-[#aaaaaa]">
              Revisa videos de mini excavadoras trabajando con hoyadoras, martillos y desbrozadoras en nuestras redes sociales.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={companyData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-antek btn-antek-primary py-3 px-5 text-xs"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram Oficial</span>
            </a>
            <a
              href={companyData.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-antek btn-antek-dark py-3 px-5 text-xs"
            >
              <FacebookIcon className="w-4 h-4" />
              <span>Facebook RST</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal de Fotografía en Pantalla Completa (Limpio, Sin Títulos Inventados) */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-3 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Botón Cerrar */}
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-4 right-4 z-50 text-white/80 hover:text-white p-2.5 rounded-full bg-white/10 hover:bg-[#FE8003] transition-colors cursor-pointer"
            title="Cerrar (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Botón Anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev - 1 + aboutGalleryPhotos.length) % aboutGalleryPhotos.length);
            }}
            className="absolute left-2 sm:left-6 z-50 text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-[#FE8003] transition-colors cursor-pointer"
            title="Anterior (Flecha Izquierda)"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Botón Siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((prev) => (prev + 1) % aboutGalleryPhotos.length);
            }}
            className="absolute right-2 sm:right-6 z-50 text-white/80 hover:text-white p-3 rounded-full bg-black/50 hover:bg-[#FE8003] transition-colors cursor-pointer"
            title="Siguiente (Flecha Derecha)"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Contenedor de la Imagen */}
          <div 
            className="relative max-h-[88vh] max-w-[92vw] flex items-center justify-center overflow-hidden rounded-lg shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.src}
              alt="Fotografía en terreno ampliada"
              className="max-h-[88vh] max-w-[92vw] w-auto h-auto object-contain block"
            />
          </div>
        </div>
      )}
    </div>
  );
}
