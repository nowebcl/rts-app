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
  Check
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
              Especialistas en Mini Excavadoras Nuevas con Entrega Inmediata
            </h2>
            <p className="text-sm text-[#555555] leading-relaxed">
              En <strong>RST Chile</strong> somos la empresa referente en la importación directa, comercialización y servicio postventa de <strong>mini excavadoras compactas RIPPA</strong> y maquinaria de 0.8 a 3.5 toneladas en nuestro país.
            </p>
            <p className="text-sm text-[#555555] leading-relaxed">
              Nacimos con el objetivo de brindar a contratistas, agricultores, parceleros y empresas constructoras herramientas de máxima confiabilidad y rendimiento, eliminando intermediarios y entregando respaldo directo de fábrica con repuestos originales y soporte técnico garantizado.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 border border-[#e5e5e5] rounded-[2px] shadow-2xs">
                <span className="text-3xl font-heading font-black text-[#FE8003]">100%</span>
                <span className="text-xs font-heading font-bold uppercase text-[#222222] block mt-1">Especialización</span>
                <span className="text-[11px] text-[#777777]">Expertos en maquinaria compacta</span>
              </div>
              <div className="bg-white p-4 border border-[#e5e5e5] rounded-[2px] shadow-2xs">
                <span className="text-3xl font-heading font-black text-[#FE8003]">1.000 hrs</span>
                <span className="text-xs font-heading font-bold uppercase text-[#222222] block mt-1">Garantía Escrita</span>
                <span className="text-[11px] text-[#777777]">12 meses de cobertura oficial</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="border-4 border-[#1f1f1f] shadow-2xl relative overflow-hidden">
              <img
                src="/images/excavators/workshop.jpg"
                alt="Taller Central y Bodega RST Chile"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#111111]/90 text-white p-4 text-xs backdrop-blur-xs">
                <span className="font-heading font-bold uppercase block text-[#FE8003]">Casa Matriz & Taller de Servicio</span>
                <span className="text-[#cccccc]">{companyData.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Sección Alianza Oficial RIPPA */}
        <div className="bg-white border border-[#e5e5e5] p-8 sm:p-12 shadow-sm rounded-[2px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
            <div className="lg:col-span-6 relative">
              <div className="border-4 border-[#1f1f1f] shadow-xl overflow-hidden relative">
                <img
                  src="/images/rippa-alianza.jpg"
                  alt="Alianza Oficial RST y RIPPA"
                  className="w-full h-[380px] sm:h-[420px] object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#FE8003] text-white py-3 px-5 shadow-lg hidden sm:block text-left">
                <div className="font-heading font-black text-sm uppercase">DISTRIBUIDOR PRINCIPAL</div>
                <div className="text-[11px] text-white/90">Oficial RIPPA en Chile</div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
                Respaldo Internacional
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-[#222222] leading-tight">
                Alianza Estratégica Directa de Fábrica con RIPPA
              </h3>
              <p className="text-sm text-[#555555] leading-relaxed">
                Nuestra representación oficial con <strong>RIPPA</strong> nos permite acceder directamente a las últimas líneas de producción, estándares de control de calidad bajo normas ISO y repuestos genuinos de fábrica sin sobrecostos de terceros.
              </p>
              <p className="text-sm text-[#555555] leading-relaxed">
                Cada equipo que ingresa a nuestro país pasa por una exhaustiva revisión mecánica y prueba de presión hidráulica en nuestro taller antes de ser despachado a faena, garantizando una máquina 100% operativa y lista para producir.
              </p>

              <div className="pt-2">
                <Link
                  to="/catalogo"
                  className="btn-antek btn-antek-dark inline-flex items-center gap-3 text-xs"
                >
                  <span>Explorar Modelos RIPPA</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
