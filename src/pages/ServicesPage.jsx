import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  MessageCircle,
  Wrench,
  Layers,
  CheckCircle2,
  Ruler,
  Compass,
  HardHat,
  Sparkles,
  Truck,
  MapPin,
  Clock,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { companyData } from '../data/excavators';
import { allServicesGallery } from '../data/servicesGallery';

const servicesList = [
  {
    id: 'movimiento-tierras',
    icon: Layers,
    title: 'Movimiento de Tierras & Nivelación',
    category: 'Obras Civiles & Parcelaciones',
    summary: 'Preparación y despeje de terreno para construcciones, nivelación precisa de plataformas para radieres de casas, cabañas y galpones.',
    specs: [
      'Escarpe superficial de capa vegetal y acopio de tierra negra fértil.',
      'Corte de taludes y terrazas escalonadas en pendientes pronunciadas.',
      'Relleno, extendido y compactación de estabilizado o ripio.',
      'Preparación de bases firmes para radieres y fundaciones.'
    ],
    machinery: 'Mini Excavadoras 1.5 a 3.5 Ton con balde nivelador de 80 a 100 cm'
  },
  {
    id: 'fosas-drenes',
    icon: CheckCircle2,
    title: 'Fosas Sépticas & Drenes de Infiltración',
    category: 'Instalaciones Sanitarias Rurales',
    summary: 'Excavación a medida para instalación de fosas sépticas, cámaras desgrasadoras e instalación de drenes de infiltración según normativa.',
    specs: [
      'Excavación precisa para fosas de polietileno o fibra (1.200 a 5.000 L).',
      'Excavación para cámaras desgrasadoras y de inspección sanitaria.',
      'Zanjas de infiltración con cama de gravilla y tela geotextil.',
      'Tapado y perfilado final sin sobrecompactar los drenes.'
    ],
    machinery: 'Baldes zanjeros de 30-40 cm para zanjas estables sin desmorone'
  },
  {
    id: 'zanjas-canalizaciones',
    icon: Ruler,
    title: 'Apertura de Zanjas & Canalizaciones',
    category: 'Redes de Agua, Luz & Riego',
    summary: 'Zanjeo rápido y lineal para tendido de cañerías de agua potable, riego por goteo, drenajes perimetrales y canalización de cables eléctricos subterráneos.',
    specs: [
      'Zanjas para cañerías de agua potable (APR), vertientes y pozo profundo.',
      'Canalización subterránea para electricidad monofásica / trifásica y conduit.',
      'Drenajes franceses y zanjas perimetrales para evacuar aguas lluvia.',
      'Profundidades de 60 cm a 1.80 m con ancho controlado de 20 a 40 cm.'
    ],
    machinery: 'Balde angosto zanjero de 20-30 cm para mínimo impacto en el prado'
  },
  {
    id: 'caminos-accesos',
    icon: Compass,
    title: 'Caminos Interiores & Accesos a Parcelas',
    category: 'Vialidad y Accesibilidad Rural',
    summary: 'Apertura de nuevas huellas, mejoramiento de accesos vehiculares, conformación de subrasante y cunetas laterales para evacuación pluvial.',
    specs: [
      'Desmonte y despeje de huellas en parcelaciones y fundos.',
      'Confección de cunetas laterales en "V" con balde basculante orientable.',
      'Colocación de tubos alcantarilla de cruce de aguas en accesos.',
      'Ensanchamiento de servidumbres de paso y curvas pronunciadas.'
    ],
    machinery: 'Mini Excavadora con balde orientable basculante a 45°'
  },
  {
    id: 'limpieza-destronque',
    icon: Wrench,
    title: 'Limpieza de Terrenos & Destronque',
    category: 'Desbroce & Preparación de Terreno',
    summary: 'Extracción mecanizada de raíces, tocones, espinillos y retiro de piedras grandes para habilitar predios agrícolas o de agrado.',
    specs: [
      'Arranque de tocones de árboles talados y raíces profundas.',
      'Limpieza y desbroce de zarzamora, quila y matorrales invasivos.',
      'Desentierro y acopio de bolones volcánicos y piedras de pircas.',
      'Limpieza perimetral previa al levantamiento de cercos y deslindes.'
    ],
    machinery: 'Uña desgarradora (Ripper) y pinza / garra hidráulica 360°'
  },
  {
    id: 'ahoyado-cercos',
    icon: HardHat,
    title: 'Ahoyado Mecanizado para Cercos',
    category: 'Cierres Perimetrales & Plantaciones',
    summary: 'Perforación de hoyos con barreno hidráulico continuo para levantamiento rápido y resistente de cercos perimetrales y plantaciones forestales o frutales.',
    specs: [
      'Hoyos de 20 cm, 30 cm y 40 cm de diámetro con profundidad de hasta 1.20 m.',
      'Verticalidad exacta y paredes limpias para asentamiento de polines.',
      'Rendimiento superior a 200 hoyos por jornada de trabajo.',
      'Perforación sin esfuerzo en terrenos compactados o con raíces superficiales.'
    ],
    machinery: 'Ahoyador hidráulico helicoidal de alto torque'
  },
  {
    id: 'servicios-agricolas',
    icon: Sparkles,
    title: 'Trabajos Agrícolas con Mini Tractor & Rotovator',
    category: 'Agricultura & Huertos Familiares',
    summary: 'Preparación mecánica de suelos para huertos familiares, siembras de empastadas, mantenimiento de praderas y acondicionamiento de parcelas de agrado.',
    specs: [
      'Pasada de rotovator / rotocultivador para desmenuzar y oxigenar suelo.',
      'Nivelación y refinado superficial de camas de cultivo.',
      'Tratamiento de praderas para resiembras de trébol y ballicas.',
      'Manejo ágil entre hileras de árboles e invernaderos.'
    ],
    machinery: 'Mini tractores japoneses 4x4 (Yanmar / Kubota / Iseki) con rotovator'
  },
  {
    id: 'fletes-logistica',
    icon: Truck,
    title: 'Fletes & Traslado con Camión Rampa Propio',
    category: 'Logística & Puesta en Terreno',
    summary: 'Llegamos a cualquier predio o parcela de la zona con camión rampa propio, asegurando puntualidad y transporte seguro sin intermediarios.',
    specs: [
      'Acceso a caminos interiores de tierra, ripio y cuestas pronunciadas.',
      'Traslado directo desde base Llanquihue a la faena del cliente.',
      'Puntualidad en los horarios coordinados de faena.',
      'Operadores con experiencia en trumao húmedo y barro del sur.'
    ],
    machinery: 'Camión rampa propio equipado con winche y rampas reforzadas'
  }
];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filtrado de imágenes
  const filteredList = useMemo(() => {
    if (activeFilter === 'all') return allServicesGallery;
    return allServicesGallery.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Dividir las fotos en 2 filas alternadas para balancear contenido
  const rowTop = useMemo(() => filteredList.filter((_, i) => i % 2 === 0), [filteredList]);
  const rowBottom = useMemo(() => filteredList.filter((_, i) => i % 2 !== 0), [filteredList]);

  // Duplicar cada fila para bucle continuo infinito (idéntico a Nosotros y Clientes)
  const duplicatedTop = useMemo(() => {
    if (rowTop.length === 0) return [];
    if (rowTop.length < 12) {
      const doubled = [...rowTop, ...rowTop];
      return [...doubled, ...doubled];
    }
    return [...rowTop, ...rowTop];
  }, [rowTop]);

  const duplicatedBottom = useMemo(() => {
    if (rowBottom.length === 0) return [];
    if (rowBottom.length < 12) {
      const doubled = [...rowBottom, ...rowBottom];
      return [...doubled, ...doubled];
    }
    return [...rowBottom, ...rowBottom];
  }, [rowBottom]);

  // Teclado para navegación en pantalla completa
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModalIndex !== null) {
        if (e.key === 'Escape') setActiveModalIndex(null);
        if (e.key === 'ArrowRight') {
          setActiveModalIndex((prev) => (prev + 1) % filteredList.length);
        }
        if (e.key === 'ArrowLeft') {
          setActiveModalIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, filteredList.length]);

  const activeItem = activeModalIndex !== null ? filteredList[activeModalIndex] : null;

  const handleOpenImage = (id) => {
    const originalIndex = filteredList.findIndex((item) => item.id === id);
    if (originalIndex !== -1) {
      setActiveModalIndex(originalIndex);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 w-full max-w-full overflow-x-hidden pb-24">
      {/* 1. Page Header */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-[#FE8003] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-bold">Servicios Realizados</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
            <div className="space-y-2 max-w-3xl text-left">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#FE8003]" />
                <span>9 Años de Experiencia en Terreno</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase text-slate-900 tracking-tight">
                Servicios Realizados & Faenas en Terreno
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Galería completa de trabajos reales ejecutados por el equipo de RST: movimientos de tierra, zanjas para riego, fosas sépticas, caminos interiores, canalizaciones y logística de maquinaria en todo Chile.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20cotizar%20un%20servicio%20con%20mini%20excavadora.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-antek btn-antek-primary text-xs w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Cotizar Servicio</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Estadísticas Rápidas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-[2px] border border-slate-200 shadow-sm text-left">
            <span className="text-3xl font-heading font-black text-[#FE8003]">9+</span>
            <span className="text-xs font-heading font-bold uppercase text-slate-800 block mt-1">Años Operando</span>
            <span className="text-[11px] text-slate-500">Pioneros en el sur</span>
          </div>

          <div className="bg-white p-5 rounded-[2px] border border-slate-200 shadow-sm text-left">
            <span className="text-3xl font-heading font-black text-[#FE8003]">6+</span>
            <span className="text-xs font-heading font-bold uppercase text-slate-800 block mt-1">Años Importando</span>
            <span className="text-[11px] text-slate-500">Directo de fábrica</span>
          </div>

          <div className="bg-white p-5 rounded-[2px] border border-slate-200 shadow-sm text-left">
            <span className="text-3xl font-heading font-black text-[#FE8003]">{allServicesGallery.length}</span>
            <span className="text-xs font-heading font-bold uppercase text-slate-800 block mt-1">Fotos en Terreno</span>
            <span className="text-[11px] text-slate-500">Registro real</span>
          </div>

          <div className="bg-white p-5 rounded-[2px] border border-slate-200 shadow-sm text-left">
            <span className="text-3xl font-heading font-black text-[#FE8003]">100%</span>
            <span className="text-xs font-heading font-bold uppercase text-slate-800 block mt-1">Cobertura Chile</span>
            <span className="text-[11px] text-slate-500">Faenas y despachos</span>
          </div>
        </div>
      </section>

      {/* 3. Filtros y Barra de Interacción */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-heading font-bold uppercase text-slate-400 mr-2">Filtrar por:</span>
            
            <button
              onClick={() => { setActiveFilter('all'); setActiveModalIndex(null); }}
              className={`px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-[2px] transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#FE8003] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Todas las Fotos ({allServicesGallery.length})
            </button>

            <button
              onClick={() => { setActiveFilter('servicios-terreno'); setActiveModalIndex(null); }}
              className={`px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-[2px] transition-all cursor-pointer ${
                activeFilter === 'servicios-terreno'
                  ? 'bg-[#FE8003] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Servicios en Terreno ({allServicesGallery.filter(item => item.category === 'servicios-terreno').length})
            </button>

            <button
              onClick={() => { setActiveFilter('trabajos-terreno'); setActiveModalIndex(null); }}
              className={`px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-[2px] transition-all cursor-pointer ${
                activeFilter === 'trabajos-terreno'
                  ? 'bg-[#FE8003] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Trabajos & Movimiento de Tierra ({allServicesGallery.filter(item => item.category === 'trabajos-terreno').length})
            </button>
          </div>

          {/* Indicador de interacción idéntico a sección clientes y nosotros */}
          <div className="text-xs text-slate-500 flex items-center gap-2 bg-white px-3.5 py-2 rounded-full border border-slate-200 shadow-2xs shrink-0 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Pasa el cursor para pausar · Clic para ampliar</span>
          </div>
        </div>
      </section>

      {/* 4. Galería: Dos Líneas de Imágenes en Loop Continuo Opuesto (Igual que Nosotros y Clientes) */}
      <section 
        className="py-8 sm:py-12 space-y-4 sm:space-y-5 overflow-hidden relative"
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
                onClick={() => handleOpenImage(item.id)}
                className="group relative shrink-0 w-[240px] sm:w-[320px] md:w-[380px] h-[170px] sm:h-[220px] md:h-[250px] bg-slate-900 rounded-[3px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-[#FE8003]"
                title="Click para ampliar fotografía"
              >
                <img
                  src={item.src}
                  alt="Fotografía de faena o servicio en terreno"
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
                  alt="Fotografía de faena o servicio en terreno"
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
      </section>

      {/* 5. INFORMACIÓN REAL Y DETALLADA SOBRE NUESTROS SERVICIOS EN TERRENO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 text-left">
        {/* Encabezado de la Sección de Información */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-2 max-w-3xl">
            <div className="antek-dashes">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#FE8003]" />
              <span>Catálogo Oficial de Faenas y Servicios en Terreno</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase text-[#222222] tracking-tight">
              ¿Qué Trabajos Realizamos en tu Predio?
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-medium">
              Contamos con más de 9 años ejecutando obras con mini maquinarias en el sur de Chile. Nuestras máquinas compactas (desde 0.8 hasta 4.0 toneladas) y mini tractores están diseñados para operar en parcelas de agrado, predios agrícolas y faenas de construcción sin romper accesos ni dañar el suelo.
            </p>
          </div>

          <a
            href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20cotizar%20un%20servicio%20específico%20en%20terreno.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-antek btn-antek-primary text-xs shrink-0 inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar Disponibilidad</span>
          </a>
        </div>

        {/* Grid de 8 Servicios Técnicos Detallados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {servicesList.map((srv) => {
            const Icon = srv.icon;
            return (
              <div 
                key={srv.id}
                className="bg-white border border-slate-200 hover:border-[#FE8003] p-6 rounded-[2px] shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-[2px] bg-orange-50 group-hover:bg-[#FE8003] text-[#FE8003] group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-heading font-extrabold uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-[2px] border border-slate-200">
                      RST Terreno
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-heading font-bold text-[#FE8003] uppercase tracking-wider block">
                      {srv.category}
                    </span>
                    <h3 className="font-heading font-black text-base uppercase text-[#222222] mt-0.5 leading-snug">
                      {srv.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {srv.summary}
                  </p>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-heading font-bold uppercase text-slate-800 block mb-2">
                      Qué incluye la faena:
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-slate-600">
                      {srv.specs.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#FE8003] font-bold mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-[2px]">
                  <span className="text-[10px] font-heading font-extrabold uppercase text-slate-500 block">
                    Equipamiento recomendado:
                  </span>
                  <span className="text-[11px] font-semibold text-slate-800 leading-tight block mt-0.5">
                    {srv.machinery}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Pilares de Metodología de Trabajo en Terreno */}
        <div className="mt-14 bg-white border border-slate-200 p-6 sm:p-10 rounded-[2px] shadow-xs">
          <div className="space-y-2 mb-8">
            <span className="text-xs font-heading font-bold uppercase text-[#FE8003] tracking-widest block">
              Garantía Operativa y Metodología
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#222222]">
              ¿Cómo Trabajamos en tu Parcela o Predio?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              Combinamos máquinas compactas de bajo peso operativo con operadores calificados y equipamiento específico, garantizando que el trabajo se ejecute con exactitud, a tiempo y sin causar destrozos en tu propiedad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-slate-50 border-l-4 border-[#FE8003] rounded-[2px] space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-heading font-black text-sm uppercase">
                <Clock className="w-4 h-4 text-[#FE8003]" />
                <h4>Asesoría y Cubicaje Previo</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evaluamos el tipo de suelo (trumao, arcilla, roca, barro) y la longitud del trabajo para definir el tonelaje óptimo de máquina y horas estimadas.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-l-4 border-slate-800 rounded-[2px] space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-heading font-black text-sm uppercase">
                <ShieldCheck className="w-4 h-4 text-[#FE8003]" />
                <h4>Orugas de Goma sin Daño</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Toda nuestra flota opera sobre orugas de goma diseñadas para transitar sobre pasto, radieres, adoquines y praderas sin romper ni dejar huellones profundos.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-l-4 border-[#FE8003] rounded-[2px] space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-heading font-black text-sm uppercase">
                <Ruler className="w-4 h-4 text-[#FE8003]" />
                <h4>Acceso a Espacios Estrechos</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Equipos compactos desde 90 cm a 1.30 m de ancho con chasis extensible. Ingresan por portones residenciales, bosques nativos y entre construcciones existentes.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-l-4 border-slate-800 rounded-[2px] space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-heading font-black text-sm uppercase">
                <CheckCircle2 className="w-4 h-4 text-[#FE8003]" />
                <h4>Cotización Transparente</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modalidades claras por hora de máquina con operador y combustible, por metro lineal de zanja o por faena cerrada, sin costos ocultos.
              </p>
            </div>
          </div>
        </div>

        {/* Zona de Cobertura Regional */}
        <div className="mt-8 bg-slate-900 text-white p-6 sm:p-10 rounded-[2px] border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
                <MapPin className="w-4 h-4 text-[#FE8003]" />
                <span>Base Operativa en Llanquihue · Ruta V-500</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white">
                Zona de Cobertura Directa para Servicios en Terreno
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Trasladamos nuestros equipos con camión rampa propio a faenas y parcelas en toda la Región de Los Lagos y zonas aledañas:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE8003]"></span>
                  <span>Llanquihue & Totoral</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE8003]"></span>
                  <span>Puerto Varas & Ensenada</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE8003]"></span>
                  <span>Frutillar & Tegualda</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE8003]"></span>
                  <span>Puerto Montt & Alerce</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE8003]"></span>
                  <span>Fresia & Los Muermos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE8003]"></span>
                  <span>Calbuco & Maullín</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE8003]"></span>
                  <span>Osorno & Purranque</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE8003]"></span>
                  <span>Puerto Octay & Puyehue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE8003]"></span>
                  <span>Ancud & Castro (Chiloé)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/80 p-6 rounded-[2px] border border-slate-700 space-y-4 text-center lg:text-left">
              <span className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-wider block">
                ¿Tienes un proyecto en mente?
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cuéntanos qué necesitas hacer: zanjas, fosa, camino, limpieza o nivelación. Te indicamos qué máquina y cuántas horas se requieren para completar el trabajo con la mejor relación costo-calidad.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20cotizar%20un%20servicio%20en%20terreno.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-antek btn-antek-primary text-xs w-full inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar por WhatsApp</span>
                </a>
                <a
                  href={`tel:${companyData.phoneRaw}`}
                  className="btn-antek btn-antek-outline text-xs w-full inline-flex items-center justify-center gap-2 text-white border-white/30 hover:border-[#FE8003]"
                >
                  <Phone className="w-4 h-4 text-[#FE8003]" />
                  <span>{companyData.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Banner CTA de Contacto Final */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 text-left">
        <div className="bg-[#1f1f1f] text-white p-8 sm:p-12 rounded-[2px] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-heading font-bold text-[#FE8003] uppercase tracking-widest block">
              Asesoría Técnica y Disponibilidad
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white">
              ¿Prefieres Comprar tu Propia Máquina?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Además de servicios, en RST somos importadores oficiales de mini excavadoras compactas RIPPA en Chile, con entrega inmediata, inducción operativa en tu predio y garantía directa de 1 año o 1.000 horas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/catalogo"
              className="btn-antek btn-antek-primary text-xs w-full sm:w-auto py-3 px-6 inline-flex items-center justify-center gap-2"
            >
              <span>Ver Catálogo de Venta</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20consultar%20por%20maquinaria%20nueva%20y%20semi%20nueva.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-antek btn-antek-outline text-xs w-full sm:w-auto py-3 px-6 inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#FE8003]" />
              <span>Cotizar Maquinaria</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. Visor en Pantalla Completa (Lightbox Limpio) */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveModalIndex(null)}
        >
          {/* Botón Cerrar */}
          <button
            onClick={() => setActiveModalIndex(null)}
            className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-[#FE8003] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar visor"
            title="Cerrar (Esc)"
          >
            <X className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Flecha Anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveModalIndex((prev) => (prev - 1 + filteredList.length) % filteredList.length);
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-black/50 hover:bg-[#FE8003] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Foto anterior"
            title="Foto anterior (Flecha Izquierda)"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Flecha Siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveModalIndex((prev) => (prev + 1) % filteredList.length);
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-black/50 hover:bg-[#FE8003] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Foto siguiente"
            title="Foto siguiente (Flecha Derecha)"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Contenedor de la Imagen */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full flex flex-col items-center justify-center"
          >
            <div className="relative max-h-[85vh] flex items-center justify-center overflow-hidden rounded-lg shadow-2xl bg-black">
              <img
                src={activeItem.src}
                alt="Fotografía en terreno"
                className="max-h-[80vh] w-auto max-w-full object-contain select-none"
              />
            </div>

            {/* Contador limpio y link directo */}
            <div className="mt-3 flex items-center justify-between w-full max-w-md px-4 text-xs text-white/70">
              <span className="font-mono">
                Foto {activeModalIndex + 1} de {filteredList.length}
              </span>
              <a
                href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20estoy%20viendo%20las%20fotos%20de%20servicios%20y%20quiero%20cotizar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-white hover:text-[#FE8003] font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#FE8003]" />
                <span>Cotizar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
