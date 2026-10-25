import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  Wrench, 
  CheckCircle2, 
  MapPin, 
  Award, 
  Building2, 
  Phone,
  MessageCircle,
  ArrowRight,
  Headphones,
  Check,
  Target,
  Eye
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../components/SocialIcons';
import { companyData } from '../data/excavators';

export default function AboutPage() {
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
                Distribuidor Principal RIPPA en Chile
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white tracking-wide">
                Quiénes Somos & Respaldo Oficial
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
        {/* 1. Sección Principal: Presentación de Quiénes Somos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          <div className="lg:col-span-6 space-y-5">
            <div className="antek-dashes mb-1">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
              Líderes en Maquinaria Compacta en Chile
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase text-[#222222] leading-tight">
              Especialistas en Venta de Maquinaria Nueva y Semi Nueva con Entrega Inmediata
            </h2>
            <p className="text-sm text-[#555555] leading-relaxed">
              En <strong>RST Chile</strong> contamos con <strong>9 años de experiencia trabajando en servicios</strong> y <strong>6 años especializados en importaciones</strong> directas de maquinaria, consolidándonos como referentes en soporte técnico, venta de maquinaria nueva y semi nueva, comercialización y postventa de <strong>mini excavadoras compactas RIPPA</strong> y equipos de 0.8 a 7.5 toneladas en nuestro país.
            </p>
            <p className="text-sm text-[#555555] leading-relaxed">
              Tenemos una <strong>alianza directa con fábrica RIPPA</strong>, lo que nos permite eliminar intermediarios y garantizar a contratistas, agricultores, parceleros y empresas constructoras herramientas de máxima confiabilidad y rendimiento, con repuestos originales de fábrica y respaldo técnico garantizado.
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
              <div className="bg-white p-4 border border-[#e5e5e5] rounded-[2px] shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-2xl sm:text-3xl font-heading font-black text-[#FE8003]">Alianza</span>
                <span className="text-xs font-heading font-bold uppercase text-[#222222] block mt-1">Fábrica RIPPA</span>
                <span className="text-[11px] text-[#777777] block">Respaldo directo de origen</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="border-4 border-[#1f1f1f] shadow-2xl relative overflow-hidden group">
              <img
                src="/FOTOS EN FABRICA/WhatsApp Image 2026-10-24 at 12.07.39.webp"
                alt="Alianza Directa de Fábrica RIPPA con RST Chile"
                className="w-full h-[450px] object-cover object-center"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#111111]/90 text-white p-4 text-xs backdrop-blur-xs border-l-4 border-[#FE8003]">
                <span className="font-heading font-bold uppercase block text-[#FE8003] text-sm">Alianza Directa con Fábrica RIPPA</span>
                <span className="text-[#cccccc]">Importación directa sin intermediarios · 6 años importando · 9 años en servicios</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Sección Quiénes Somos: Misión y Visión Extendida */}
        <div className="bg-white border border-[#e5e5e5] p-6 sm:p-10 lg:p-12 shadow-sm rounded-[2px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch text-left">
            {/* Columna Izquierda: Imagen Alianza Directa RIPPA */}
            <div className="lg:col-span-5 relative flex flex-col">
              <div className="border-4 border-[#1f1f1f] shadow-xl overflow-hidden relative h-full min-h-[380px] sm:min-h-[460px] lg:min-h-full">
                <img
                  src="/images/rippa-alianza.jpg"
                  alt="Alianza Oficial RST y RIPPA en Chile"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#FE8003] text-white py-3 px-5 shadow-lg hidden sm:block text-left z-10">
                <div className="font-heading font-black text-sm uppercase">DISTRIBUIDOR PRINCIPAL</div>
                <div className="text-[11px] text-white/90">Oficial RIPPA en Chile</div>
              </div>
            </div>

            {/* Columna Derecha: Misión y Visión Extendidas */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="antek-dashes">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
                  Propósito Corporativo & Dirección Estratégica
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase text-[#222222] leading-tight">
                  Nuestra Misión y Visión
                  <span className="block text-xl sm:text-2xl text-[#FE8003] mt-1 font-extrabold">
                    Líderes y Pioneros en Maquinaria Compacta en Chile
                  </span>
                </h2>
                <p className="text-sm text-[#555555] leading-relaxed pt-1">
                  En <strong>RST Chile</strong> entendemos las exigencias reales del trabajo en faena, campo y construcción. Respaldados por nuestra alianza directa con fábrica RIPPA, guiamos nuestro crecimiento bajo un compromiso inquebrantable con la productividad, el respaldo técnico y la cercanía con cada cliente.
                </p>
              </div>

              {/* Misión Extendida */}
              <div className="bg-[#f8f9fa] border-l-4 border-[#FE8003] p-5 sm:p-6 rounded-[2px] shadow-2xs space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[2px] bg-[#FE8003] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base uppercase text-[#222222] tracking-wide">
                      Misión RST Chile
                    </h3>
                    <span className="text-[11px] font-heading font-bold uppercase text-[#FE8003] tracking-wider block">
                      Propósito Operativo y Rendimiento en Terreno
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#444444] leading-relaxed">
                  Importamos y comercializamos maquinaria nueva y semi nueva compacta, confiable, eficiente y con tecnología de vanguardia a precios altamente competitivos, eliminando intermediarios para reducir el esfuerzo físico y elevar al máximo la productividad en los sectores agrícola, forestal, de la construcción e industrial.
                </p>

                <div className="pt-2 border-t border-[#e5e5e5] space-y-2.5">
                  <div className="flex items-start gap-2.5 text-xs text-[#555555] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#FE8003] shrink-0 mt-0.5" />
                    <span><strong>Acceso Directo y Sin Intermediarios:</strong> Alianza estratégica de fábrica con RIPPA que asegura equipos con control de calidad bajo normas ISO y repuestos genuinos sin sobrecostos.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#555555] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#FE8003] shrink-0 mt-0.5" />
                    <span><strong>Continuidad Operacional Garantizada:</strong> Servicio técnico especializado, rigurosas pruebas de presión hidráulica en taller antes del despacho y stock permanente de repuestos e insumos.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#555555] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#FE8003] shrink-0 mt-0.5" />
                    <span><strong>Humanización del Trabajo Pesado:</strong> Mecanización inteligente que transforma labores manuales extenuantes en faenas rápidas, seguras y altamente rentables para operarios y familias.</span>
                  </div>
                </div>
              </div>

              {/* Visión Extendida */}
              <div className="bg-[#f8f9fa] border-l-4 border-[#222222] p-5 sm:p-6 rounded-[2px] shadow-2xs space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[2px] bg-[#222222] text-[#FE8003] flex items-center justify-center shrink-0 shadow-xs">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base uppercase text-[#222222] tracking-wide">
                      Nuestra Visión de Futuro
                    </h3>
                    <span className="text-[11px] font-heading font-bold uppercase text-[#777777] tracking-wider block">
                      Liderazgo, Innovación y Proyección Global
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#444444] leading-relaxed">
                  Buscar, importar y acercar tecnología e innovación de calidad mundial, para resolver necesidades reales y mejorar sostenidamente la eficiencia en los distintos sectores productivos de la región, nuestro país y el mundo.
                </p>

                <div className="pt-2 border-t border-[#e5e5e5] space-y-2.5">
                  <div className="flex items-start gap-2.5 text-xs text-[#555555] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#222222] shrink-0 mt-0.5" />
                    <span><strong>Referente y Líder Nacional:</strong> Ser la empresa más confiable y elegida en Chile en el segmento de mini excavadoras y maquinaria compacta, con cobertura técnica de norte a sur.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#555555] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#222222] shrink-0 mt-0.5" />
                    <span><strong>Innovación Constante en Terreno:</strong> Rastrear permanentemente los avances de la ingeniería internacional para traer a Chile implementos y configuraciones de vanguardia.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-[#555555] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#222222] shrink-0 mt-0.5" />
                    <span><strong>Socio Estratégico para el Desarrollo:</strong> Acompañar a contratistas, parceleros y productores como un aliado indispensable para el crecimiento rentable de sus proyectos.</span>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/catalogo"
                  className="btn-antek btn-antek-dark inline-flex items-center gap-3 text-xs"
                >
                  <span>Explorar Modelos RIPPA</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20solicito%20asesoría%20sobre%20mini%20excavadoras%20y%20respaldo%20técnico.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-antek btn-antek-primary inline-flex items-center gap-3 text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Pilares de Respaldo */}
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

        {/* 4. Banner de Redes Sociales y Comunidad */}
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
    </div>
  );
}
