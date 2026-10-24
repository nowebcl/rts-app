import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  Phone,
  Search
} from 'lucide-react';
import { companyData } from '../data/excavators';
import QuoteModal from '../components/QuoteModal';
import HeroSlider from '../components/HeroSlider';
import HomeCatalogLoop from '../components/HomeCatalogLoop';
import LocationContactSection from '../components/LocationContactSection';
import BannerSlider from '../components/BannerSlider';
import HomeClientsSection from '../components/HomeClientsSection';

export default function HomePage() {
  const navigate = useNavigate();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteModelId, setQuoteModelId] = useState(null);

  // Quick Finder state
  const [findCategory, setFindCategory] = useState('');
  const [findEngine, setFindEngine] = useState('');
  const [findText, setFindText] = useState('');

  const handleQuickFind = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (findText.trim()) params.set('q', findText.trim());
    if (findCategory) params.set('tonnage', findCategory);
    if (findEngine) params.set('engine', findEngine);
    const queryString = params.toString();
    navigate(queryString ? `/catalogo?${queryString}` : '/catalogo');
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* 1. ANTEK: Hero Slider con 2 imágenes IA, iconos minimalistas y líneas SVG decorativas */}
      <HeroSlider />

      {/* 2. ANTEK: section-find (Quick Equipment Finder Toolbar overlapping hero) */}
      <section className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#dddddd] shadow-2xl p-6 sm:p-8 rounded-[2px]">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#eeeeee]">
            <Search className="w-5 h-5 text-[#FE8003]" />
            <h3 className="font-heading font-extrabold uppercase text-base sm:text-lg text-[#222222] tracking-wider">
              Encuentra la Mini Excavadora Adecuada Para Tu Proyecto
            </h3>
          </div>

          <form onSubmit={handleQuickFind} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-heading font-bold uppercase text-[#777777] mb-1">
                Rango de Tonelaje
              </label>
              <select
                value={findCategory}
                onChange={(e) => setFindCategory(e.target.value)}
                className="w-full bg-[#f8f8f8] border border-[#dddddd] p-3 text-xs font-bold text-[#222222] focus:outline-none focus:border-[#FE8003] cursor-pointer"
              >
                <option value="">Todas las capacidades (0.75T - 7.3T)</option>
                <option value="micro">Ultra Compactas (&lt; 1.0 Ton)</option>
                <option value="compact">Compactas (1.0 Ton - 1.8 Ton)</option>
                <option value="medium">Medianas con Cabina (3.5 Ton - 4.0 Ton)</option>
                <option value="heavy">Faena Pesada (6.0 Ton - 7.5 Ton)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-heading font-bold uppercase text-[#777777] mb-1">
                Marca de Motor
              </label>
              <select
                value={findEngine}
                onChange={(e) => setFindEngine(e.target.value)}
                className="w-full bg-[#f8f8f8] border border-[#dddddd] p-3 text-xs font-bold text-[#222222] focus:outline-none focus:border-[#FE8003] cursor-pointer"
              >
                <option value="">Todos los motores</option>
                <option value="Kubota">Motor Kubota (Japón)</option>
                <option value="Yanmar">Motor Yanmar (Japón)</option>
                <option value="Isuzu">Motor Isuzu (Japón)</option>
                <option value="Yoop">Motor Yoop (Euro V)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-heading font-bold uppercase text-[#777777] mb-1">
                Palabra Clave o Modelo
              </label>
              <input
                type="text"
                placeholder="Ej. R10 Eco, SY35U, Kubota, Cabina..."
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                className="w-full bg-[#f8f8f8] border border-[#dddddd] p-3 text-xs text-[#222222] focus:outline-none focus:border-[#FE8003]"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="btn-antek btn-antek-primary w-full h-[46px]"
              >
                <span>Buscar en Catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. CATÁLOGO INICIO: Loop automático hacia al lado con botón Ver Todo el Catálogo */}
      <HomeCatalogLoop />

      {/* 4. Banner Slider Automático RST */}
      <BannerSlider />

      {/* 5. ANTEK: section-about (Quiénes Somos & Distribuidor Oficial RIPPA en Chile) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Image with floating badge box */}
            <div className="lg:col-span-6 relative">
              <div className="relative border-4 border-[#1f1f1f] shadow-2xl overflow-hidden">
                <img
                  src="/images/rippa-alianza.jpg"
                  alt="Alianza Oficial RST y RIPPA Mini Excavadoras en Chile"
                  className="w-full h-[480px] sm:h-[520px] object-cover object-top"
                />
              </div>

              {/* Antek floating experience badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#FE8003] text-white p-6 shadow-2xl hidden sm:block max-w-xs text-left">
                <div className="font-heading font-black text-2xl uppercase leading-tight">
                  DISTRIBUIDOR PRINCIPAL
                </div>
                <div className="font-heading font-bold text-xs uppercase tracking-wider mt-1 text-white">
                  Oficial RIPPA en Chile
                </div>
                <p className="text-[11px] text-white/90 mt-1">
                  Respaldo directo de fábrica, garantía oficial y stock de repuestos genuinos.
                </p>
              </div>
            </div>

            {/* Right: Text content - Quiénes Somos */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-2">
                <div className="antek-dashes">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
                  Distribuidores Principales de RIPPA · RST Chile
                </div>
                <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase text-[#222222] leading-tight">
                  Quiénes Somos: Distribuidor Oficial RIPPA en Chile
                </h2>
              </div>

              <p className="text-sm text-[#555555] leading-relaxed">
                En <strong>RST Chile</strong> somos representantes y distribuidores oficiales directos de <strong>maquinaria compacta RIPPA</strong>. Nos dedicamos a entregar a contratistas, agricultores y particulares de todo el país equipos de alto rendimiento con respaldo directo de fábrica, garantía oficial y el soporte técnico más confiable del mercado:
              </p>

              {/* Antek about-list */}
              <ul className="space-y-4 pt-2">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-[2px] bg-[#FE8003]/10 text-[#FE8003] flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="font-heading font-bold text-sm uppercase text-[#222222] block">
                      Alianza Directa y Respaldo Oficial de Fábrica
                    </strong>
                    <span className="text-xs text-[#666666]">
                      Importación y distribución oficial directa con RIPPA, asegurando equipos originales con certificación internacional y garantía de fábrica.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-[2px] bg-[#FE8003]/10 text-[#FE8003] flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="font-heading font-bold text-sm uppercase text-[#222222] block">
                      Servicio Técnico Especializado y Repuestos Genuinos
                    </strong>
                    <span className="text-xs text-[#666666]">
                      Bodega permanente con filtros, bombas, orugas y pasadores de recambio inmediato para asegurar la continuidad de tus faenas.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-[2px] bg-[#FE8003]/10 text-[#FE8003] flex items-center justify-center shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="font-heading font-bold text-sm uppercase text-[#222222] block">
                      Cobertura y Despachos a Todo Chile
                    </strong>
                    <span className="text-xs text-[#666666]">
                      Entregas en cualquier región del país, con inducción técnica operativa y máquinas probadas 100% listas para trabajar.
                    </span>
                  </div>
                </li>
              </ul>

              <div className="pt-4">
                <Link
                  to="/nosotros"
                  className="btn-antek btn-antek-dark inline-flex items-center gap-3"
                  title="Conocer más sobre RST y RIPPA Chile"
                >
                  <span>Más Información</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLIENTES QUE CONFIARON EN NOSOTROS (Reemplaza Cómo Adquirir) */}
      <HomeClientsSection />

      {/* 7. ANTEK: section-cta (Industrial Callout Banner) */}
      <section className="bg-[#1a1a1a] text-white py-14 border-y border-[#333333]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <div className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest">
                ¿Necesitas asesoría técnica en terreno?
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-black uppercase text-white">
                Habla Directamente con Nuestros Asesores de Maquinaria
              </h3>
              <p className="text-xs sm:text-sm text-[#aaaaaa]">
                Te ayudamos a definir el tonelaje exacto y los implementos necesarios para tu trabajo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <a
                href={`tel:${companyData.phoneRaw}`}
                className="flex items-center gap-3 px-6 py-4 bg-[#262626] border border-[#383838] hover:border-[#FE8003] text-white font-heading font-bold uppercase text-xs tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FE8003]" />
                <span>{companyData.phoneDisplay}</span>
              </a>

              <a
                href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20solicito%20asesoría%20para%20elegir%20mi%20mini%20excavadora.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-antek btn-antek-primary"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Cotizar por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. UBICACIÓN & CONTACTO (Antes del Footer) */}
      <LocationContactSection />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultModelId={quoteModelId}
      />
    </div>
  );
}
