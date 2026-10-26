import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight,
  Compass
} from 'lucide-react';
import { companyData } from '../data/excavators';

export default function SeoFaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const pillars = [
    {
      title: "Mini excavadoras en Región de Los Lagos",
      badge: "Cobertura Regional",
      icon: Compass,
      desc: "Atención comercial prioritaria en Puerto Montt, Llanquihue, Puerto Varas, Osorno, Frutillar y Chiloé con pruebas en terreno y entrega directa en parcela."
    },
    {
      title: "Mini excavadoras en Chile",
      badge: "Todo Chile",
      icon: Truck,
      desc: "Despachamos mini excavadoras compactas de 0.6 a 7.5 toneladas con camión rampa asegurado a Santiago, Concepción, Temuco y de Arica a Punta Arenas."
    },
    {
      title: "Mini excavadoras en Llanquihue",
      badge: "Bodega y Exhibición",
      icon: MapPin,
      desc: "Patio de maquinaria y bodega física en Parcela 11, Ruta V-500 en Llanquihue, facilitando revisión de equipos y entrega inmediata."
    },
    {
      title: "Mini excavadoras en Puerto Montt",
      badge: "Base Zona Sur",
      icon: MapPin,
      desc: "Servicio técnico express, venta y suministro de repuestos e implementos para faenas agrícolas, forestales y de construcción en Puerto Montt y alrededores."
    },
    {
      title: "Mini excavadoras SANY",
      badge: "Alta Gama",
      icon: ShieldCheck,
      desc: "Modelos oficiales de mini excavadoras SANY: SANY SY35U (3.86 Ton), SY60C (6 Ton) y SY75C (7.28 Ton) con motores diésel de alta eficiencia y cabina full."
    },
    {
      title: "Dónde comprar mini excavadoras",
      badge: "Compra Segura",
      icon: CheckCircle2,
      desc: "En RST Importaciones compras directo con stock físico real, factura inmediata, inducción de manejo en terreno y garantía de 1 año o 1.000 horas."
    }
  ];

  const faqs = [
    {
      q: "¿Dónde comprar mini excavadoras en Región de Los Lagos y todo Chile?",
      a: "Puedes comprar mini excavadoras nuevas y semi nuevas en RST Importaciones. Contamos con base física en Llanquihue y Puerto Montt para la Región de Los Lagos, además de despacho asegurado en camión rampa con inducción en terreno a cualquier comuna de Chile."
    },
    {
      q: "¿Tienen venta y entrega de mini excavadoras en Llanquihue y Puerto Montt?",
      a: "Sí, nuestra bodega y patio de pruebas se ubica en Parcela 11, Ruta V-500 en Llanquihue. Puedes agendar una visita técnica para probar los equipos en vivo o solicitar despacho directo a tu parcela u obra en Llanquihue, Puerto Montt, Puerto Varas, Osorno o Chiloé."
    },
    {
      q: "¿Qué modelos de mini excavadoras SANY están disponibles?",
      a: "Ofrecemos la línea de mini excavadoras SANY que incluye la SANY SY35U (3.86 Ton, giro de cola cero y motor Yanmar), SANY SY60C (6 Ton con cabina climatizada) y SANY SY75C (7.28 Ton para alta exigencia), ideales para construcción, parcelaciones, zanjeo y faenas agrícolas."
    },
    {
      q: "¿Se pueden encargar o importar mini excavadoras a pedido por encargo?",
      a: "Sí, podemos importar por encargo con una reserva del 50%. Incluye asesoría técnica y comercial personalizada durante todo el proceso y prueba en terreno de la máquina a importar antes de la entrega final, todo con el respaldo oficial y garantía de RST."
    },
    {
      q: "¿Qué garantía y servicio postventa ofrecen en Región de Los Lagos y Chile?",
      a: "Todos nuestros equipos nuevos cuentan con garantía de 1 año o 1.000 horas de operación, con stock permanente de repuestos originales, filtros y servicio técnico directo en terreno."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado Principal con Región de Los Lagos y Todo Chile */}
        <div className="text-left space-y-3 mb-12">
          <div className="antek-dashes">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            <span>Guía de Compra · Región de Los Lagos y Todo Chile</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black uppercase text-[#222222] tracking-wide leading-tight">
            Mini Excavadoras en Región de Los Lagos y Todo Chile
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            RST Importaciones: venta de <strong>mini excavadoras en Región de Los Lagos</strong> (Llanquihue, Puerto Montt, Osorno, Chiloé) y despacho a <strong>todo Chile</strong>. Modelos oficiales <strong>SANY</strong> y <strong>RIPPA</strong> con entrega inmediata y garantía.
          </p>
        </div>

        {/* Grid de Pilares SEO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
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
                  <span>Consultar disponibilidad</span>
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

          {/* CTA Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="text-xs text-slate-600">
              ¿Quieres visitar nuestra bodega en Llanquihue o coordinar entrega en tu región?
            </div>
            <div className="flex gap-3">
              <Link to="/catalogo" className="btn-antek btn-antek-dark text-xs py-2 px-4">
                <span>Explorar Catálogo</span>
              </Link>
              <a 
                href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20cotizar%20una%20mini%20excavadora%20en%20Región%20de%20Los%20Lagos.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-antek btn-antek-primary text-xs py-2 px-4"
              >
                <span>Cotizar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
