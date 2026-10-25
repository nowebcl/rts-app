import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  Phone,
  Search,
  Target,
  Eye,
  Wrench
} from 'lucide-react';
import { companyData } from '../data/excavators';
import QuoteModal from '../components/QuoteModal';
import HeroSlider from '../components/HeroSlider';
import HomeCatalogLoop from '../components/HomeCatalogLoop';
import LocationContactSection from '../components/LocationContactSection';
import BannerSlider from '../components/BannerSlider';
import HomeClientsSection from '../components/HomeClientsSection';
import SeoFaqSection from '../components/SeoFaqSection';

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
                <option value="">Todas las capacidades (desde 0.6 ton hasta 8 ton)</option>
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

      {/* 5. LLAMADA A LA ACCIÓN: Implementos (Fondo acorde al diseño del sitio) */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 text-left">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="text-xs font-heading font-extrabold uppercase text-[#FE8003] tracking-widest flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Accesorios para Mini Excavadoras</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-heading font-black uppercase text-[#222222] tracking-wide">
                IMPLEMENTOS
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Catálogo de accesorios e implementos disponibles para tu mini excavadora con entrega directa.
              </p>
            </div>

            <Link
              to="/implementos"
              className="btn-antek btn-antek-primary shrink-0 self-start lg:self-auto"
            >
              <span>Ver Catálogo de Implementos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grid de implementos reales con fondo blanco acorde al estilo de la página */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { num: '01', name: 'Pinza para Madera', img: '/ACCESORIOS/01_pinza_madera.png' },
              { num: '04', name: 'Martillo Rompedor', img: '/ACCESORIOS/04_martillo_rompedor.png' },
              { num: '05', name: 'Barrena Perforadora', img: '/ACCESORIOS/05_barrena_perforadora.png' },
              { num: '06', name: 'Cucharón Basculante', img: '/ACCESORIOS/06_cucharon_basculante.png' }
            ].map((item) => (
              <Link
                key={item.num}
                to="/implementos"
                className="bg-white border border-slate-200 hover:border-[#FE8003] rounded-[2px] overflow-hidden group transition-all duration-300 block text-left shadow-xs hover:shadow-md"
              >
                <div className="aspect-4/3 bg-slate-100 overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-[#181818]/90 text-white px-2 py-0.5 text-[10px] font-heading font-black rounded-[2px] border-l-2 border-[#FE8003]">
                    #{item.num}
                  </div>
                </div>
                <div className="p-3.5">
                  <h4 className="font-heading font-bold uppercase text-[#222222] text-xs sm:text-sm group-hover:text-[#FE8003] transition-colors truncate">
                    {item.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ANTEK: section-about (Quiénes Somos & Distribuidor Oficial RIPPA en Chile) */}
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

            {/* Right: Text content - Quiénes Somos: Misión y Visión */}
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
                  Quiénes Somos: Misión y Visión
                </h2>
              </div>

              {/* Misión y Visión Cards */}
              <div className="space-y-4 pt-1">
                {/* Misión RST */}
                <div className="bg-[#f8f9fa] border-l-4 border-[#FE8003] p-5 rounded-[2px] shadow-2xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-[2px] bg-[#FE8003] text-white flex items-center justify-center shrink-0">
                      <Target className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-black text-base uppercase text-[#222222] tracking-wide">
                      Misión RST
                    </h3>
                  </div>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    Importamos y comercializamos maquinaria compacta confiable y eficiente, con tecnología de vanguardia a precios competitivos, para reducir el esfuerzo físico y aumentar la productividad en los sectores agrícola, de la construcción e industrial.
                  </p>
                </div>

                {/* Nuestra Visión */}
                <div className="bg-[#f8f9fa] border-l-4 border-[#222222] p-5 rounded-[2px] shadow-2xs hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-[2px] bg-[#222222] text-[#FE8003] flex items-center justify-center shrink-0">
                      <Eye className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-black text-base uppercase text-[#222222] tracking-wide">
                      Nuestra Visión
                    </h3>
                  </div>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    Buscar, importar y acercar tecnología e innovación de calidad, para resolver necesidades reales y mejorar la eficiencia en los distintos sectores productivos de la región, nuestro país y el mundo.
                  </p>
                </div>
              </div>

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

      {/* 7. CLIENTES QUE CONFIARON EN NOSOTROS */}
      <HomeClientsSection />

      {/* 8. ANTEK: section-cta (Industrial Callout Banner) */}
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

      {/* 8.5 SEO FAQ Y GUIA DE COMPRA */}
      <SeoFaqSection />

      {/* 9. UBICACIÓN & CONTACTO */}
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
