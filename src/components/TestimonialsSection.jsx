import React from 'react';
import { Star, MapPin, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rodrigo Almonacid",
      company: "Parcelaciones Lago Llanquihue",
      city: "Llanquihue, Región de Los Lagos",
      model: "Rippa R10 Eco (1.0 Ton)",
      text: "Compramos la Rippa R10 Eco para abrir zanjas de agua, canalizaciones y caminos internos en nuestras parcelas. El consumo de combustible es mínimo y su fuerza es sorprendente. El servicio técnico de RST en la zona respondió al día siguiente.",
      rating: 5,
      date: "Hace 2 meses"
    },
    {
      name: "Claudio Valenzuela P.",
      company: "Constructora del Sur SpA",
      city: "Puerto Varas, Chile",
      model: "Rippa R15 Kubota (1.5 Ton)",
      text: "El motor Kubota diésel y el chasis extensible hacen toda la diferencia. Pudimos entrar por un pasillo lateral estrecho de 1 metro y luego ensanchar las orugas para excavar a máxima estabilidad.",
      rating: 5,
      date: "Hace 3 semanas"
    },
    {
      name: "Hernán Mansilla",
      company: "Faenas Agrícolas Chiloé",
      city: "Ancud / Castro, Chiloé",
      model: "SANY SY35U Climatizada (3.8 Ton)",
      text: "En Chiloé llueve 8 meses al año. Tener la cabina cerrada con calefacción nos permite trabajar jornadas completas sin parar. La máquina llegó impecable en camión rampa directo a nuestro predio.",
      rating: 5,
      date: "Hace 1 mes"
    }
  ];

  return (
    <section id="portafolio" className="py-16 sm:py-20 bg-slate-100 border-y border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-orange-600 font-extrabold uppercase text-xs tracking-widest">
            Faenas Reales en Chile
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Respaldados por Operadores y Contratistas
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Mini excavadoras probadas en las condiciones más duras del terreno chileno: greda, ripio y lluvia constante.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-slate-400 text-xs ml-2 font-mono">{t.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                <div className="text-xs text-orange-600 font-medium">{t.company}</div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t.city}</span>
                </div>
                <div className="inline-block mt-2 px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-700">
                  Equipo: {t.model}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
