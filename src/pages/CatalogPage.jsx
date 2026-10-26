import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft,
  ChevronsRight,
  Filter, 
  X, 
  ArrowUpDown, 
  Home,
  CheckCircle2,
  Phone,
  MessageCircle
} from 'lucide-react';
import MinimalProductCard from '../components/MinimalProductCard';
import { productService } from '../services/productService';
import { companyData } from '../data/excavators';

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catalogTopRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros principales
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedEngine, setSelectedEngine] = useState(searchParams.get('engine') || 'all');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'all');
  const [selectedTonnage, setSelectedTonnage] = useState(searchParams.get('tonnage') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'default');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));

  const itemsPerPage = 12; // 12 productos por página (perfecto para 2, 3 y 4 columnas)

  // Cargar productos desde PocketBase / LocalStorage
  const loadProducts = async () => {
    setLoading(true);
    const list = await productService.getAll();
    setProducts(list);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
    window.addEventListener('rst_catalog_updated', loadProducts);
    return () => window.removeEventListener('rst_catalog_updated', loadProducts);
  }, []);

  // Sincronizar desde searchParams si cambian externamente (ej. navegación desde navbar o quick finder)
  useEffect(() => {
    const qParam = searchParams.get('q') || '';
    const catParam = searchParams.get('category') || 'all';
    const engParam = searchParams.get('engine') || 'all';
    const statusParam = searchParams.get('status') || 'all';
    const tonnageParam = searchParams.get('tonnage') || 'all';
    const sortParam = searchParams.get('sort') || 'default';
    const pageParam = parseInt(searchParams.get('page') || '1', 10);

    setSearchQuery(qParam);
    setSelectedCategory(catParam);
    setSelectedEngine(engParam);
    setSelectedStatus(statusParam);
    setSelectedTonnage(tonnageParam);
    setSortBy(sortParam);
    setCurrentPage(isNaN(pageParam) ? 1 : pageParam);
  }, [searchParams]);

  // Actualizar URL searchParams de forma controlada
  const updateParams = (updates) => {
    const nextParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, val]) => {
      if (!val || val === 'all' || val === 'default' || (key === 'page' && val === 1)) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, val);
      }
    });

    setSearchParams(nextParams, { replace: true });
  };

  // Contadores por categoría
  const categoryCounts = useMemo(() => {
    return {
      all: products.length,
      rippa: products.filter(p => (p.brand === 'RIPPA' || p.name.toLowerCase().includes('rippa'))).length,
      sany: products.filter(p => (p.brand === 'SANY' || p.name.toLowerCase().includes('sany'))).length,
      vendidas: products.filter(p => p.isSold).length,
    };
  }, [products]);

  // Lista de motores disponibles en el catálogo
  const availableEngines = useMemo(() => {
    return ['Kubota', 'Yanmar', 'Isuzu', 'Yoop'];
  }, []);

  // Filtrado y Ordenamiento
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // 1. Filtro de Categoría / Marca
    if (selectedCategory === 'vendidas') {
      result = result.filter(p => p.isSold);
    } else if (selectedCategory === 'rippa') {
      result = result.filter(p => p.brand === 'RIPPA' || p.name.toLowerCase().includes('rippa'));
    } else if (selectedCategory === 'sany') {
      result = result.filter(p => p.brand === 'SANY' || p.name.toLowerCase().includes('sany'));
    }

    // 2. Filtro de Estado / Disponibilidad
    if (selectedStatus === 'available') {
      result = result.filter(p => !p.isSold);
    } else if (selectedStatus === 'sold') {
      result = result.filter(p => p.isSold);
    }

    // 3. Filtro de Motor
    if (selectedEngine !== 'all') {
      const engLower = selectedEngine.toLowerCase();
      result = result.filter(p => {
        const text = `${p.name} ${p.description || ''}`.toLowerCase();
        return text.includes(engLower);
      });
    }

    // 4. Filtro de Tonelaje (con datos reales del catálogo: 0.75T a 7.3T)
    if (selectedTonnage !== 'all') {
      result = result.filter(p => {
        // Extraer número de tonelaje
        let tonNum = null;
        if (p.tonnage) {
          const match = p.tonnage.match(/([\d.,]+)/);
          if (match) tonNum = parseFloat(match[1].replace(',', '.'));
        }

        // Mapeo de respaldo por modelo si no viene especificado
        if (tonNum === null) {
          if (p.id === 'rippa-r06' || p.slug === 'rippa-r06') tonNum = 0.75;
          else if (p.id === 'rippa-r10-eco' || p.slug === 'rippa-r10-eco') tonNum = 1.0;
          else if (p.id === 'rippa-r15' || p.slug === 'rippa-r15') tonNum = 1.5;
          else if (p.id === 'rippa-r18' || p.slug === 'rippa-r18') tonNum = 1.8;
          else if (p.id === 'rippa-r22-pro' || p.slug === 'rippa-r22-pro') tonNum = 2.5;
          else if (p.id === 'sanny-sy35u' || p.slug === 'sanny-sy35u') tonNum = 3.8;
          else if (p.id === 'sanny-sy60c' || p.slug === 'sanny-sy60c') tonNum = 6.0;
          else if (p.id === 'sanny-sy75c' || p.slug === 'sanny-sy75c') tonNum = 7.3;
        }

        if (selectedTonnage === 'micro') {
          if (tonNum !== null) return tonNum < 1.0;
          return p.id === 'rippa-r06' || p.slug === 'rippa-r06';
        }
        if (selectedTonnage === 'compact') {
          if (tonNum !== null) return tonNum >= 1.0 && tonNum <= 2.0;
          return p.id === 'rippa-r10-eco' || p.id === 'rippa-r15' || p.id === 'rippa-r18' || p.slug === 'rippa-r10-eco' || p.slug === 'rippa-r15' || p.slug === 'rippa-r18';
        }
        if (selectedTonnage === 'medium') {
          if (tonNum !== null) return tonNum > 2.0 && tonNum < 5.0;
          return p.id === 'sanny-sy35u' || p.slug === 'sanny-sy35u' || p.id === 'rippa-r22-pro' || p.slug === 'rippa-r22-pro';
        }
        if (selectedTonnage === 'heavy') {
          if (tonNum !== null) return tonNum >= 5.0;
          return p.id === 'sanny-sy60c' || p.id === 'sanny-sy75c' || p.slug === 'sanny-sy60c' || p.slug === 'sanny-sy75c';
        }
        if (selectedTonnage === 'faena' || selectedTonnage === 'heavy_all') {
          if (tonNum !== null) return tonNum >= 3.0;
          return p.brand === 'SANY';
        }
        return true;
      });
    }

    // 5. Filtro de Búsqueda de Texto
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const matchesName = (p.name || '').toLowerCase().includes(query);
        const matchesDesc = (p.description || '').toLowerCase().includes(query);
        const matchesLocation = (p.location || '').toLowerCase().includes(query);
        const matchesCat = (p.categoryName || '').toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesLocation || matchesCat;
      });
    }

    // 6. Ordenamiento
    if (sortBy === 'price_asc' || sortBy === 'price_desc') {
      const extractPrice = (priceStr) => {
        if (!priceStr || priceStr === 'Consultar valor' || priceStr === 'VENDIDA') return null;
        const num = parseInt(priceStr.replace(/\D/g, ''), 10);
        return isNaN(num) ? null : num;
      };

      result.sort((a, b) => {
        const priceA = extractPrice(a.price);
        const priceB = extractPrice(b.price);

        if (priceA === null && priceB === null) return 0;
        if (priceA === null) return 1;
        if (priceB === null) return -1;

        return sortBy === 'price_asc' ? priceA - priceB : priceB - priceA;
      });
    } else if (sortBy === 'name_asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name_desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      // Orden oficial por defecto: Rippa con Rippa (por capacidad), Sany con Sany
      result.sort((a, b) => (Number(a.numberId) || 0) - (Number(b.numberId) || 0));
    }

    return result;
  }, [products, selectedCategory, selectedStatus, selectedEngine, selectedTonnage, searchQuery, sortBy]);

  // Paginación
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage) || 1;
  const validCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  const startIndex = (validCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredAndSortedProducts.length);
  const currentItems = filteredAndSortedProducts.slice(startIndex, endIndex);

  // Manejadores de cambios
  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
    updateParams({ category: catId, page: 1 });
    scrollToCatalogTop();
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
    updateParams({ q: val, page: 1 });
  };

  const handleEngineChange = (val) => {
    setSelectedEngine(val);
    setCurrentPage(1);
    updateParams({ engine: val, page: 1 });
    scrollToCatalogTop();
  };

  const handleStatusChange = (val) => {
    setSelectedStatus(val);
    setCurrentPage(1);
    updateParams({ status: val, page: 1 });
    scrollToCatalogTop();
  };

  const handleTonnageChange = (val) => {
    setSelectedTonnage(val);
    setCurrentPage(1);
    updateParams({ tonnage: val, page: 1 });
    scrollToCatalogTop();
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    updateParams({ sort: val });
  };

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      updateParams({ page: pageNum });
      scrollToCatalogTop();
    }
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedEngine('all');
    setSelectedStatus('all');
    setSelectedTonnage('all');
    setSortBy('default');
    setCurrentPage(1);
    setSearchParams({}, { replace: true });
    scrollToCatalogTop();
  };

  const scrollToCatalogTop = () => {
    if (catalogTopRef.current) {
      const yOffset = -90;
      const element = catalogTopRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Comprobar si hay algún filtro activo
  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedEngine !== 'all' || 
    selectedStatus !== 'all' || 
    selectedTonnage !== 'all' || 
    searchQuery.trim().length > 0 || 
    sortBy !== 'default';

  return (
    <div className="min-h-screen bg-slate-50 w-full max-w-full overflow-x-hidden">
      
      {/* 1. Header Hero Limpio del Catálogo */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-[#FE8003] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-bold">Catálogo de Maquinarias Nuevas y Semi Nuevas</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="antek-dashes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase text-slate-900 tracking-tight">
                Venta de Maquinaria Nueva y Semi Nueva
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Venta de maquinaria nueva y semi nueva: mini excavadoras, excavadoras de alto rendimiento, implementos y camiones disponibles para entrega inmediata. Fichas técnicas oficiales, asesoría y despacho a todo Chile.
              </p>
            </div>

            {/* Badges de Confianza Rápidos */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FE8003] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {products.length} Equipos Registrados
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Entrega Inmediata
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sección Principal: Filtrador + Grilla de Equipos + Paginación */}
      <section ref={catalogTopRef} className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* CAJA DEL FILTRADOR LIMPIO */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-5">
            
            {/* Fila Superior: Buscador y Pestañas de Categoría */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              
              {/* Buscador Rápido con Icono */}
              <div className="relative flex-1 max-w-xl">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Buscar por modelo, marca o motor (ej. Kubota, Yanmar, RIPPA, SANY, 1.8T)..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#FE8003] focus:bg-white transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    title="Borrar búsqueda"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Selector de Ordenamiento */}
              <div className="flex items-center gap-2 shrink-0">
                <ArrowUpDown className="w-4 h-4 text-slate-500 shrink-0 hidden sm:block" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider hidden sm:block">
                  Ordenar:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#FE8003] cursor-pointer"
                >
                  <option value="default">Destacados / Recientes</option>
                  <option value="price_asc">Menor Precio</option>
                  <option value="price_desc">Mayor Precio</option>
                  <option value="name_asc">Nombre: A a la Z</option>
                  <option value="name_desc">Nombre: Z a la A</option>
                </select>
              </div>
            </div>

            {/* Pestañas de Categoría (Pill Buttons) */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { id: 'all', label: 'Todos los Equipos', count: categoryCounts.all },
                  { id: 'rippa', label: 'Línea RIPPA', count: categoryCounts.rippa },
                  { id: 'sany', label: 'Línea SANY', count: categoryCounts.sany },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`shrink-0 px-4 py-2 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-transparent'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                      selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filtros Secundarios Limpios (Motor, Tonelaje, Disponibilidad) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
              
              {/* Filtro de Motor */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Marca de Motor
                </label>
                <select
                  value={selectedEngine}
                  onChange={(e) => handleEngineChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold text-slate-800 focus:outline-none focus:border-[#FE8003] cursor-pointer"
                >
                  <option value="all">Todos los motores</option>
                  {availableEngines.map(eng => (
                    <option key={eng} value={eng}>Motor {eng}</option>
                  ))}
                </select>
              </div>

              {/* Filtro de Tonelaje */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Capacidad / Tonelaje
                </label>
                <select
                  value={selectedTonnage}
                  onChange={(e) => handleTonnageChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold text-slate-800 focus:outline-none focus:border-[#FE8003] cursor-pointer"
                >
                  <option value="all">Todas las capacidades (desde 0.6 ton hasta 8 ton)</option>
                  <option value="micro">Ultra Compactas (&lt; 1.0 Ton)</option>
                  <option value="compact">Compactas (1.0 Ton - 1.8 Ton)</option>
                  <option value="medium">Medianas con Cabina (3.5 Ton - 4.0 Ton)</option>
                  <option value="heavy">Faena Pesada (6.0 Ton - 7.5 Ton)</option>
                </select>
              </div>

              {/* Filtro de Disponibilidad */}
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Disponibilidad
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold text-slate-800 focus:outline-none focus:border-[#FE8003] cursor-pointer"
                >
                  <option value="all">Todos los estados</option>
                  <option value="available">Solo Equipos Disponibles</option>
                  <option value="sold">Equipos Vendidos / Entregados</option>
                </select>
              </div>
            </div>

            {/* Barra de Filtros Activos & Botón Limpiar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
                    Filtros activos:
                  </span>

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-orange-100 text-orange-800 text-xs font-semibold">
                      Búsqueda: "{searchQuery}"
                      <button onClick={() => handleSearchChange('')} className="hover:text-orange-950">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-xs font-semibold">
                      Categoría: {selectedCategory}
                      <button onClick={() => handleCategoryChange('all')} className="hover:text-slate-950">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedEngine !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-xs font-semibold">
                      Motor: {selectedEngine}
                      <button onClick={() => handleEngineChange('all')} className="hover:text-slate-950">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedTonnage !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-xs font-semibold">
                      Tonelaje: {
                        selectedTonnage === 'micro' ? 'Ultra Compactas (< 1.0T)' :
                        selectedTonnage === 'compact' ? 'Compactas (1.0T - 1.8T)' :
                        selectedTonnage === 'medium' ? 'Medianas (3.5T - 4.0T)' :
                        selectedTonnage === 'heavy' ? 'Faena Pesada (6.0T - 7.5T)' :
                        selectedTonnage === 'faena' ? 'Faena y Cabina (3.5T - 7.5T)' :
                        selectedTonnage
                      }
                      <button onClick={() => handleTonnageChange('all')} className="hover:text-slate-950">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {selectedStatus !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-xs font-semibold">
                      Estado: {selectedStatus === 'available' ? 'Disponibles' : 'Vendidas'}
                      <button onClick={() => handleStatusChange('all')} className="hover:text-slate-950">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>

                <button
                  onClick={handleClearAllFilters}
                  className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Limpiar todos los filtros</span>
                </button>
              </div>
            )}
          </div>

          {/* Resumen de Resultados */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 px-1">
            <div>
              Mostrando <strong className="text-slate-900">{filteredAndSortedProducts.length}</strong> maquinarias encontradas
              {hasActiveFilters && <span> con los filtros aplicados</span>}
            </div>

            {filteredAndSortedProducts.length > 0 && (
              <div className="text-slate-400">
                Página <strong className="text-slate-700">{validCurrentPage}</strong> de <strong className="text-slate-700">{totalPages}</strong>
              </div>
            )}
          </div>

          {/* 3. Cuadrícula de Productos */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-[#FE8003] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cargando catálogo...</p>
            </div>
          ) : currentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
              {currentItems.map((product) => (
                <MinimalProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 sm:p-16 text-center max-w-lg mx-auto space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-orange-50 text-[#FE8003] flex items-center justify-center mx-auto">
                <Filter className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-black text-lg sm:text-xl uppercase text-slate-900">
                No se encontraron equipos
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                No hay maquinarias que coincidan con los filtros seleccionados o el término de búsqueda. Intenta con otra palabra clave o restablece los filtros.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleClearAllFilters}
                  className="px-6 py-3 bg-slate-900 hover:bg-[#FE8003] text-white text-xs font-heading font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Restablecer todos los filtros
                </button>
              </div>
            </div>
          )}

          {/* 4. Paginación Completa y Limpia */}
          {totalPages > 1 && (
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Información de rango actual */}
              <div className="text-xs text-slate-500">
                Mostrando <span className="font-bold text-slate-900">{startIndex + 1}</span> a{' '}
                <span className="font-bold text-slate-900">{endIndex}</span> de{' '}
                <span className="font-bold text-slate-900">{filteredAndSortedProducts.length}</span> equipos
              </div>

              {/* Botones de Paginación */}
              <div className="flex items-center gap-1.5">
                
                {/* Primera Página */}
                {validCurrentPage > 2 && (
                  <button
                    onClick={() => handlePageChange(1)}
                    className="p-2 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Primera Página"
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </button>
                )}

                {/* Anterior */}
                <button
                  onClick={() => handlePageChange(validCurrentPage - 1)}
                  disabled={validCurrentPage === 1}
                  className="p-2 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Página Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Números de Página con Elipsis Inteligente */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(num => {
                    // Mostrar siempre la primera, la última y las adyacentes a la actual
                    return (
                      num === 1 || 
                      num === totalPages || 
                      Math.abs(num - validCurrentPage) <= 2
                    );
                  })
                  .reduce((acc, num, idx, arr) => {
                    // Insertar puntos suspensivos si hay saltos
                    if (idx > 0 && num - arr[idx - 1] > 1) {
                      acc.push(-1);
                    }
                    acc.push(num);
                    return acc;
                  }, [])
                  .map((item, idx) => {
                    if (item === -1) {
                      return (
                        <span key={`ellipsis-${idx}`} className="px-2 text-slate-400 font-bold text-xs select-none">
                          ...
                        </span>
                      );
                    }
                    return (
                      <button
                        key={item}
                        onClick={() => handlePageChange(item)}
                        className={`w-9 h-9 rounded text-xs font-heading font-bold transition-all cursor-pointer ${
                          validCurrentPage === item
                            ? 'bg-[#FE8003] text-white shadow-sm ring-2 ring-orange-200'
                            : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}

                {/* Siguiente */}
                <button
                  onClick={() => handlePageChange(validCurrentPage + 1)}
                  disabled={validCurrentPage === totalPages}
                  className="p-2 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Página Siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Última Página */}
                {validCurrentPage < totalPages - 1 && (
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="p-2 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                    title="Última Página"
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Banner Implementos CTA */}
          <div className="bg-white border border-slate-200 rounded-[2px] p-6 sm:p-8 text-[#222222] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[11px] font-heading font-extrabold uppercase tracking-widest text-[#FE8003] block">
                Accesorios para Mini Excavadoras
              </span>
              <h3 className="font-heading font-black text-xl sm:text-2xl uppercase text-[#222222]">
                ¿Buscas Implementos para tu Mini Excavadora?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Revisa nuestra galería de implementos y accesorios disponibles para cotización y entrega.
              </p>
            </div>

            <Link
              to="/implementos"
              className="btn-antek btn-antek-primary text-xs py-3.5 px-6 shrink-0"
            >
              <span>Ver Catálogo de Implementos</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 5. Banner de Contacto y Asesoría Técnica al pie del catálogo */}
          <div className="bg-[#1e1e1e] rounded-xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-heading font-black text-lg sm:text-xl uppercase text-white">
                ¿No encuentras el modelo o implemento que necesitas?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Gestionamos importaciones a pedido directo de Japón y fábricas oficiales RIPPA con inducción técnica y garantía.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`https://wa.me/${companyData.whatsappNumber}?text=Hola%20RST,%20busco%20un%20equipo%20específico%20que%20no%20encontré%20en%20el%20catálogo.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#FE8003] hover:bg-[#e57302] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar por WhatsApp</span>
              </a>

              <a
                href={`tel:${companyData.phoneRaw}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4 text-[#FE8003]" />
                <span>Llamar a Ventas</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
