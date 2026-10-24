import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HomeClientsSection() {
  return (
    <section id="portafolio" className="py-16 sm:py-24 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Columna Izquierda: Contenido y Llamado a la Acción */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
                Entregas en Terreno
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-black uppercase text-[#222222] leading-[1.1] tracking-tight">
                CLIENTES QUE CONFIARON EN NOSOTROS
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Cientos de clientes en todo Chile —desde agricultores y contratistas hasta familias que inician su proyecto de parcelación— han confiado en <strong>RST Maquinarias</strong>. Entregamos cada equipo directamente en la puerta de su predio en camión rampa, con prueba operativa en terreno, inducción técnica completa y garantía oficial.
            </p>

            {/* Puntos destacados limpios sin iconos artificiales */}
            <ul className="space-y-3 pt-1">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FE8003] mt-2 shrink-0"></span>
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 block font-heading font-bold uppercase text-xs">
                    Entrega Directa en Predio o Faena
                  </strong>
                  Llegamos donde otros fletes no llegan: caminos de tierra, parcelaciones y zonas rurales.
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FE8003] mt-2 shrink-0"></span>
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 block font-heading font-bold uppercase text-xs">
                    Puesta en Marcha e Inducción Incluida
                  </strong>
                  Te enseñamos a operar la máquina, revisar niveles y realizar mantenciones básicas.
                </div>
              </li>
            </ul>

            {/* Botón de Llamado a la Acción */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/entregas-exitosas"
                className="btn-antek btn-antek-primary shadow-lg shadow-orange-500/20 group inline-flex items-center justify-center gap-3 text-xs sm:text-sm font-heading font-black uppercase tracking-wider"
              >
                <span>VER ENTREGAS EXITOSAS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform stroke-[2.5]" />
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Imagen Portada Clientes Limpia en Alta Calidad */}
          <div className="lg:col-span-6 relative">
            <div className="relative border-4 border-[#1f1f1f] shadow-2xl overflow-hidden rounded-[2px] group bg-slate-100">
              <picture>
                <source srcSet="/images/portada-clientes-home.webp" type="image/webp" />
                <img
                  src="/images/portada-clientes-home.png"
                  alt="Clientes RST Maquinarias Chile"
                  className="w-full h-[380px] sm:h-[460px] lg:h-[500px] object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
