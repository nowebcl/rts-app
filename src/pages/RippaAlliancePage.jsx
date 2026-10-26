import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  Wrench, 
  Award, 
  Cpu, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Phone,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Factory,
  Check,
  Sparkles
} from 'lucide-react';
import { companyData } from '../data/excavators';
import { factoryImages } from '../data/factoryGallery';

export default function RippaAlliancePage() {
  const [activeFactoryIndex, setActiveFactoryIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keyboard controls for factory image lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeFactoryIndex !== null) {
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
  }, [activeFactoryIndex]);

  const activeItem = activeFactoryIndex !== null ? factoryImages[activeFactoryIndex] : null;

  return (
    <div className="bg-[#f9f9f9] min-h-screen pb-24 w-full max-w-full overflow-x-hidden">
      {/* 1. Page Header Banner */}
      <div className="bg-[#1a1a1a] text-white py-14 border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="text-xs font-heading font-bold text-[#FE8003] uppercase tracking-widest flex items-center gap-2">
                <Factory className="w-4 h-4 text-[#FE8003]" />
                <span>Respaldo y Distribución Oficial en Chile</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase text-white tracking-wide">
                Alianza con RIPPA
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#888888]">
              <Link to="/" className="hover:text-[#FE8003] transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-[#FE8003]">Alianza con RIPPA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {/* 2. Hero Principal: SEGUNDA IMAGEN COMO PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          
          {/* Columna Texto */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="antek-dashes shrink-0">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
                Fabricación Inteligente & Vínculo Directo de Origen
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase text-[#222222] leading-tight">
              Alianza Estratégica Directa con Fábrica RIPPA
            </h2>
            <p className="text-sm text-[#555555] leading-relaxed">
              En <strong>RST Chile</strong> mantenemos un vínculo comercial y técnico directo con las plantas industriales de <strong>RIPPA Group</strong>, uno de los fabricantes globales más avanzados en maquinaria compacta y mini excavadoras con presencia en más de 60 países.
            </p>
            <p className="text-sm text-[#555555] leading-relaxed">
              Esta alianza directa nos permite <strong>eliminar intermediarios comerciales</strong>, asegurando que cada cliente en Chile adquiera maquinaria de última generación con configuración especial para los suelos chilenos, certificación internacional y el mejor precio de plaza.
            </p>

            {/* Badges de Garantía y Experiencia */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3.5 border border-[#e5e5e5] rounded-[2px] shadow-2xs">
                <span className="text-2xl sm:text-3xl font-heading font-black text-[#FE8003]">6 Años</span>
                <span className="text-xs font-heading font-bold uppercase text-[#222222] block mt-1">Con RIPPA</span>
                <span className="text-[11px] text-[#777777] block">Importación continua</span>
              </div>
              <div className="bg-white p-3.5 border border-[#e5e5e5] rounded-[2px] shadow-2xs">
                <span className="text-2xl sm:text-3xl font-heading font-black text-[#FE8003]">100%</span>
                <span className="text-xs font-heading font-bold uppercase text-[#222222] block mt-1">Repuestos</span>
                <span className="text-[11px] text-[#777777] block">Originales de fábrica</span>
              </div>
              <div className="bg-white p-3.5 border border-[#e5e5e5] rounded-[2px] shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-2xl sm:text-3xl font-heading font-black text-[#FE8003]">12 Meses</span>
                <span className="text-xs font-heading font-bold uppercase text-[#222222] block mt-1">Garantía</span>
                <span className="text-[11px] text-[#777777] block">O 1.000 horas por escrito</span>
              </div>
            </div>

            {/* CTAs directos */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/catalogo"
                className="btn-antek btn-antek-primary text-xs inline-flex items-center gap-2"
              >
                <span>Ver Modelos RIPPA Disponibles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20cotizar%20una%20mini%20excavadora%20RIPPA%20con%20respaldo%20de%20f%C3%A1brica.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-antek btn-antek-dark text-xs inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#FE8003]" />
                <span>Hablar con Especialista</span>
              </a>
            </div>
          </div>

          {/* Columna Foto Principal: ALIANZA OFICIAL RST - RIPPA */}
          <div className="lg:col-span-6">
            <div className="border-4 border-[#1f1f1f] shadow-2xl relative overflow-hidden group rounded-[2px] bg-black">
              <picture>
                <source srcSet="/images/alianza-rippa-fabrica.webp" type="image/webp" />
                <img
                  src="/images/alianza-rippa-fabrica.jpg"
                  alt="Alianza Estratégica RST Chile con Directivos de Fábrica RIPPA"
                  className="w-full h-[500px] sm:h-[560px] lg:h-[600px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none"></div>

              {/* Badge superior */}
              <div className="absolute top-4 left-4 bg-[#FE8003] text-white text-[11px] font-heading font-black uppercase px-3 py-1.5 shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Alianza Oficial Directa con RIPPA</span>
              </div>

              {/* Pie de foto descriptivo */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#111111]/90 text-white p-4 text-xs backdrop-blur-xs border-l-4 border-[#FE8003] shadow-lg">
                <span className="font-heading font-bold uppercase block text-[#FE8003] text-sm tracking-wide">
                  Encuentro Oficial y Respaldo de Fábrica
                </span>
                <span className="text-[#cccccc] text-[11px] sm:text-xs">
                  Vínculo comercial y técnico directo de RST Chile con la directiva global de RIPPA Group para distribución oficial en Chile.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Cuatro Pilares de la Alianza con Fábrica */}
        <div className="bg-white border border-[#e5e5e5] p-6 sm:p-10 shadow-sm rounded-[2px] text-left">
          <div className="max-w-3xl space-y-2 mb-10">
            <div className="antek-dashes">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
              Beneficios Reales para el Cliente en Chile
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#222222]">
              ¿Por Qué Comprar RIPPA con Respaldo Oficial RST?
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
              Comprar una mini excavadora es una inversión de trabajo. Nuestra alianza de origen elimina riesgos y te entrega tranquilidad total.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 border border-[#eaeaea] hover:border-[#FE8003] rounded-[2px] space-y-3 transition-colors bg-[#fafafa]">
              <div className="w-10 h-10 rounded-[2px] bg-[#FE8003] text-white flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-sm uppercase text-[#222222]">
                Trato Directo de Fábrica
              </h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Sin cadenas de revendedores ni comisiones infladas. Obtenemos precio de distribuidor directo transferido a nuestros clientes.
              </p>
            </div>

            <div className="p-5 border border-[#eaeaea] hover:border-[#FE8003] rounded-[2px] space-y-3 transition-colors bg-[#fafafa]">
              <div className="w-10 h-10 rounded-[2px] bg-[#FE8003] text-white flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-sm uppercase text-[#222222]">
                Motores Japoneses y Euro V
              </h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Equipadas con motores de renombre mundial: Kubota D902/D722 Japón, Yanmar 3TNV88 y opciones Changchai de alta durabilidad.
              </p>
            </div>

            <div className="p-5 border border-[#eaeaea] hover:border-[#FE8003] rounded-[2px] space-y-3 transition-colors bg-[#fafafa]">
              <div className="w-10 h-10 rounded-[2px] bg-[#FE8003] text-white flex items-center justify-center font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-sm uppercase text-[#222222]">
                Bodega Propia de Repuestos
              </h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Disponibilidad inmediata en Chile de orugas, filtros de aire/aceite, bombas hidráulicas Shimadzu y componentes de repuesto.
              </p>
            </div>

            <div className="p-5 border border-[#eaeaea] hover:border-[#FE8003] rounded-[2px] space-y-3 transition-colors bg-[#fafafa]">
              <div className="w-10 h-10 rounded-[2px] bg-[#FE8003] text-white flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-black text-sm uppercase text-[#222222]">
                Despacho e Inducción en Predio
              </h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                Llevamos tu equipo en camión rampa a cualquier región de Chile con puesta en marcha técnica y capacitación de mandos en terreno.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Galería de Inspección en Fábrica */}
        <div className="space-y-6 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e5e5e5] pb-4">
            <div className="space-y-1">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="text-xs font-heading font-bold uppercase text-[#FE8003] tracking-widest">
                Control de Calidad en Planta
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#222222]">
                Galería de Inspección Técnica en Fábrica
              </h3>
              <p className="text-xs text-[#666666]">
                Registro fotográfico de auditorías técnicas, líneas de corte láser y verificación de componentes hidráulicos en origen.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {factoryImages.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => setActiveFactoryIndex(idx)}
                className="group relative bg-black rounded-[2px] overflow-hidden border-2 border-[#222222] hover:border-[#FE8003] shadow-md transition-all cursor-pointer aspect-4/3"
              >
                <picture>
                  {img.webp && <source srcSet={img.webp} type="image/webp" />}
                  <img
                    src={img.image}
                    alt="Inspección en Fábrica RIPPA"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-[#FE8003] text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-200">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 bg-[#111111]/90 text-white text-[10px] font-heading font-bold uppercase px-2 py-0.5 border-l-2 border-[#FE8003]">
                  Inspección #{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Modelos RIPPA Más Vendidos en Chile */}
        <div className="bg-[#1f1f1f] text-white p-8 sm:p-10 rounded-[2px] border border-[#333333] text-left space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#333333] pb-6">
            <div className="space-y-1">
              <span className="text-xs font-heading font-bold text-[#FE8003] uppercase tracking-wider">
                Gama Oficial RIPPA
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-white">
                Flota RIPPA con Entrega Inmediata en Chile
              </h3>
              <p className="text-xs text-[#aaaaaa]">
                Equipos compactos para parcelaciones, viñas, construcción y contratistas de 0.75 a 2.5 toneladas.
              </p>
            </div>

            <Link
              to="/catalogo"
              className="btn-antek btn-antek-primary text-xs py-3 px-6 inline-flex items-center gap-2 shrink-0"
            >
              <span>Explorar Fichas Técnicas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {[
              { name: 'Rippa R06 Kubota', ton: '0.75 Ton', desc: 'Ultracompacta, pasa por puertas de 80 cm, orugas angostas.', link: '/catalogo' },
              { name: 'Rippa R10 Eco', ton: '1.0 Ton', desc: 'Líder en parcelas y zanjas de riego, bajo consumo diésel.', link: '/catalogo' },
              { name: 'Rippa R15 Boom Swing', ton: '1.5 Ton', desc: 'Brazo articulado lateral para excavar pegado a pircas o muros.', link: '/catalogo' },
              { name: 'Rippa R22 Pro Kubota', ton: '2.5 Ton', desc: 'Potencia profesional, cabina cerrada con aire y doble joystick pilotado.', link: '/catalogo' },
            ].map((mod, i) => (
              <div key={i} className="bg-[#2a2a2a] p-4 rounded-[2px] border border-[#383838] hover:border-[#FE8003] transition-colors space-y-2">
                <span className="text-xs font-heading font-bold text-[#FE8003] uppercase tracking-wider block">
                  {mod.ton}
                </span>
                <h4 className="text-sm font-heading font-black uppercase text-white">
                  {mod.name}
                </h4>
                <p className="text-xs text-[#aaaaaa] leading-relaxed">
                  {mod.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Contact Banner Directo */}
        <div className="bg-[#FE8003] text-white p-8 sm:p-10 rounded-[2px] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white">
              ¿Quieres Cotizar una Mini Excavadora RIPPA?
            </h3>
            <p className="text-xs sm:text-sm text-white/90">
              Te asesoramos con fichas técnicas, opciones de motorización y prueba de mandos en terreno.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20cotizar%20una%20maquinaria%20RIPPA.`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 bg-white hover:bg-slate-100 text-[#FE8003] font-heading font-bold text-xs uppercase tracking-wider rounded-[2px] shadow-md transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Cotizar por WhatsApp</span>
            </a>
            <a
              href={`tel:${companyData.phoneRaw}`}
              className="py-3 px-6 bg-black/30 hover:bg-black/50 text-white font-heading font-bold text-xs uppercase tracking-wider rounded-[2px] transition-colors flex items-center gap-2 border border-white/30"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar Ahora</span>
            </a>
          </div>
        </div>

      </div>

      {/* 7. Visor Lightbox para la Galería de Fábrica */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveFactoryIndex(null)}
        >
          <button
            onClick={() => setActiveFactoryIndex(null)}
            className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar visor"
          >
            <X className="w-6 h-6 stroke-[2]" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveFactoryIndex((prev) => (prev - 1 + factoryImages.length) % factoryImages.length);
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-[#FE8003] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveFactoryIndex((prev) => (prev + 1) % factoryImages.length);
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-[#FE8003] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Foto siguiente"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.2]" />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full flex flex-col items-center justify-center"
          >
            <div className="relative max-h-[82vh] flex items-center justify-center overflow-hidden rounded-lg shadow-2xl bg-black">
              <picture>
                {activeItem.webp && <source srcSet={activeItem.webp} type="image/webp" />}
                <img
                  src={activeItem.image}
                  alt="Inspección en Fábrica RIPPA"
                  className="max-h-[75vh] w-auto max-w-full object-contain select-none"
                />
              </picture>
            </div>

            <div className="mt-3 flex items-center justify-between w-full max-w-md px-4 text-xs text-white/70">
              <span className="font-mono">
                Foto {activeFactoryIndex + 1} de {factoryImages.length} · Auditoría en Fábrica RIPPA
              </span>
              <a
                href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20consultar%20por%20la%20importaci%C3%B3n%20y%20alianza%20con%20RIPPA.`}
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
    </div>
  );
}
