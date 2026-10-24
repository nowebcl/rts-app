import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { companyData } from '../data/excavators';
import { products } from '../data/products';

export default function QuoteModal({ isOpen, onClose, defaultModelId = null }) {
  const availableProducts = products.filter(p => !p.isSold);

  const [formData, setFormData] = useState({
    name: '',
    rut: '',
    phone: '',
    email: '',
    city: '',
    modelId: defaultModelId || availableProducts[0]?.id || 'rippa-r06',
    financingType: 'Contado / Transferencia Directa',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const selectedMachine = products.find(e => e.id === formData.modelId);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const text = encodeURIComponent(
      `*COTIZACIÓN FORMAL SOLICITADA*\n\n` +
      `Cliente: ${formData.name}\n` +
      `RUT: ${formData.rut}\n` +
      `Teléfono: ${formData.phone}\n` +
      `Ciudad/Región: ${formData.city}\n` +
      `Modelo: ${selectedMachine?.name || 'Maquinaria RST'} (${selectedMachine?.price || 'Consultar'})\n` +
      `Modalidad: ${formData.financingType}\n` +
      `Comentarios: ${formData.notes || 'Sin comentarios adicionales.'}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/${companyData.whatsappNumber}?text=${text}`, '_blank');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#111111]/85 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#FE8003] rounded-[2px] max-w-lg w-full shadow-2xl overflow-hidden text-left">
        {/* Header */}
        <div className="bg-[#1f1f1f] text-white p-6 flex items-center justify-between border-b border-[#333333]">
          <div>
            <div className="antek-dashes mb-1">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#FE8003] block">
              Atención Comercial Inmediata
            </span>
            <h3 className="text-xl font-heading font-black uppercase text-white mt-0.5">
              Solicitar Cotización Formal
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#333333] hover:bg-[#FE8003] text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-heading font-black uppercase text-[#222222]">
              ¡Solicitud Recibida!
            </h4>
            <p className="text-xs text-[#666666] max-w-sm mx-auto">
              Te estamos conectando a WhatsApp para entregarte la cotización con valores netos y costo de flete a tu localidad.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="btn-antek btn-antek-dark mt-2"
            >
              Cerrar Ventana
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
            {/* Selected Machine Alert */}
            <div className="bg-[#f8f8f8] border-l-4 border-[#FE8003] p-3 flex items-center gap-3">
              <img 
                src={selectedMachine?.image} 
                alt={selectedMachine?.name} 
                className="w-14 h-14 object-cover rounded-[2px] shrink-0" 
              />
              <div>
                <span className="text-[10px] font-heading font-bold text-[#FE8003] uppercase">Equipo a Cotizar</span>
                <div className="font-heading font-black text-[#222222] text-sm uppercase">{selectedMachine?.name}</div>
                <div className="text-[11px] text-[#FE8003] font-mono font-bold">
                  {selectedMachine?.pricePromo || selectedMachine?.priceRef}
                </div>
              </div>
            </div>

            <div>
              <label className="block font-heading font-bold uppercase text-[#555555] mb-1">Cambiar Modelo:</label>
              <select
                value={formData.modelId}
                onChange={(e) => setFormData({ ...formData, modelId: e.target.value })}
                className="w-full bg-[#f8f8f8] border border-[#dddddd] p-2.5 text-xs font-heading font-bold uppercase text-[#222222] focus:outline-none focus:border-[#FE8003]"
              >
                {availableProducts.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name.length > 50 ? m.name.slice(0, 48) + '...' : m.name} — {m.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-heading font-bold uppercase text-[#555555] mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre o empresa"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#f8f8f8] border border-[#dddddd] p-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#FE8003]"
                />
              </div>

              <div>
                <label className="block font-heading font-bold uppercase text-[#555555] mb-1">RUT Empresa / Personal</label>
                <input
                  type="text"
                  placeholder="Ej: 76.123.456-7"
                  value={formData.rut}
                  onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                  className="w-full bg-[#f8f8f8] border border-[#dddddd] p-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#FE8003]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-heading font-bold uppercase text-[#555555] mb-1">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+56 9 1234 5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#f8f8f8] border border-[#dddddd] p-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#FE8003]"
                />
              </div>

              <div>
                <label className="block font-heading font-bold uppercase text-[#555555] mb-1">Ciudad o Región *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Llanquihue, Puerto Varas..."
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#f8f8f8] border border-[#dddddd] p-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#FE8003]"
                />
              </div>
            </div>

            <div>
              <label className="block font-heading font-bold uppercase text-[#555555] mb-1">Modalidad de Pago</label>
              <select
                value={formData.financingType}
                onChange={(e) => setFormData({ ...formData, financingType: e.target.value })}
                className="w-full bg-[#f8f8f8] border border-[#dddddd] p-2.5 text-xs font-heading font-bold uppercase text-[#222222] focus:outline-none focus:border-[#FE8003]"
              >
                <option>Contado / Transferencia Directa</option>
                <option>Facturación con Crédito Maquinaria</option>
                <option>Leasing Bancario (12 a 36 cuotas)</option>
                <option>Tarjetas de Crédito en Cuotas</option>
              </select>
            </div>

            <div>
              <label className="block font-heading font-bold uppercase text-[#555555] mb-1">Implementos Adicionales</label>
              <textarea
                rows="2"
                placeholder="¿Deseas agregar martillo hidráulico, ahoyador o balde de limpieza?"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-[#f8f8f8] border border-[#dddddd] p-2.5 text-xs text-[#222222] focus:outline-none focus:border-[#FE8003] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-antek btn-antek-primary w-full py-4 text-xs font-bold uppercase"
            >
              <Send className="w-4 h-4" />
              <span>Enviar y Recibir Cotización en WhatsApp</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
