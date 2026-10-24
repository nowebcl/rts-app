import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import MinimalProductCard from './MinimalProductCard';
import { productService } from '../services/productService';

export default function MinimalCatalogSection() {
  const sectionRef = useRef(null);
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 8 productos por página (2 filas de 4 en desktop)

  // Sincronizar búsqueda desde URL (ej. ?q=kubota)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q !== null) {
      setSearchQuery(q);
      setCurrentPage(1);
    }
  }, [location.search]);

  // Cargar productos desde productService (soporta cambios en vivo desde admin)
  const loadProducts = async () => {
    const list = await productService.getAll();
    setProducts(list);
  };

  useEffect(() => {
    loadProducts();
    // Escuchar eventos de actualización del catálogo
    window.addEventListener('rst_catalog_updated', loadProducts);
    return () => window.removeEventListener('rst_catalog_updated', loadProducts);
  }, []);

  // Categorías con conteos dinámicos
  const categoryCounts = useMemo(() => {
    return {
      all: products.length,
      excavadoras: products.filter(p => p.category === 'excavadoras').length,
      tractores: products.filter(p => p.category === 'tractores').length,
      implementos: products.filter(p => p.category === 'implementos').length,
      camiones: products.filter(p => p.category === 'camiones').length,
      vendidas: products.filter(p => p.isSold).length,
    };
  }, [products]);

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Filtro de categoría
      if (selectedCategory === 'vendidas') {
        if (!p.isSold) return false;
      } else if (selectedCategory !== 'all') {
        if (p.category !== selectedCategory) return false;
      }

      // Filtro de búsqueda
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = (p.description || '').toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    scrollToTop();
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    if (sectionRef.current) {
      const offset = sectionRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="catalogo" ref={sectionRef} className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* 1. Encabezado Minimalista y Limpio */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase text-slate-900 tracking-tight">
            Nuestros Equipos y Maquinarias
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Mini excavadoras, tractores agrícolas, camiones e implementos importados directamente desde Japón y fábricas oficiales. Despacho a todo Chile.
          </p>
        </div>

        {/* 2. Barra de Búsqueda y Filtros de Categoría */}
        <div className="space-y-4">
          {/* Buscador Rápido */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por marca o modelo (ej. Yanmar, SANY, Kubota, John Deere...)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-orange-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Pestañas de Categoría */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            {[
              { id: 'all', label: 'Todos', count: categoryCounts.all },
              { id: 'excavadoras', label: 'Mini Excavadoras', count: categoryCounts.excavadoras },
              { id: 'tractores', label: 'Tractores', count: categoryCounts.tractores },
              { id: 'implementos', label: 'Implementos y Motores', count: categoryCounts.implementos },
              { id: 'camiones', label: 'Camiones', count: categoryCounts.camiones },
              { id: 'vendidas', label: 'Vendidas', count: categoryCounts.vendidas },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? cat.id === 'vendidas'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* 3. Cuadrícula de Productos */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {currentItems.map(product => (
              <MinimalProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
            <Filter className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="font-heading font-bold text-slate-800">No se encontraron equipos</h3>
            <p className="text-xs text-slate-500">
              No hay maquinarias que coincidan con los filtros seleccionados.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        )}

        {/* 4. Paginación Minimalista */}
        {totalPages > 1 && (
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Mostrando <span className="font-bold text-slate-800">{startIndex + 1}</span> a{' '}
              <span className="font-bold text-slate-800">{endIndex}</span> de{' '}
              <span className="font-bold text-slate-800">{filteredProducts.length}</span> equipos
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(validCurrentPage - 1)}
                disabled={validCurrentPage === 1}
                className="p-2 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                title="Página Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${
                    validCurrentPage === num
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(validCurrentPage + 1)}
                disabled={validCurrentPage === totalPages}
                className="p-2 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                title="Página Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
