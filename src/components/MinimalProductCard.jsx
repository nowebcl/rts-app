import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageCircle, MapPin, FileDown, Gift, ShieldCheck } from 'lucide-react';

export default function MinimalProductCard({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ficha/${product.id}`);
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const phone = '56985168608';
    const text = encodeURIComponent(
      `Hola RST Maquinarias, me interesa consultar información y disponibilidad del equipo: "${product.name}".`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const isSold = product.isSold;
  const displayPrice = isSold
    ? (product.price && product.price !== 'VENDIDA' ? `${product.price} (Vendida)` : 'VENDIDA')
    : (product.price || 'Consultar valor');

  return (
    <article
      onClick={handleCardClick}
      className={`group bg-white border rounded-lg transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer relative shadow-sm hover:shadow-xl ${
        isSold ? 'border-slate-200 opacity-90' : 'border-slate-200 hover:border-[#FE8003]'
      }`}
    >
      {/* 1. Contenedor de Imagen con Filtro y Lienzo Cruzado de VENDIDA */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-white shrink-0">
        <picture>
          {product.image && product.image.endsWith('.webp') && (
            <source srcSet={product.image} type="image/webp" />
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
              isSold ? 'grayscale contrast-90 brightness-75' : ''
            }`}
            loading="lazy"
          />
        </picture>

        {/* LIENZO CRUZANDO LA IMAGEN CUANDO ESTÁ VENDIDA */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
            <div className="bg-red-600/95 text-white font-heading font-black tracking-widest text-xs sm:text-sm uppercase py-1.5 px-16 -rotate-12 shadow-2xl border-y-2 border-white/40 drop-shadow-lg">
              VENDIDA
            </div>
          </div>
        )}

        {/* Badge superior de Categoría / Marca */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="bg-slate-900/90 text-white text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm backdrop-blur-xs">
            {product.categoryName || 'Mini Excavadora'}
          </span>
        </div>

        {/* Badge de Estado: Solo si está Vendida */}
        {isSold && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
              Entregada
            </span>
          </div>
        )}
      </div>

      {/* 2. Cuerpo de Información */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white text-left">
        <div className="flex-1 flex flex-col">
          {/* Título Oficial de la máquina (Nombre de la Carpeta) - Altura fija para alineación perfecta */}
          <h3 className={`font-heading font-bold text-base sm:text-lg leading-snug line-clamp-2 h-12 sm:h-14 flex items-start transition-colors ${
            isSold ? 'text-slate-600' : 'text-slate-900 group-hover:text-[#FE8003]'
          }`}>
            {product.name}
          </h3>

          {/* Ubicación y Despacho */}
          <div className="flex items-center gap-1 text-slate-500 text-xs mt-1.5 h-5 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#FE8003] shrink-0" />
            <span className="truncate">{product.location || 'Entrega en terreno a todo Chile'}</span>
          </div>

          {/* Especificaciones / Descripción resumida - Altura uniforme para 2 líneas */}
          <p className="text-slate-600 text-xs mt-2.5 line-clamp-2 leading-relaxed whitespace-pre-line h-10 overflow-hidden shrink-0">
            {product.description || 'Consultar especificaciones oficiales'}
          </p>

          {/* Badges de Beneficios Oficiales Obligatorios (TODAS DEBEN LLEVAR ESTO) - Altura fija uniforme */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5 min-h-[56px] content-start shrink-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-orange-50 text-orange-700 text-[10px] font-bold">
              <Gift className="w-3 h-3 text-[#FE8003]" />
              Regalo: Acople + Dedo + Mantención
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              1 Año Garantía
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
              Euro 5 · CE
            </span>
          </div>
        </div>

        {/* 3. Bloque Inferior: Descarga Ficha PDF, Precio y WhatsApp - Siempre alineado al fondo */}
        <div className="pt-3.5 mt-auto border-t border-slate-100 flex items-center justify-between gap-2 shrink-0">
          
          {/* Botón Descargar Ficha PDF */}
          {product.pdfUrl ? (
            <a
              href={product.pdfUrl}
              download
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FE8003]/10 hover:bg-[#FE8003] text-[#FE8003] hover:text-white rounded text-[11px] font-heading font-black uppercase tracking-wider transition-colors cursor-pointer"
              title={`Descargar Ficha Técnica PDF de ${product.name}`}
            >
              <FileDown className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Descargar Ficha</span>
            </a>
          ) : (
            <span className="text-xs font-bold text-slate-700">
              {displayPrice}
            </span>
          )}

          {/* Botones de acción */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleWhatsApp}
              title="Consultar por WhatsApp"
              className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <span className="p-2 bg-slate-100 text-slate-700 group-hover:bg-[#FE8003] group-hover:text-white rounded transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
