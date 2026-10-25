import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageCircle, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Share2, 
  FileDown,
  Gift,
  Award
} from 'lucide-react';
import { productService } from '../services/productService';
import MinimalProductCard from '../components/MinimalProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      setLoading(true);
      const found = await productService.getById(id);
      const list = await productService.getAll();
      setProduct(found);
      setAllProducts(list);
      setActiveImageIndex(0);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h2 className="text-2xl font-heading font-black uppercase text-slate-800">Equipo no encontrado</h2>
        <p className="text-sm text-slate-600 max-w-md">
          El producto que buscas no existe o ha sido retirado del catálogo.
        </p>
        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-[#FE8003] transition-colors font-bold text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Catálogo Principal
        </Link>
      </div>
    );
  }

  const isSold = product.isSold;
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const activeImage = gallery[activeImageIndex] || product.image;

  const displayPrice = isSold
    ? (product.price && product.price !== 'VENDIDA' ? `${product.price} (Vendida)` : 'VENDIDA')
    : (product.price || 'Consultar valor');

  const descriptionText = product.description && product.description.trim() 
    ? product.description 
    : 'Consultar más información';

  // WhatsApp prefilled message
  const whatsappUrl = `https://wa.me/56985168608?text=${encodeURIComponent(
    `Hola RST Maquinarias, me interesa consultar información sobre el equipo: "${product.name}". ¿Tienen disponibilidad y despacho?`
  )}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - RST Maquinarias`,
        text: `Revisa la ficha técnica oficial de ${product.name} en RST Maquinarias Chile`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Otras máquinas recomendadas
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12 w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* 1. Barra de Navegación Superior (Breadcrumbs & Volver) */}
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#FE8003] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Catálogo</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? '¡Enlace Copiado!' : 'Compartir Ficha'}</span>
          </button>
        </div>

        {/* 2. Tarjeta Principal de la Ficha Técnica */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">

          {/* Columna Izquierda: Galería de Fotos e Imagen Principal */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-slate-900/5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200">
            <div>
              {/* Contenedor de la Imagen Activa */}
              <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-white border border-slate-200 shadow-inner flex items-center justify-center p-4 sm:p-6">
                <picture className="w-full h-full flex items-center justify-center">
                  {activeImage.endsWith('.webp') && (
                    <source srcSet={activeImage} type="image/webp" />
                  )}
                  <img
                    src={activeImage}
                    alt={product.name}
                    className={`w-full h-full object-contain object-center transition-all duration-300 ${
                      isSold ? 'grayscale contrast-90 brightness-75' : ''
                    }`}
                  />
                </picture>

                {/* LIENZO CRUZANDO LA IMAGEN CUANDO ESTÁ VENDIDA */}
                {isSold && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 overflow-hidden">
                    <div className="bg-red-600/95 text-white font-heading font-black tracking-widest text-base sm:text-lg uppercase py-2 px-24 -rotate-12 shadow-2xl border-y-2 border-white/50 drop-shadow-xl">
                      VENDIDA
                    </div>
                  </div>
                )}

                {/* Badge de Categoría */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-slate-900/90 text-white text-xs font-heading font-bold uppercase tracking-wider px-3 py-1 rounded shadow backdrop-blur-xs">
                    {product.categoryName || 'Maquinaria'}
                  </span>
                </div>
              </div>

              {/* Tira de Miniaturas si hay más de 1 foto */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                  {gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer bg-white p-1 flex items-center justify-center ${
                        activeImageIndex === idx
                          ? 'border-[#FE8003] scale-105 shadow-md'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-contain object-center" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Garantías y Beneficios en pie de imagen */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-200 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Garantía oficial de 1 año</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#FE8003] shrink-0" />
                <span>Despacho a todo Chile</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Información del Producto, Beneficios Oficiales y Botones */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              
              {/* Estado si está vendida */}
              {isSold && (
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    Unidad Vendida / Entregada
                  </span>
                </div>
              )}

              {/* Título Oficial de la Máquina (Nombre de la Carpeta) */}
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 leading-tight">
                {product.name}
              </h1>

              {/* Ubicación y Despacho */}
              <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                <MapPin className="w-4 h-4 text-[#FE8003] shrink-0" />
                <span>{product.location || 'Entrega en terreno a todo Chile'}</span>
              </div>

              {/* BOTÓN DESCARGAR FICHA TÉCNICA OFICIAL (PDF) */}
              {product.pdfUrl && (
                <div className="pt-1">
                  <a
                    href={product.pdfUrl}
                    download
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#FE8003] hover:bg-[#e57302] text-white font-heading font-black uppercase text-xs sm:text-sm tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all group cursor-pointer"
                  >
                    <FileDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform stroke-[2.5]" />
                    <span>Descargar Ficha Técnica Oficial (PDF)</span>
                  </a>
                </div>
              )}

              {/* BLOQUE OBLIGATORIO: TODAS DEBEN LLEVAR ESTO */}
              <div className="bg-orange-50/70 border border-orange-200/90 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="text-xs font-heading font-black uppercase text-[#FE8003] tracking-wider flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#FE8003]" />
                  <span>Beneficios Incluidos con Este Equipo</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#FE8003] mt-2 shrink-0"></span>
                    <span>
                      <strong className="text-slate-900">De regalo:</strong> Acople rápido, dedo pulgar hidráulico y kit de primera mantención gratis.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                    <span>
                      <strong className="text-slate-900">Garantía:</strong> 1 año de garantía en componentes esenciales (motor y bomba).
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                    <span>
                      <strong className="text-slate-900">Certificación:</strong> Certificación Euro 5, EPA, CE.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Descripción Oficial Completa del Archivo de Texto */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-slate-500">
                  Especificaciones Técnicas del Modelo
                </h3>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                  {descriptionText}
                </div>
              </div>
            </div>

            {/* Botones de Contacto y Acción */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold uppercase text-xs sm:text-sm tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Consultar Disponibilidad por WhatsApp</span>
              </a>

              <a
                href="tel:+56985168608"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-heading font-bold uppercase text-xs tracking-wider rounded-xl transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar al +56 9 8516 8608</span>
              </a>
            </div>

          </div>
        </div>

        {/* 3. Otras Máquinas del Catálogo */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-black uppercase text-slate-900">
                  Otras Máquinas Disponibles
                </h3>
                <p className="text-xs text-slate-500">
                  Modelos oficiales con entrega inmediata en todo Chile
                </p>
              </div>
              <Link
                to="/catalogo"
                className="text-xs font-bold text-[#FE8003] hover:text-[#e57302] uppercase tracking-wider"
              >
                Ver Todo el Catálogo →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(p => (
                <MinimalProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
