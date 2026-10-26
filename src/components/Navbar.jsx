import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { 
  Phone, 
  MessageCircle, 
  Clock, 
  Search, 
  X, 
  ChevronRight, 
  Menu,
  LayoutGrid
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';
import { companyData } from '../data/excavators';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/catalogo');
    }
  };

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <header className="w-full z-40 bg-white sticky top-0 shadow-sm transition-all">
      {/* 1. TOP BAR: Exacto a Antek (Horario con reloj naranja a la izquierda, WhatsApp a la derecha) */}
      <div className="bg-[#1e1e1e] text-white border-b border-[#2d2d2d] py-2 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          {/* Left: Reloj naranja + Horario */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[#cccccc] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#FE8003] shrink-0" />
            <span>Lun - Sáb 9:00 - 18:00</span>
          </div>

          {/* Right: En vez de Login, WhatsApp con enlace directo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20me%20comunico%20desde%20la%20página%20web.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white hover:text-[#FE8003] font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#FE8003] shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Redes sociales en pantallas medianas y grandes */}
            <div className="hidden sm:flex items-center gap-2 border-l border-[#3a3a3a] pl-3">
              <a
                href={companyData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#999999] hover:text-[#FE8003] transition-colors"
                aria-label="Instagram RST"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={companyData.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#999999] hover:text-[#FE8003] transition-colors"
                aria-label="Facebook RST"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER: Logo a la izquierda, sin audífonos al centro, Menú hamburguesa + Botón Catálogo Naranja */}
      <div className="bg-white border-b border-[#e5e5e5] h-16 sm:h-20">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between pl-4 sm:pl-6 lg:pl-8 pr-0">
          {/* Left: Brand Logo */}
          <div className="shrink-0 flex items-center py-1 sm:py-2">
            <BrandLogo showText={false} className="h-10 sm:h-12 md:h-14" />
          </div>

          {/* Center (Desktop only): Barra de búsqueda */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md lg:max-w-xl mx-6 relative items-center"
          >
            <div className="relative w-full flex items-center">
              <input
                type="text"
                placeholder="Buscar en el catálogo: mini excavadoras, Kubota, Yanmar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#f4f4f4] hover:bg-[#f0f0f0] focus:bg-white text-xs sm:text-sm text-[#222222] placeholder-[#777777] py-2.5 pl-4 pr-10 rounded-[2px] border border-[#dddddd] focus:border-[#FE8003] focus:outline-none transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#FE8003] hover:bg-[#e57302] text-white rounded-[2px] flex items-center justify-center transition-colors"
                title="Buscar en catálogo"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right: Menú Hamburguesa + Botón Catálogo Naranja */}
          <div className="h-full flex items-center shrink-0">
            {/* BOTÓN MENÚ HAMBURGUESA */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="h-full px-4 sm:px-5 flex items-center justify-center border-l border-[#e5e5e5] hover:bg-slate-50 text-[#222222] transition-colors cursor-pointer"
              aria-label="Abrir Menú Principal"
              title="Menú"
            >
              <Menu className="w-6 h-6 text-[#222222]" />
            </button>

            {/* BOTÓN CATÁLOGO NARANJA (Acceso directo al Catálogo) */}
            <Link
              to="/catalogo"
              className="h-full px-5 sm:px-6 bg-[#FE8003] hover:bg-[#e57302] text-white flex items-center justify-center relative cursor-pointer transition-colors shadow-xs group"
              aria-label="Ir al Catálogo de Equipos"
              title="Ver Catálogo de Venta de Maquinaria Nueva y Semi Nueva"
            >
              <div className="relative flex items-center justify-center">
                <LayoutGrid className="w-6 h-6 text-white stroke-[2.2] transition-transform duration-200 group-hover:scale-110" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. SLIDE-OVER DRAWER MENU */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
            aria-label="Cerrar menú"
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm bg-[#FE8003] text-white shadow-2xl flex flex-col justify-between h-full">
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1 rounded-[4px] shadow-xs flex items-center justify-center shrink-0">
                    <BrandLogo showText={false} className="h-9 w-auto" />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-white text-base font-medium tracking-wide">
                      RST
                    </span>
                    <span className="text-white/80 text-[10px] font-light tracking-widest uppercase mt-0.5">
                      Mini Excavadoras
                    </span>
                  </div>
                </div>

                <button
                  onClick={closeDrawer}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/15 transition-all duration-200 cursor-pointer"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="px-6 py-8 flex-1 overflow-y-auto space-y-6">
                <div className="text-[11px] font-light tracking-[0.25em] uppercase text-white/75 px-3">
                  Navegación
                </div>

                <nav className="space-y-1">
                  {[
                    { name: 'Inicio', path: '/' },
                    { name: 'Quiénes Somos', path: '/nosotros' },
                    { name: 'Alianza con RIPPA', path: '/alianza-rippa' },
                    { name: 'Servicios Realizados', path: '/servicios' },
                    { name: 'Catálogo de Maquinaria Nueva y Semi Nueva', path: '/catalogo' },
                    { name: 'Implementos', path: '/implementos' },
                    { name: 'Entrega a Nuestros Clientes', path: '/entregas-exitosas' },
                    { name: 'Contacto & Casa Matriz', path: '/#contacto' }
                  ].map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => {
                        closeDrawer();
                        if (item.path.includes('#')) {
                          const targetId = item.path.split('#')[1];
                          setTimeout(() => {
                            const el = document.getElementById(targetId);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }
                      }}
                      className={({ isActive }) => `group flex items-center justify-between py-3.5 px-3.5 rounded-[3px] transition-all duration-200 ${
                        isActive 
                          ? 'bg-white/20 text-white font-normal shadow-2xs' 
                          : 'text-white/90 hover:text-white hover:bg-white/10 font-light'
                      }`}
                    >
                      <span className="text-base sm:text-lg tracking-wide transition-transform duration-200 group-hover:translate-x-1">
                        {item.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all stroke-[1.5]" />
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-white/15 bg-black/5 space-y-4">
                <a
                  href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20quiero%20cotizar%20una%20mini%20excavadora.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-white hover:bg-white/95 text-[#FE8003] rounded-[3px] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4 text-[#FE8003] stroke-[2]" />
                  <span>Cotizar por WhatsApp</span>
                </a>

                <div className="flex items-center justify-between text-xs font-light text-white/90 pt-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 stroke-[1.5] text-white/80" />
                    <a href={`tel:${companyData.phoneRaw}`} className="hover:underline whitespace-nowrap">
                      {companyData.phoneDisplay}
                    </a>
                  </div>
                  <span className="text-white/70 text-[11px] font-light">Chile</span>
                </div>

                <div className="text-[10px] font-light text-white/60 text-center tracking-wider pt-1">
                  © {new Date().getFullYear()} RST Mini Excavadoras Chile
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
