import React, { useState } from 'react';
import { Ruler, Maximize2, Check } from 'lucide-react';

export default function TechnicalBlueprint({ excavator }) {
  const [activeCallout, setActiveCallout] = useState(null);

  const { dimensions, performance, name } = excavator;

  const specs = [
    { key: "G", label: "Profundidad máx. de excavación", value: `${performance.maxDiggingDepthMm} mm`, sub: "Nivel de suelo a fondo de pozo" },
    { key: "H", label: "Radio máx. de excavación", value: `${performance.maxDiggingReachMm} mm`, sub: "Alcance horizontal a nivel de suelo" },
    { key: "E", label: "Altura máx. de excavación", value: `${performance.maxDiggingHeightMm} mm`, sub: "Alcance vertical máximo con balde extendido" },
    { key: "F", label: "Altura máx. de descarga", value: `${performance.maxDumpingHeightMm} mm`, sub: "Vaciado sobre camión o tolva" },
    { key: "A", label: "Altura total de transporte", value: `${dimensions.transportHeightMm} mm`, sub: "Altura total de cabina/canopy" },
    { key: "C", label: "Ancho total del tren de orugas", value: `${dimensions.transportWidthMm} mm`, sub: "Paso de trocha frontal" },
    { key: "D", label: "Longitud de orugas en suelo", value: `${dimensions.trackLengthMm} mm`, sub: "Base de sustentación longitudinal" },
    { key: "B", label: "Radio de giro posterior (Cola)", value: `${performance.minTailSwingRadiusMm} mm`, sub: "Radio libre de giro en 360°" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 text-white shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-widest">
            <Ruler className="w-4 h-4" />
            <span>Esquema Dimensional Técnico & Geometría de Trabajo</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Plano de Cotas y Rango de Operación — {name}
          </h3>
        </div>
        <div className="text-xs bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Valores certificados bajo norma ISO 6015</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
        {/* SVG Engineering Blueprint Schematic */}
        <div className="lg:col-span-7 bg-slate-950/70 rounded-xl p-4 border border-slate-800/90 relative overflow-hidden flex items-center justify-center min-h-[340px]">
          {/* Blueprint grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b22_1px,transparent_1px),linear-gradient(to_bottom,#1e293b22_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          <svg viewBox="0 0 700 450" className="w-full h-auto max-h-[380px] drop-shadow-md select-none">
            {/* Ground line */}
            <line x1="40" y1="300" x2="660" y2="300" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />
            <text x="60" y="290" fill="#94a3b8" fontSize="11" fontFamily="monospace">NIVEL DE SUELO (0.00 m)</text>

            {/* Excavator tracks / undercarriage */}
            <rect x="220" y="270" width="180" height="35" rx="6" fill="#1e293b" stroke="#FE8003" strokeWidth="2" />
            <circle cx="235" cy="287" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            <circle cx="385" cy="287" r="12" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            <circle cx="285" cy="287" r="8" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
            <circle cx="335" cy="287" r="8" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />

            {/* Dozer blade */}
            <path d="M410 275 L435 285 L430 305 L405 295 Z" fill="#FE8003" stroke="#f97316" strokeWidth="1.5" />

            {/* Cabin / upper structure */}
            <path d="M210 270 L210 210 L250 170 L340 170 L350 270 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <rect x="255" y="180" width="70" height="55" rx="3" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" />

            {/* Boom (Pluma) */}
            <path d="M340 240 L450 120" stroke="#FE8003" strokeWidth="10" strokeLinecap="round" />
            {/* Arm (Balancín) */}
            <path d="M450 120 L530 210" stroke="#FE8003" strokeWidth="8" strokeLinecap="round" />
            {/* Bucket (Balde) */}
            <path d="M530 210 L560 250 L530 260 Z" fill="#0f172a" stroke="#FE8003" strokeWidth="3" />

            {/* Max dig depth trajectory (G) */}
            <path d="M530 210 Q 560 370 510 400" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            {/* Max height trajectory (E) */}
            <path d="M450 120 Q 520 60 560 70" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" fill="none" />

            {/* Dimension Callout lines & badges */}
            {/* A: Transport height */}
            <g className="cursor-pointer" onClick={() => setActiveCallout("A")}>
              <line x1="180" y1="170" x2="180" y2="300" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="170" y1="170" x2="190" y2="170" stroke="#38bdf8" strokeWidth="1.5" />
              <line x1="170" y1="300" x2="190" y2="300" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="180" cy="235" r="14" fill="#0284c7" />
              <text x="180" y="240" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">A</text>
            </g>

            {/* G: Max digging depth */}
            <g className="cursor-pointer" onClick={() => setActiveCallout("G")}>
              <line x1="570" y1="300" x2="570" y2="400" stroke="#ef4444" strokeWidth="1.5" />
              <line x1="560" y1="300" x2="580" y2="300" stroke="#ef4444" strokeWidth="1.5" />
              <line x1="560" y1="400" x2="580" y2="400" stroke="#ef4444" strokeWidth="1.5" />
              <circle cx="570" cy="350" r="14" fill="#ef4444" />
              <text x="570" y="355" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">G</text>
            </g>

            {/* E: Max digging height */}
            <g className="cursor-pointer" onClick={() => setActiveCallout("E")}>
              <line x1="600" y1="70" x2="600" y2="300" stroke="#10b981" strokeWidth="1.5" />
              <line x1="590" y1="70" x2="610" y2="70" stroke="#10b981" strokeWidth="1.5" />
              <line x1="590" y1="300" x2="610" y2="300" stroke="#10b981" strokeWidth="1.5" />
              <circle cx="600" cy="185" r="14" fill="#10b981" />
              <text x="600" y="190" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">E</text>
            </g>

            {/* H: Max reach */}
            <g className="cursor-pointer" onClick={() => setActiveCallout("H")}>
              <line x1="310" y1="320" x2="620" y2="320" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="310" y1="310" x2="310" y2="330" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="620" y1="310" x2="620" y2="330" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="465" cy="320" r="14" fill="#f59e0b" />
              <text x="465" y="325" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
            </g>

            {/* B: Tail swing */}
            <g className="cursor-pointer" onClick={() => setActiveCallout("B")}>
              <line x1="210" y1="250" x2="310" y2="250" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="210" cy="250" r="12" fill="#a855f7" />
              <text x="210" y="254" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">B</text>
            </g>
          </svg>

          <div className="absolute bottom-2 right-3 text-[10px] text-slate-500 font-mono">
            *Diagrama esquemático referencial de trabajo
          </div>
        </div>

        {/* Coded Specs Table */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs text-slate-400 font-medium pb-1 flex justify-between items-center">
            <span>Cotas Clave de Operación</span>
            <span className="text-[11px] text-orange-400">Milímetros (mm)</span>
          </div>

          <div className="space-y-2">
            {specs.map((item) => {
              const isActive = activeCallout === item.key;
              return (
                <div 
                  key={item.key}
                  onMouseEnter={() => setActiveCallout(item.key)}
                  onMouseLeave={() => setActiveCallout(null)}
                  className={`p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isActive 
                      ? 'bg-orange-500/15 border-orange-500/50 shadow-md translate-x-1' 
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                      item.key === 'G' ? 'bg-red-500 text-white' :
                      item.key === 'E' ? 'bg-emerald-500 text-white' :
                      item.key === 'H' ? 'bg-amber-500 text-white' :
                      item.key === 'A' ? 'bg-sky-500 text-white' :
                      item.key === 'B' ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-200'
                    }`}>
                      {item.key}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-200">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {item.sub}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-mono font-bold text-orange-400 shrink-0 ml-2">
                    {item.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
