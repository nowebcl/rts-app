import React from 'react';
import { implementosList } from '../data/implementos';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { companyData } from '../data/excavators';

export default function AttachmentsGrid({ limit = 6, showHeader = true }) {
  const items = limit ? implementosList.slice(0, limit) : implementosList;

  return (
    <div className="space-y-8">
      {showHeader && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[#FE8003] font-heading font-extrabold uppercase text-xs tracking-widest">
              Línea de Accesorios
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#222222] uppercase tracking-wide mt-1">
              Implementos para Mini Excavadoras
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-1">
              Accesorios disponibles para entrega y cotización directa.
            </p>
          </div>
          <Link
            to="/implementos"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-[#FE8003] hover:text-[#e57302] uppercase tracking-wider shrink-0"
          >
            <span>Ver Catálogo de Implementos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[2px] border border-[#e5e5e5] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#FE8003] transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="aspect-4/3 bg-[#f5f5f5] overflow-hidden relative flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1f1f1f] text-white text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] border-l-2 border-[#FE8003]">
                  #{item.number}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-heading font-extrabold text-[#222222] text-base group-hover:text-[#FE8003] transition-colors leading-snug">
                  {item.name}
                </h3>
              </div>
            </div>

            <div className="p-4 pt-0">
              <a
                href={`https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
                  `Hola RST, quiero cotizar el implemento: ${item.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-[2px] bg-[#f3f4f6] hover:bg-[#FE8003] text-[#222222] hover:text-white font-heading font-bold uppercase text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Cotizar este Implemento</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
