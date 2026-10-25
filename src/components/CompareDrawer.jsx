import React from 'react';
import { useCompare } from '../context/CompareContext';
import { excavators, companyData } from '../data/excavators';
import { X, ArrowRight, Scale, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CompareDrawer() {
  const { selectedIds, removeCompare, clearCompare, isDrawerOpen, setIsDrawerOpen } = useCompare();

  if (selectedIds.length === 0) return null;

  const comparedMachines = excavators.filter(e => selectedIds.includes(e.id));

  return (
    <>
      {/* Floating Bottom Bar */}
      <aside aria-label="Comparador de equipos" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-[#161616] border-2 border-[#FE8003] text-white rounded-[2px] shadow-2xl px-5 py-3 flex items-center gap-4 max-w-xl w-[92%] transition-all">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FE8003] text-white flex items-center justify-center font-bold">
            <Scale className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-wider">
              Comparador ({selectedIds.length}/3)
            </div>
            <div className="text-[11px] text-[#cccccc] hidden sm:block">
              {comparedMachines.map(m => m.name.split(' ')[0]).join(', ')}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="btn-antek btn-antek-primary py-2 px-3 text-xs"
          >
            <span>Ver Tabla</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={clearCompare}
            title="Limpiar comparador"
            className="p-2 bg-[#2a2a2a] hover:bg-[#333333] text-white rounded-[2px]"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Modal Comparison Table */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#111111]/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#FE8003] rounded-[2px] max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left">
            {/* Header */}
            <div className="p-6 bg-[#1f1f1f] border-b border-[#333333] flex items-center justify-between text-white">
              <div>
                <div className="antek-dashes mb-1">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#FE8003]">
                  Análisis Técnico Comparativo
                </span>
                <h2 className="text-xl font-heading font-black uppercase text-white mt-0.5">
                  Comparador de Mini Excavadoras RST
                </h2>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 bg-[#333333] hover:bg-[#FE8003] text-white flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Table */}
            <div className="overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="font-heading font-bold uppercase tracking-wider text-[#888888] py-2">
                  Modelo
                </div>
                {comparedMachines.map(m => (
                  <div key={m.id} className="text-center bg-[#f8f8f8] p-3 border border-[#dddddd] relative">
                    <button
                      onClick={() => removeCompare(m.id)}
                      className="absolute top-2 right-2 text-[#999999] hover:text-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <img 
                      src={m.image} 
                      alt={m.name} 
                      className="w-full h-20 object-contain object-center bg-white rounded-[2px] mb-2 p-1"
                    />
                    <div className="font-heading font-bold text-[#222222] text-sm uppercase">{m.name}</div>
                    <div className="text-[#FE8003] font-mono font-bold mt-1">{m.weightTon}</div>
                    <Link
                      to={`/producto/${m.id}`}
                      onClick={() => setIsDrawerOpen(false)}
                      className="mt-2 block w-full py-1 bg-[#222222] hover:bg-[#FE8003] text-white text-[11px] font-heading font-bold uppercase"
                    >
                      Ver Ficha
                    </Link>
                  </div>
                ))}
              </div>

              {/* Specs Rows */}
              <div className="divide-y divide-[#eeeeee] text-xs">
                <div className="grid grid-cols-4 py-2.5 items-center">
                  <span className="font-heading font-bold uppercase text-[#777777]">Peso Operativo</span>
                  {comparedMachines.map(m => (
                    <span key={m.id} className="text-center font-bold text-[#222222] font-mono">{m.weightKg} kg</span>
                  ))}
                </div>

                <div className="grid grid-cols-4 py-2.5 items-center">
                  <span className="font-heading font-bold uppercase text-[#777777]">Motor Diésel</span>
                  {comparedMachines.map(m => (
                    <span key={m.id} className="text-center text-[#222222]">{m.engine.brand} ({m.engine.powerHp})</span>
                  ))}
                </div>

                <div className="grid grid-cols-4 py-2.5 items-center">
                  <span className="font-heading font-bold uppercase text-[#777777]">Profundidad Máx.</span>
                  {comparedMachines.map(m => (
                    <span key={m.id} className="text-center font-bold text-[#FE8003] font-mono">{m.performance.maxDiggingDepthMm} mm</span>
                  ))}
                </div>

                <div className="grid grid-cols-4 py-2.5 items-center">
                  <span className="font-heading font-bold uppercase text-[#777777]">Caudal Hidráulico</span>
                  {comparedMachines.map(m => (
                    <span key={m.id} className="text-center text-[#222222] font-mono">{m.hydraulic.flowRateLpm}</span>
                  ))}
                </div>

                <div className="grid grid-cols-4 py-2.5 items-center">
                  <span className="font-heading font-bold uppercase text-[#777777]">Cabina</span>
                  {comparedMachines.map(m => (
                    <span key={m.id} className="text-center text-[#555555] text-[11px]">{m.cabinType}</span>
                  ))}
                </div>

                <div className="grid grid-cols-4 py-2.5 items-center">
                  <span className="font-heading font-bold uppercase text-[#777777]">Precio Ref. Neto</span>
                  {comparedMachines.map(m => (
                    <span key={m.id} className="text-center font-bold text-[#FE8003] font-mono">{m.pricePromo || m.priceRef}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-[#f4f4f4] border-t border-[#dddddd] flex justify-between items-center text-xs">
              <span className="text-[#666666]">¿Dudas con la máquina idónea para tu terreno?</span>
              <a
                href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20estoy%20comparando%20estos%20modelos:%20${comparedMachines.map(m => m.name).join(', ')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-antek btn-antek-primary py-2 px-4 text-xs"
              >
                <span>Asesoría por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
