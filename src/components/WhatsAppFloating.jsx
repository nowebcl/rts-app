import React, { useState } from 'react';
import { MessageCircle, X, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import { companyData } from '../data/excavators';

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const quickOptions = [
    "Hola RST, quiero cotizar una mini excavadora con entrega inmediata.",
    "Hola, necesito asesoría técnica para elegir entre 1.0T y 1.8T para mi parcela.",
    "Hola, quiero consultar el valor de flete a mi región.",
    "Hola, necesito cotizar un martillo hidráulico o ahoyador para mini excavadora."
  ];

  const handleSend = (text) => {
    const msg = encodeURIComponent(text || customMsg || "Hola RST Mini Excavadoras, solicito información.");
    window.open(`https://wa.me/${companyData.whatsappNumber}?text=${msg}`, "_blank");
    setIsOpen(false);
  };

  return (
    <aside aria-label="Contacto WhatsApp flotante" className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 whatsapp-floating max-w-[calc(100vw-2rem)]">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-3.5 sm:p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center ring-4 ring-emerald-500/20"
          aria-label="Abrir chat de WhatsApp"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
          </span>
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out font-bold text-xs pl-0 group-hover:pl-2">
            Cotizar por WhatsApp
          </span>
        </button>
      )}

      {/* Floating Popup Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-[calc(100vw-2rem)] sm:w-96 max-w-sm overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Asesoría Técnica RST</h4>
                <div className="flex items-center gap-1.5 text-xs text-emerald-100 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  <span>En línea para cotizaciones</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3 max-h-[360px] overflow-y-auto">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs text-xs text-slate-700 leading-relaxed">
              👋 <strong>¡Hola! Bienvenido a RST Mini Excavadoras.</strong>
              <p className="mt-1 text-slate-600">
                ¿Qué faena o proyecto deseas realizar? Selecciona una opción o escríbenos directamente para responderte de inmediato:
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              {quickOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(opt)}
                  className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-xs text-slate-700 transition-colors flex items-center justify-between group shadow-2xs"
                >
                  <span className="pr-2 line-clamp-1">{opt}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribe tu consulta aquí..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
