import React from 'react';
import { attachmentList } from '../data/excavators';
import { Wrench, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AttachmentsGrid({ limit = 6, showHeader = true }) {
  const items = limit ? attachmentList.slice(0, limit) : attachmentList;

  return (
    <div className="space-y-8">
      {showHeader && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-orange-600 font-extrabold uppercase text-xs tracking-widest">
              Línea de Implementos & Aditamentos
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Maximiza la Versatilidad de tu Mini Excavadora
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Equipamiento auxiliar con compatibilidad garantizada para toda nuestra flota.
            </p>
          </div>
          <Link
            to="/aditamentos"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 shrink-0"
          >
            <span>Ver Catálogo de Aditamentos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="h-44 bg-slate-100 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {item.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Compatibilidad:</span>
                    <span className="font-semibold text-slate-800">{item.compatibleModels}</span>
                  </div>
                  {item.flowRequired && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Caudal Requerido:</span>
                      <span className="font-mono text-slate-800 font-bold">{item.flowRequired}</span>
                    </div>
                  )}
                  {item.workingPressure && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Presión de Trabajo:</span>
                      <span className="font-mono text-slate-800">{item.workingPressure}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <a
                href={`https://wa.me/56978924512?text=Hola%20RST,%20quiero%20cotizar%20el%20implemento:%20${item.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-orange-600 hover:text-white text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
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
