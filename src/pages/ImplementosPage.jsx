import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  ZoomIn, 
  X,
  Phone,
  Wrench
} from 'lucide-react';
import { implementosList } from '../data/implementos';
import { companyData } from '../data/excavators';

export default function ImplementosPage() {
  const [activeImageModal, setActiveImageModal] = useState(null);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-24 text-[#222222]">
      {/* 1. Header Banner Industrial Antek */}
      <div className="bg-[#181818] text-white py-12 sm:py-14 border-b border-[#2d2d2d] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="text-xs font-heading font-extrabold text-[#FE8003] uppercase tracking-widest flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5" />
                <span>Accesorios para Mini Excavadoras</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-heading font-black uppercase text-white tracking-wide">
                IMPLEMENTOS
              </h1>
              <p className="text-xs sm:text-sm text-[#aaaaaa] max-w-2xl font-normal leading-relaxed pt-1">
                Catálogo de implementos y accesorios para mini excavadoras disponibles en RST Maquinarias.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#888888] shrink-0 self-start md:self-center">
              <Link to="/" className="hover:text-[#FE8003] transition-colors">Inicio</Link>
              <span>/</span>
              <span className="text-[#FE8003]">Implementos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-10">
        {/* 2. Grid de Implementos en orden estricto (01 a 12) - Solo imágenes y nombres reales */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#e5e5e5]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FE8003]"></span>
              <h2 className="font-heading font-extrabold text-lg sm:text-xl uppercase text-[#222222] tracking-wide">
                Galería de Implementos ({implementosList.length} disponibles)
              </h2>
            </div>
            <span className="text-xs font-heading font-bold uppercase text-[#888888] hidden sm:inline-block">
              Orden 01 - {String(implementosList.length).padStart(2, '0')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {implementosList.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#e5e5e5] rounded-[2px] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#FE8003] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Contenedor de Imagen 4:3 con ampliación al clic */}
                  <div 
                    onClick={() => setActiveImageModal(item)}
                    className="relative aspect-4/3 bg-[#f5f5f5] overflow-hidden cursor-pointer"
                    title="Clic para ampliar imagen"
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge Número Orden */}
                    <div className="absolute top-2.5 left-2.5 bg-[#1f1f1f] text-white px-2.5 py-1 text-xs font-heading font-black rounded-[2px] shadow-md border-l-2 border-[#FE8003] flex items-center gap-1">
                      <span className="text-[#FE8003]">#</span>
                      <span>{item.number}</span>
                    </div>

                    {/* Botón flotante para ampliar imagen */}
                    <button
                      type="button"
                      aria-label="Ampliar imagen"
                      className="absolute bottom-2.5 right-2.5 bg-black/60 hover:bg-[#FE8003] text-white p-1.5 rounded-[2px] opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Título limpio sin textos inventados */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-heading font-extrabold text-[#222222] text-base group-hover:text-[#FE8003] transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Botón directo de Cotización por WhatsApp */}
                <div className="p-4 pt-0">
                  <a
                    href={`https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
                      `Hola RST, me interesa cotizar el implemento: ${item.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 bg-[#f3f4f6] hover:bg-[#FE8003] text-[#222222] hover:text-white font-heading font-bold uppercase text-xs flex items-center justify-center gap-2 rounded-[2px] transition-all duration-200 group/btn"
                  >
                    <MessageCircle className="w-4 h-4 text-[#FE8003] group-hover/btn:text-white transition-colors" />
                    <span>Cotizar por WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Banner de Contacto y Asesoría Directa */}
        <div className="bg-white p-6 sm:p-8 border border-[#e5e5e5] rounded-[2px] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="antek-dashes">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <h3 className="font-heading font-black text-xl sm:text-2xl uppercase text-[#222222] tracking-wide">
              ¿Deseas consultar por disponibilidad o compatibilidad?
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] max-w-2xl leading-relaxed">
              Comunícate directamente con nosotros para consultar stock y verificar compatibilidad con tu modelo de mini excavadora.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`tel:${companyData.phoneRaw}`}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#222222] font-heading font-bold text-xs uppercase tracking-wider rounded-[2px] border border-[#dddddd] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#FE8003]" />
              <span>{companyData.phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
                'Hola RST, quisiera consultar por los implementos para mini excavadora.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-antek btn-antek-primary text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal Lightbox para Ampliar Imagen */}
      {activeImageModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveImageModal(null)}
        >
          <div 
            className="bg-[#181818] border border-[#333333] rounded-[2px] max-w-4xl w-full overflow-hidden shadow-2xl relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[#2d2d2d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-[#FE8003] text-white text-xs font-heading font-black px-2 py-0.5 rounded-[2px]">
                  #{activeImageModal.number}
                </span>
                <h3 className="font-heading font-bold text-base sm:text-lg uppercase text-white truncate">
                  {activeImageModal.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveImageModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FE8003] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="bg-black/40 p-2 sm:p-4 flex items-center justify-center max-h-[70vh]">
              <img
                src={activeImageModal.image}
                alt={activeImageModal.alt}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-[2px]"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 border-t border-[#2d2d2d] flex items-center justify-end bg-[#141414]">
              <a
                href={`https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
                  `Hola RST, me interesa cotizar el implemento N° ${activeImageModal.number}: ${activeImageModal.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-antek btn-antek-primary text-xs py-2.5 px-5 shrink-0 w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Cotizar este Implemento</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
