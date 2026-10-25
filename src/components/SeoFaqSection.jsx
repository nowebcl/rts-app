import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { companyData } from '../data/excavators';

export default function SeoFaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const pillars = [
    {
      title: "Mini excavadoras en Chile",
      badge: "Cobertura Nacional",
      icon: Truck,
      desc: "Despachamos mini excavadoras compactas de 0.8 a 7.5 toneladas a todo Chile: Santiago, Concepción, Temuco, Puerto Montt, Chiloé y de Arica a Punta Arenas, con inducción técnica y entrega garantizada."
    },
    {
      title: "Mini excavadoras SANNY",
      badge: "Línea de Alta Gama",
      icon: ShieldCheck,
      desc: "Disponemos de modelos oficiales de mini excavadoras SANNY como la SANY SY35U, SY60C y SY75C, equipadas con motores diésel de alta eficiencia, cabina ergonómica y sistemas hidráulicos de precisión."
    },
    {
      title: "Dónde comprar mini excavadoras",
      badge: "Compra Segura y Confiable",
      icon: CheckCircle2,
      desc: "En RST Importaciones compras directo con stock físico real, factura y documentación lista para faena, garantía oficial de 1 año o 1.000 hrs y respaldo técnico postventa permanente."
    },
    {
      title: "Mini excavadoras en Puerto Montt",
      badge: "Base Región de Los Lagos",
      icon: MapPin,
      desc: "Nuestra base operativa central está en Llanquihue y Puerto Montt (Ruta V-500), brindando atención personalizada, pruebas de equipos en terreno y asistencia técnica inmediata en la zona sur."
    }
  ];

  const faqs = [
    {
      q: "¿Dónde comprar mini excavadoras en Chile con garantía y entrega inmediata?",
      a: "Puedes comprar mini excavadoras nuevas y semi nuevas en RST Importaciones. Contamos con stock disponible para entrega inmediata, despacho seguro en camión rampa a cualquier punto de Chile, inducción de manejo en la entrega y garantía de 1 año o 1.000 horas de operación."
    },
    {
      q: "¿Qué modelos de mini excavadoras SANNY están disponibles?",
      a: "Ofrecemos la línea de mini excavadoras SANNY que incluye la SANY SY35U (3.86 Ton, giro de cola cero y motor Yanmar), SANY SY60C (6 Ton con cabina climatizada) y SANY SY75C (7.28 Ton para alta exigencia), ideales para construcción, parcelaciones, zanjeo y faenas agrícolas."
    },
    {
      q: "¿Cómo comprar mini excavadoras en Puerto Montt y la Región de Los Lagos?",
      a: "RST Importaciones cuenta con exhibición y bodega física en Llanquihue y Puerto Montt (Parcela 11, Ruta V-500). Puedes agendar una visita técnica para ver y probar los equipos en vivo, o solicitar entrega a domicilio en toda la Región de Los Lagos, Osorno, Valdivia y Chiloé."
    },
    {
      q: "¿Con qué motores vienen equipadas las mini excavadoras?",
      a: "Trabajamos con motores diésel originales de renombre mundial como Kubota (Z482, D722, D902, V1505, V2607), Yanmar (3TNV70, 3TNV88) e Isuzu (4JG1), asegurando mínimo consumo de combustible, repuestos estándar universales y alta durabilidad en faenas exigentes."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal */}
        <div className="text-left space-y-3 mb-12">
          <div className="antek-dashes">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            <span>Guía de Compra · Posicionamiento y Respaldo Oficial</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black uppercase text-[#222222] tracking-wide leading-tight">
            ¿Dónde Comprar Mini Excavadoras en Chile y Puerto Montt?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            RST Importaciones es tu aliado estratégico en maquinaria compacta: venta de <strong>mini excavadoras en Chile</strong>, modelos <strong>SANNY</strong> y <strong>RIPPA</strong>, servicio técnico certificado y entrega directa en <strong>Puerto Montt</strong> y todo el territorio nacional.
          </p>
        </div>

        {/* Grid de 4 Pilares SEO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200 p-6 rounded-[2px] shadow-xs hover:border-[#FE8003] hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-[2px] bg-slate-900 text-[#FE8003] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded-[2px]">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-heading font-black text-base uppercase text-[#222222] mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-heading font-bold text-[#FE8003] uppercase">
                  <span>Ver disponibilidad</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Sección de Preguntas Frecuentes (FAQ Accordion) */}
        <div className="bg-white border border-slate-200 rounded-[2px] p-6 sm:p-10 shadow-sm">
          <div className="text-left mb-8">
            <h3 className="text-xl sm:text-2xl font-heading font-black uppercase text-[#222222] tracking-wide">
              Preguntas Frecuentes sobre Venta de Mini Excavadoras
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Respuestas claras para tomar la mejor decisión de inversión en maquinaria pesada y compacta.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`border transition-colors duration-200 rounded-[2px] ${
                    isOpen ? 'border-[#FE8003] bg-orange-50/20' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-heading font-bold text-sm sm:text-base text-[#222222] uppercase tracking-wide">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-[#FE8003] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed text-left border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Footer dentro del FAQ */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="text-xs text-slate-600">
              ¿Tienes una consulta específica sobre modelos SANNY, RIPPA o implementos?
            </div>
            <div className="flex gap-3">
              <Link to="/catalogo" className="btn-antek btn-antek-dark text-xs py-2 px-4">
                <span>Explorar Catálogo</span>
              </Link>
              <a 
                href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20cotizar%20una%20mini%20excavadora%20en%20Chile.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-antek btn-antek-primary text-xs py-2 px-4"
              >
                <span>Cotizar Inmediato</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
