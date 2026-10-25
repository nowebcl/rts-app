import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';
import { companyData } from '../data/excavators';
import { productService } from '../services/productService';

// Modelos Reales Destacados Oficiales de RST
const FEATURED_REAL_MODELS = [
  { id: 'rippa-r06', name: 'Rippa R06 Kubota', spec: '0.75 Ton' },
  { id: 'rippa-r10-eco', name: 'Rippa R10 Eco', spec: '1.0 Ton' },
  { id: 'rippa-r15', name: 'Rippa R15 Boom Swing', spec: '1.5 Ton' },
  { id: 'rippa-r18', name: 'Rippa R18 Kubota', spec: '1.8 Ton' },
  { id: 'rippa-r22-pro', name: 'Rippa R22 Pro Kubota', spec: '2.5 Ton' },
  { id: 'sanny-sy35u', name: 'SANY SY35U Yanmar Japón', spec: '3.8 Ton' },
  { id: 'sanny-sy60c', name: 'SANY SY60C Climatizada', spec: '6.0 Ton' },
  { id: 'sanny-sy75c', name: 'SANY SY75C Isuzu Japón', spec: '7.3 Ton' }
];

const formatModelDisplayName = (prod) => {
  const id = prod.slug || prod.id;
  if (id === 'rippa-r06') return 'Rippa R06 Kubota';
  if (id === 'rippa-r10-eco') return 'Rippa R10 Eco';
  if (id === 'rippa-r15') return 'Rippa R15 Boom Swing';
  if (id === 'rippa-r18') return 'Rippa R18 Kubota';
  if (id === 'rippa-r22-pro') return 'Rippa R22 Pro Kubota';
  if (id === 'sanny-sy35u') return 'SANY SY35U Yanmar Japón';
  if (id === 'sanny-sy60c') return 'SANY SY60C Climatizada';
  if (id === 'sanny-sy75c') return 'SANY SY75C Isuzu Japón';

  let short = prod.name
    .replace(/^Modelo\s+/i, '')
    .replace(/^Mini\s+[Ee]xcavadoras?\s+/i, '')
    .replace(/（StageIII\)/i, '')
    .replace(/\(Tier4\s*F\s*&\s*Stage\s*Ⅴ\)/i, '')
    .replace(/SANNY/g, 'SANY')
    .replace(/\s+Modelo\s+/i, ' ')
    .trim();

  if (short.length > 27) {
    short = short.slice(0, 25) + '...';
  }
  return short;
};

const formatModelSpec = (prod) => {
  if (prod.tonnage) return prod.tonnage;
  const id = prod.slug || prod.id;
  if (id === 'rippa-r06') return '0.75 Ton';
  if (id === 'rippa-r10-eco') return '1.0 Ton';
  if (id === 'rippa-r15') return '1.5 Ton';
  if (id === 'rippa-r18') return '1.8 Ton';
  if (id === 'rippa-r22-pro') return '2.5 Ton';
  if (id === 'sanny-sy35u') return '3.8 Ton';
  if (id === 'sanny-sy60c') return '6.0 Ton';
  if (id === 'sanny-sy75c') return '7.3 Ton';

  const matchTon = prod.name.match(/(\d+(?:\.\d+)?)\s*(?:toneladas?|ton|t\b)/i);
  return matchTon ? `${matchTon[1]} Ton` : 'Disponible';
};

export default function Footer() {
  const [featuredModels, setFeaturedModels] = useState(FEATURED_REAL_MODELS);

  useEffect(() => {
    const loadRealData = async () => {
      try {
        const list = await productService.getAll();
        if (list && list.length > 0) {
          const mapped = list.slice(0, 8).map(prod => ({
            id: prod.slug || prod.id,
            name: formatModelDisplayName(prod),
            spec: formatModelSpec(prod)
          }));

          if (mapped.length > 0) {
            setFeaturedModels(mapped);
          }
        }
      } catch (err) {
        console.warn('Usando catálogo inicial en Footer:', err);
      }
    };
    loadRealData();
    window.addEventListener('rst_catalog_updated', loadRealData);
    return () => window.removeEventListener('rst_catalog_updated', loadRealData);
  }, []);

  return (
    <footer className="bg-[#181818] text-[#999999] border-t-4 border-[#FE8003]">
      {/* ANTEK: page-footer-top */}
      <div className="border-b border-[#262626] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Logo oficial */}
            <div className="shrink-0 flex items-center justify-center lg:justify-start">
              <BrandLogo showText={false} className="h-16 sm:h-20 md:h-24" />
            </div>

            {/* Slogan & Garantía */}
            <div className="text-center lg:text-left space-y-1">
              <span className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest block">
                {companyData.legalName} • {companyData.location}
              </span>
              <p className="text-sm font-heading font-bold uppercase text-white tracking-wide">
                Importación Directa & Respaldo Técnico en Mini Excavadoras
              </p>
            </div>

            {/* Direct CTAs */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`tel:${companyData.phoneRaw}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#222222] hover:bg-[#2c2c2c] text-white border border-[#383838] hover:border-[#FE8003] text-xs font-heading font-bold uppercase tracking-wider rounded-[2px] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FE8003]" />
                <span>{companyData.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20solicito%20información%20de%20mini%20excavadoras.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-antek btn-antek-primary text-xs py-2.5 px-4"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Oficial</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ANTEK: page-footer-middle */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
            {/* Col 1: About */}
            <div className="space-y-4">
              <h4 className="font-heading font-extrabold uppercase text-white text-base tracking-wider border-b border-[#333333] pb-2">
                Sobre RST Chile
              </h4>
              <p className="text-xs text-[#888888] leading-relaxed">
                Empresa especializada exclusivamente en la importación directa, venta de maquinaria nueva y semi nueva, y postventa de <strong>mini excavadoras compactas</strong> de alta eficiencia de 0.8 a 7.5 toneladas con entrega inmediata y repuestos garantizados.
              </p>

              {/* Social icons list */}
              <div className="pt-2">
                <span className="text-[11px] font-heading font-bold uppercase text-white block mb-2 tracking-wider">
                  Redes Oficiales
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={companyData.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-[2px] bg-[#242424] hover:bg-[#FE8003] text-white flex items-center justify-center transition-colors"
                    aria-label="Instagram RST"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={companyData.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-[2px] bg-[#242424] hover:bg-[#0816FF] text-white flex items-center justify-center transition-colors"
                    aria-label="Facebook RST"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/${companyData.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-[2px] bg-[#242424] hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
                    aria-label="WhatsApp RST"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-4">
              <h4 className="font-heading font-extrabold uppercase text-white text-base tracking-wider border-b border-[#333333] pb-2">
                Enlaces Rápidos
              </h4>
              <ul className="space-y-3 text-xs text-[#888888]">
                <li>
                  <Link 
                    to="/" 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-[#FE8003] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#FE8003]">›</span> Inicio
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/nosotros" 
                    className="hover:text-[#FE8003] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#FE8003]">›</span> Quiénes Somos
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/catalogo" 
                    className="hover:text-[#FE8003] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#FE8003]">›</span> Catálogo de Equipos
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/implementos" 
                    className="hover:text-[#FE8003] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#FE8003]">›</span> Implementos
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/entregas-exitosas" 
                    className="hover:text-[#FE8003] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#FE8003]">›</span> Entrega a Clientes
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/#contacto" 
                    onClick={() => {
                      const el = document.getElementById('contacto');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#FE8003] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#FE8003]">›</span> Casa Matriz y Contacto
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Fleet */}
            <div className="space-y-4">
              <h4 className="font-heading font-extrabold uppercase text-white text-base tracking-wider border-b border-[#333333] pb-2">
                Modelos Destacados
              </h4>
              <ul className="space-y-2 text-xs text-[#888888]">
                {featuredModels.map((m) => (
                  <li key={m.id}>
                    <Link
                      to={`/ficha/${m.id}`}
                      className="hover:text-[#FE8003] transition-colors flex items-center justify-between group"
                    >
                      <span className="truncate pr-2 group-hover:text-white transition-colors">{m.name}</span>
                      <span className="font-mono text-[#FE8003] text-[11px] font-bold shrink-0">{m.spec}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-2 border-t border-[#2a2a2a]">
                  <Link
                    to="/catalogo"
                    className="text-[#FE8003] hover:text-white transition-colors flex items-center justify-between font-heading font-bold uppercase tracking-wider text-[11px]"
                  >
                    <span>Ver Catálogo Completo</span>
                    <span>›</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Info */}
            <div className="space-y-4">
              <h4 className="font-heading font-extrabold uppercase text-white text-base tracking-wider border-b border-[#333333] pb-2">
                Casa Matriz
              </h4>
              <div className="space-y-3 text-xs text-[#888888]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#FE8003] shrink-0 mt-0.5" />
                  <span>{companyData.address}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FE8003] shrink-0" />
                  <a href={`tel:${companyData.phoneRaw}`} className="text-white hover:text-[#FE8003] font-bold">
                    {companyData.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#FE8003] shrink-0" />
                  <a href={`mailto:${companyData.email}`} className="hover:text-white">
                    {companyData.email}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#FE8003] shrink-0 mt-0.5" />
                  <span>{companyData.schedule}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ANTEK: page-footer-bottom */}
      <div className="bg-[#111111] py-5 border-t border-[#222222] text-xs text-[#777777]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} <strong>{companyData.brandName}</strong>. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4 text-[#888888] hidden lg:flex">
            <span>100% Mini Excavadoras</span>
            <span>•</span>
            <span>Llanquihue, Región de Los Lagos</span>
            <span>•</span>
            <span>Despacho a todo Chile</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#888888]">
            <span>Desarrollado por</span>
            <a
              href="https://www.noweb.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FE8003] hover:text-[#ff9d3b] font-semibold transition-colors"
            >
              noweb.cl
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
