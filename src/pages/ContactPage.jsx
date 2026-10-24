import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { companyData } from '../data/excavators';

// Custom SVG Icons matching Antek theme with 100% pixel fidelity
function LocationPinIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 52.5 63.73" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M44.46 43.06c-3.95 4.61-18 18.91-18.2 19.17-.26-.3-15.53-16.06-18.66-19.71A24.75 24.75 0 1151 26.25a25.4 25.4 0 01-6.54 16.81" />
      <circle cx="26.25" cy="26.25" r="8.5" />
    </svg>
  );
}

function PhoneIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 53.74 63.62" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24.03 44.99c-5.35-5.13-11-13.2-12.73-20.87a3 3 0 011.4-3.23l5.8-3.52a3 3 0 001.42-3.11L18.15 4.04a3 3 0 00-3-2.52H5.22a3 3 0 00-3 2.57c-4.46 28.17 12.43 50.9 35.27 57.9a3 3 0 003.47-1.31l4.92-8a3 3 0 00-.73-4l-8.57-6.69a3 3 0 00-3.55-.13l-5.2 3.47a3 3 0 01-3.8-.34zm5.06-30.27a38.45 38.45 0 0113.8 21.92M29.57 4.15a47.54 47.54 0 0122.67 33.52" />
    </svg>
  );
}

function GlobeIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="32" r="30.5" />
      <ellipse cx="32" cy="32" rx="9" ry="30.5" />
      <path d="M4 22a45 45 0 0056 0M4 42a45 45 0 0156 0" />
    </svg>
  );
}

function MailIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 23.5l-28 20.44a3 3 0 01-3.56 0c-6.41-4.7-28-20.44-28-20.44" />
      <path d="M1.5 52.41V25.56a3 3 0 011.17-2.38c4.67-3.57 21.92-16.74 27.52-21a3 3 0 013.62 0c5.6 4.3 22.85 17.47 27.52 21a3 3 0 011.17 2.38v32.94a3 3 0 01-3 3h-55a3 3 0 01-3-3z" />
    </svg>
  );
}

function ArrowSvg({ className = "w-5 h-3" }) {
  return (
    <svg viewBox="0 0 343 176.96" className={className} fill="currentColor">
      <path d="M252.91-.02L232.124 20.4l25.2 24.75H0v28.88h286.72l14.7 14.44-14.7 14.45H0v28.87h257.32l-25.2 24.76 20.786 20.42 90.09-88.5z" fillRule="evenodd" />
    </svg>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const primaryWhatsapp = "56985168608";
  const primaryPhoneDisplay = "+56 9 8516 8608";

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const text = encodeURIComponent(
      `*NUEVO MENSAJE DE CONTACTO WEB RST*\n\n` +
      `*Nombre:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      (formData.subject ? `*Asunto:* ${formData.subject}\n` : '') +
      `*Mensaje:* ${formData.message}\n\n` +
      `_Mensaje enviado desde el formulario de contacto web RST._`
    );
    setTimeout(() => {
      window.open(`https://wa.me/${primaryWhatsapp}?text=${text}`, '_blank');
    }, 600);
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans w-full max-w-full overflow-x-hidden">
      
      {/* 1. HERO BANNER (ANTEK: page-head) */}
      <div className="relative w-full bg-[#161616] overflow-hidden">
        {/* Background image with machinery and dark overlay */}
        <div 
          className="relative bg-cover bg-center py-20 md:py-28 text-center px-4"
          style={{ backgroundImage: `url('/images/bg_contacts.jpg')` }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60 z-0"></div>

          {/* Banner content */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            {/* Top 3 machinery vehicle icons */}
            <div className="flex items-center justify-center gap-7 mb-2">
              <img 
                src="/icons/ico-slideshow-1.svg" 
                alt="Mini Excavadora" 
                className="w-12 h-12 md:w-14 md:h-14 brightness-0 invert opacity-95"
              />
              <img 
                src="/icons/ico-slideshow-2.svg" 
                alt="Camión Tolva" 
                className="w-12 h-12 md:w-14 md:h-14 brightness-0 invert opacity-95"
              />
              <img 
                src="/icons/ico-slideshow-3.svg" 
                alt="Excavadora Pesada" 
                className="w-12 h-12 md:w-14 md:h-14 brightness-0 invert opacity-95"
              />
            </div>

            {/* Accent dashes below icons */}
            <div className="mb-6">
              <img 
                src="/decor/decor-title-2.svg" 
                alt="Accent line" 
                className="w-16 h-2 brightness-0 invert opacity-75"
              />
            </div>

            {/* Title (Title Case as in screenshot) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white tracking-normal font-sans my-0">
              Contáctanos
            </h1>

            {/* Breadcrumb with slanted orange badge */}
            <div className="mt-5 flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold tracking-wider">
              <Link 
                to="/" 
                className="relative inline-block px-4 py-1.5 bg-[#FE8003] text-white hover:bg-[#e57302] transition-colors -skew-x-[25deg] shadow-sm cursor-pointer"
              >
                <span className="inline-block skew-x-[25deg] font-bold text-xs uppercase">
                  INICIO
                </span>
              </Link>
              <span className="text-white font-bold tracking-widest text-xs uppercase">
                CONTÁCTANOS
              </span>
            </div>
          </div>
        </div>

        {/* Hazard warning diagonal stripes tape at the bottom border */}
        <div 
          className="absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-full max-w-[500px] h-[25px] z-20 pointer-events-none bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/decor/decor-lines.svg')` }}
        />
      </div>

      {/* 2. PAGE CONTENT (Card + Map) */}
      <div className="w-full bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 2-Column Card (contacts-block) */}
          <div className="bg-white shadow-[0_5px_24px_6px_rgba(0,0,0,0.06)] border border-[#eeeeee] rounded-[2px] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* LEFT COLUMN: Orange Solid Sidebar with Logo Color (#FE8003) */}
              <div className="lg:col-span-4 bg-[#FE8003] p-8 sm:p-10 md:p-12 text-white flex flex-col justify-between">
                <div>
                  {/* Title with two horizontal white dashes */}
                  <div className="flex items-center gap-3.5 mb-9">
                    <img 
                      src="/decor/decor-title-left.svg" 
                      alt="" 
                      className="w-7 h-2 shrink-0 brightness-0 invert"
                    />
                    <h3 className="font-sans font-bold text-2xl tracking-tight text-white m-0">
                      Detalles de Contacto
                    </h3>
                  </div>

                  {/* Contact List */}
                  <div className="space-y-6 text-left">
                    {/* Item 1: Address */}
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 shrink-0 text-white pt-0.5">
                        <LocationPinIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-white/95">
                          Dirección Casa Matriz
                        </span>
                        <div className="text-sm font-normal text-white mt-0.5 leading-snug">
                          {companyData.address}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/40 pt-6">
                      {/* Item 2: Rental Support / Phone */}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 shrink-0 text-white pt-0.5">
                          <PhoneIcon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold text-white/95">
                            Atención Comercial y WhatsApp
                          </span>
                          <a 
                            href={`https://wa.me/${primaryWhatsapp}?text=Hola%20RST,%20deseo%20realizar%20una%20consulta.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm sm:text-base font-normal text-white hover:text-black transition-colors block mt-0.5"
                          >
                            {primaryPhoneDisplay}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/40 pt-6">
                      {/* Item 3: Office Hours */}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 shrink-0 text-white pt-0.5">
                          <GlobeIcon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold text-white/95">
                            Horario de Atención
                          </span>
                          <div className="text-sm font-normal text-white mt-0.5 leading-snug">
                            {companyData.schedule}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/40 pt-6">
                      {/* Item 4: Email */}
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 shrink-0 text-white pt-0.5">
                          <MailIcon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <span className="block text-xs font-semibold text-white/95">
                            Correo Electrónico
                          </span>
                          <a 
                            href={`mailto:${companyData.email}`} 
                            className="text-sm font-normal text-white hover:text-black transition-colors block mt-0.5 break-all"
                          >
                            {companyData.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom reassurance */}
                <div className="pt-8 mt-8 border-t border-white/25 text-xs text-white/90 leading-relaxed">
                  <span className="font-bold uppercase tracking-wider block mb-1">
                    Atención Comercial Oficial
                  </span>
                  Asesoría técnica y despacho asegurado a todas las regiones de Chile.
                </div>
              </div>

              {/* RIGHT COLUMN: White Form (block-form) */}
              <div className="lg:col-span-8 bg-white p-8 sm:p-12 md:p-16 text-left flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#222222] tracking-tight m-0">
                    Envíanos un Mensaje
                  </h2>

                  {/* Antek double orange bar accent */}
                  <div className="mt-2.5 mb-4">
                    <img 
                      src="/decor/decor-title-2.svg" 
                      alt="" 
                      className="w-16 h-2"
                    />
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-[#555555] italic mb-8">
                    Tu dirección de correo no será publicada. Los campos obligatorios están marcados con *
                  </p>

                  {submitted ? (
                    <div className="py-12 text-center space-y-4">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="font-bold text-2xl uppercase text-[#222222]">
                        ¡Mensaje Enviado con Éxito!
                      </h4>
                      <p className="text-xs sm:text-sm text-[#666666] max-w-md mx-auto">
                        Se ha abierto el canal de WhatsApp oficial (+56 9 8516 8608) para atenderte al instante.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', subject: '', message: '' });
                        }}
                        className="mt-4 px-6 py-3 bg-[#222222] hover:bg-[#FE8003] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        Enviar Otro Mensaje
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      {/* Row 1: Name * and Email * */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Nombre Completo *"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-[52px] px-4 bg-white border border-[#e5e5e5] text-sm text-[#222222] placeholder-[#888888] focus:outline-none focus:border-[#FE8003] transition-colors rounded-[2px]"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            required
                            placeholder="Correo Electrónico *"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full h-[52px] px-4 bg-white border border-[#e5e5e5] text-sm text-[#222222] placeholder-[#888888] focus:outline-none focus:border-[#FE8003] transition-colors rounded-[2px]"
                          />
                        </div>
                      </div>

                      {/* Row 2: Subject */}
                      <div>
                        <input
                          type="text"
                          placeholder="Asunto"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full h-[52px] px-4 bg-white border border-[#e5e5e5] text-sm text-[#222222] placeholder-[#888888] focus:outline-none focus:border-[#FE8003] transition-colors rounded-[2px]"
                        />
                      </div>

                      {/* Row 3: Your Message */}
                      <div>
                        <textarea
                          rows="5"
                          required
                          placeholder="Tu Mensaje *"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full h-[140px] p-4 bg-white border border-[#e5e5e5] text-sm text-[#222222] placeholder-[#888888] focus:outline-none focus:border-[#FE8003] transition-colors rounded-[2px] resize-none"
                        ></textarea>
                      </div>

                      {/* Row 4: Submit button with logo orange and white arrow */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-3.5 px-8 h-[54px] bg-[#FE8003] hover:bg-[#222222] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors duration-300 rounded-[2px] cursor-pointer shadow-sm"
                        >
                          <span>ENVIAR MENSAJE</span>
                          <ArrowSvg className="w-5 h-3 text-white" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3. GOOGLE MAPS EMBED (contacts-map) */}
          <div className="mt-14 sm:mt-16">
            <div className="w-full h-[450px] sm:h-[500px] border border-[#e0e0e0] rounded-[2px] overflow-hidden shadow-sm bg-[#f0f0f0] relative">
              <iframe
                title="Mapa de Ubicación Casa Matriz RST Mini Excavadoras Llanquihue Chile"
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

        </div>
      </div>
    </div>
  );
}
