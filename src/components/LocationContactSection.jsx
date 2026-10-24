import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  Truck, 
  Navigation
} from 'lucide-react';
import { companyData } from '../data/excavators';
import { products } from '../data/products';

export default function LocationContactSection() {
  const availableProducts = products.filter(p => !p.isSold);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    model: availableProducts[0]?.name || 'Modelo Rippa R06',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const text = encodeURIComponent(
      `*COTIZACIÓN / CONSULTA WEB RST*\n\n` +
      `*Nombre:* ${formData.name || 'Cliente'}\n` +
      `*Teléfono:* ${formData.phone || 'No especificado'}\n` +
      `*Ciudad / Región:* ${formData.city || 'No especificada'}\n` +
      `*Modelo de Interés:* ${formData.model}\n` +
      (formData.message ? `*Mensaje:* ${formData.message}\n` : '') +
      `\n_Consulta originada desde sitio web oficial RST._`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${companyData.whatsappNumber}?text=${text}`, '_blank');
    }, 600);
  };

  return (
    <section id="contacto" className="py-20 bg-[#f9f9f9] border-t border-[#e5e5e5] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="antek-dashes mb-2">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest block">
            Casa Matriz & Atención Comercial
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase text-[#222222] mt-1">
            Ubicación & Contacto Directo
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-2 leading-relaxed">
            Visítanos en nuestras instalaciones en Llanquihue para probar tu mini excavadora en terreno, o comunícate con nuestros asesores comerciales para coordinar despacho asegurado a cualquier región de Chile.
          </p>
        </div>

        {/* 2-Column Grid: Map on one side, Contact on the other */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: MAPA CON UBICACIÓN */}
          <div className="lg:col-span-7 bg-white border border-[#e5e5e5] rounded-[2px] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              {/* Header inside Map Box */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#eeeeee]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-[2px] bg-[#FE8003]/10 text-[#FE8003] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-heading font-bold uppercase text-[#FE8003] tracking-wider block">
                      Punto de Entrega & Patio de Maquinaria
                    </span>
                    <h3 className="font-heading font-black text-lg uppercase text-[#222222]">
                      Casa Matriz Llanquihue
                    </h3>
                    <p className="text-xs text-[#666666] mt-0.5">
                      {companyData.address}
                    </p>
                  </div>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent('Parcela 11, Ruta V-500, Llanquihue, Región de Los Lagos')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#f8f8f8] hover:bg-[#FE8003] hover:text-white text-[#222222] text-xs font-heading font-bold uppercase tracking-wider border border-[#dddddd] transition-colors self-start sm:self-center shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Cómo Llegar</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                </a>
              </div>

              {/* Google Maps Embed */}
              <div className="mt-5 w-full h-[320px] sm:h-[370px] rounded-[2px] overflow-hidden border border-[#e0e0e0] bg-[#f0f0f0] relative">
                <iframe
                  title="Mapa de Ubicación RST Mini Excavadoras Llanquihue"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent('Parcela 11, Ruta V-500, Llanquihue, Región de Los Lagos')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Bottom Location Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 mt-5 border-t border-[#eeeeee]">
              <div className="bg-[#f9f9f9] p-3 border border-[#eeeeee] rounded-[2px]">
                <div className="text-[11px] font-heading font-bold uppercase text-[#222222] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE8003]"></span>
                  Acceso Directo
                </div>
                <p className="text-[11px] text-[#777777] mt-1 leading-snug">
                  Parcela 11, Ruta V-500, Llanquihue, apto para camiones y camionetas.
                </p>
              </div>

              <div className="bg-[#f9f9f9] p-3 border border-[#eeeeee] rounded-[2px]">
                <div className="text-[11px] font-heading font-bold uppercase text-[#222222] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE8003]"></span>
                  Prueba en Faena
                </div>
                <p className="text-[11px] text-[#777777] mt-1 leading-snug">
                  Revisión mecánica y encendido de motor antes de retirar.
                </p>
              </div>

              <div className="bg-[#f9f9f9] p-3 border border-[#eeeeee] rounded-[2px]">
                <div className="text-[11px] font-heading font-bold uppercase text-[#222222] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#FE8003]" />
                  Despacho Nacional
                </div>
                <p className="text-[11px] text-[#777777] mt-1 leading-snug">
                  Flete coordinado en camión rampa con entrega en tu predio.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACTO AL LADO */}
          <div className="lg:col-span-5 bg-white border border-[#e5e5e5] rounded-[2px] p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              {/* Header inside Contact Box */}
              <div className="pb-4 border-b border-[#eeeeee]">
                <span className="text-[11px] font-heading font-bold uppercase text-[#FE8003] tracking-wider block">
                  Atención Inmediata
                </span>
                <h3 className="font-heading font-black text-xl uppercase text-[#222222] mt-0.5">
                  Cotiza o Contáctanos
                </h3>
                <p className="text-xs text-[#666666] mt-1">
                  Respuesta inmediata por teléfono o WhatsApp por parte de nuestro equipo técnico.
                </p>
              </div>

              {/* Direct Fast Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
                <a
                  href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20deseo%20cotizar%20una%20mini%20excavadora.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#f8f8f8] hover:bg-[#FE8003]/10 border border-[#dddddd] hover:border-[#FE8003] transition-colors rounded-[2px] flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded-[2px] bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-heading font-bold uppercase text-[#888888] block">WhatsApp Ventas</span>
                    <span className="text-xs font-mono font-bold text-[#222222] group-hover:text-[#FE8003]">{companyData.phoneDisplay}</span>
                  </div>
                </a>

                <a
                  href={`tel:${companyData.phoneRaw}`}
                  className="p-3 bg-[#f8f8f8] hover:bg-[#FE8003]/10 border border-[#dddddd] hover:border-[#FE8003] transition-colors rounded-[2px] flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded-[2px] bg-[#222222] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-heading font-bold uppercase text-[#888888] block">Llamada Directa</span>
                    <span className="text-xs font-mono font-bold text-[#222222] group-hover:text-[#FE8003]">{companyData.phoneDisplay}</span>
                  </div>
                </a>
              </div>

              {/* Interactive Quick Form */}
              {submitted ? (
                <div className="py-8 px-4 text-center bg-[#fbfbfb] border border-[#e5e5e5] rounded-[2px] space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center rounded-full">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-heading font-black text-lg uppercase text-[#222222]">
                    ¡Solicitud Preparada!
                  </h4>
                  <p className="text-xs text-[#666666] max-w-xs mx-auto">
                    Se ha abierto la conversación oficial en WhatsApp para enviar tus datos de inmediato.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-antek btn-antek-dark text-xs py-2 px-4 mt-2"
                  >
                    Enviar Otra Consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase text-[#555555] mb-1">
                        Tu Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Juan Pérez"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#f8f8f8] border border-[#dddddd] p-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#FE8003] rounded-[2px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase text-[#555555] mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+56 9 1234 5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#f8f8f8] border border-[#dddddd] p-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#FE8003] rounded-[2px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase text-[#555555] mb-1">
                        Ciudad / Región
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Puerto Varas, Llanquihue..."
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#f8f8f8] border border-[#dddddd] p-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#FE8003] rounded-[2px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-heading font-bold uppercase text-[#555555] mb-1">
                        Modelo de Interés
                      </label>
                      <select
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full bg-[#f8f8f8] border border-[#dddddd] p-2.5 text-xs font-bold text-[#222222] focus:outline-none focus:border-[#FE8003] rounded-[2px]"
                      >
                        {availableProducts.slice(0, 20).map((prod) => (
                          <option key={prod.id} value={prod.name}>
                            {prod.name.length > 50 ? prod.name.slice(0, 47) + '...' : prod.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-heading font-bold uppercase text-[#555555] mb-1">
                      Mensaje o Consulta (Opcional)
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Indica tipo de trabajo, terreno o plazo de entrega..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#f8f8f8] border border-[#dddddd] p-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#FE8003] rounded-[2px] resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-antek btn-antek-primary w-full py-3.5 text-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Solicitar Cotización Inmediata</span>
                  </button>

                  <p className="text-[10px] text-[#888888] text-center mt-2 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Sin compromiso • Asesoría técnica directa de fábrica</span>
                  </p>
                </form>
              )}
            </div>

            {/* Bottom info strip */}
            <div className="pt-4 mt-4 border-t border-[#eeeeee] flex items-center justify-between text-[11px] text-[#777777]">
              <span>Horario: {companyData.schedule}</span>
              <a href={`mailto:${companyData.email}`} className="text-[#FE8003] hover:underline font-bold">
                {companyData.email}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
