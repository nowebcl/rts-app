import React from 'react';
import AttachmentsGrid from '../components/AttachmentsGrid';
import { Link } from 'react-router-dom';
import { Wrench, ShieldCheck, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { companyData } from '../data/excavators';

export default function AttachmentsPage() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen pb-24">
      {/* ANTEK: page-head banner */}
      <div className="bg-[#1a1a1a] text-white py-14 border-b border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="text-xs font-heading font-bold text-[#FE8003] uppercase tracking-widest">
                Línea de Implementos Hidráulicos
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white tracking-wide">
                Aditamentos & Implementos
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-[#888888]">
              <Link to="/" className="hover:text-[#FE8003]">Inicio</Link>
              <span>/</span>
              <span className="text-[#FE8003]">Aditamentos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* Intro */}
        <div className="max-w-3xl text-left">
          <p className="text-sm text-[#555555] leading-relaxed">
            Multiplica la productividad de tu mini excavadora con implementos certificados. Contamos con acople rápido garantizado para martillos demoledores, ahoyadores para cercos, baldes zanjeros y baldes basculantes para limpieza de canales.
          </p>
        </div>

        {/* Benefits Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 border border-[#e5e5e5] rounded-[2px] shadow-xs text-left">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-[2px] bg-[#FE8003]/10 text-[#FE8003] flex items-center justify-center shrink-0 font-bold">✓</div>
            <div>
              <h4 className="font-heading font-bold uppercase text-sm text-[#222222]">Línea Hidráulica Auxiliar</h4>
              <p className="text-xs text-[#666666] mt-0.5">Compatible con el flujo y presión de cada modelo.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-[2px] bg-[#FE8003]/10 text-[#FE8003] flex items-center justify-center shrink-0 font-bold">✓</div>
            <div>
              <h4 className="font-heading font-bold uppercase text-sm text-[#222222]">Acoples Rápidos Push-Lock</h4>
              <p className="text-xs text-[#666666] mt-0.5">Cambio de balde a martillo en menos de 1 minuto.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-[2px] bg-[#FE8003]/10 text-[#FE8003] flex items-center justify-center shrink-0 font-bold">✓</div>
            <div>
              <h4 className="font-heading font-bold uppercase text-sm text-[#222222]">Aceros Antidesgaste Hardox</h4>
              <p className="text-xs text-[#666666] mt-0.5">Cuchillas y calzas de máxima resistencia a la abrasión.</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <AttachmentsGrid limit={null} showHeader={false} />

        {/* Banner */}
        <div className="bg-[#1f1f1f] text-white p-8 border border-[#333333] flex flex-col md:flex-row items-center justify-between gap-6 rounded-[2px]">
          <div>
            <h3 className="font-heading font-black text-xl uppercase text-white">
              ¿Tienes dudas sobre los pasadores o el caudal requerido?
            </h3>
            <p className="text-xs text-[#aaaaaa] mt-1">
              Verificamos diámetro de bulones y distancia entre centros para garantizar 100% de compatibilidad.
            </p>
          </div>
          <a
            href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20necesito%20consultar%20compatibilidad%20de%20aditamentos.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-antek btn-antek-primary shrink-0"
          >
            <span>Consultar por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
