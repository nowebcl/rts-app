import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  LogOut, 
  Plus, 
  Search, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  Box, 
  Eye, 
  Check, 
  Upload, 
  Image as ImageIcon, 
  Loader2, 
  Sparkles,
  ArrowLeft,
  FileText,
  AlertCircle,
  CheckCircle2,
  X,
  Filter,
  RefreshCw,
  Layers,
  Wrench,
  Download,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { productService } from '../services/productService';
import { compressMultipleImages } from '../utils/imageCompressor';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { id: urlEditId } = useParams();

  // Estados del listado
  const [products, setProducts] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Estado del Editor de Página Completa
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [saveErrorMsg, setSaveErrorMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Estados de imágenes y compresión WebP
  const [existingGallery, setExistingGallery] = useState([]);
  const [newWebpFiles, setNewWebpFiles] = useState([]);
  const [compressing, setCompressing] = useState(false);
  const [compressionLogs, setCompressionLogs] = useState([]);

  // Estado de PDF
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const [currentPdfUrl, setCurrentPdfUrl] = useState('');

  // Formulario de Ficha Técnica
  const [formData, setFormData] = useState({
    id: '',
    recordId: '',
    name: '',
    slug: '',
    category: 'excavadoras',
    categoryName: 'Mini Excavadoras',
    brand: 'RIPPA',
    tonnage: '1.0 Ton',
    price: 'Consultar valor',
    isSold: false,
    description: '',
    location: 'Entrega con inducción en terreno a todo Chile',
    warranty: '1 año de garantía componentes esenciales (Motor y Bomba)',
    commonBenefits: [
      "De regalo acople rápido, dedo pulgar hidráulico, kit primera mantención gratis",
      "1 año de garantía componentes esenciales",
      "Certificación Euro 5, EPA, CE"
    ]
  });

  // Cargar lista de productos
  const loadData = async () => {
    setLoadingList(true);
    try {
      const list = await productService.getAll();
      setProducts(list);
    } catch (e) {
      console.error('Error cargando catálogo:', e);
    } finally {
      setLoadingList(false);
    }
  };

  // Verificar autenticación
  useEffect(() => {
    if (!productService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadData();
    window.addEventListener('rst_catalog_updated', loadData);
    return () => window.removeEventListener('rst_catalog_updated', loadData);
  }, [navigate]);

  // Manejar URL si se accede a /admin/editar/:id
  useEffect(() => {
    if (urlEditId && products.length > 0) {
      handleOpenEditor(urlEditId);
    }
  }, [urlEditId, products.length]);

  // Abrir editor de página completa
  const handleOpenEditor = (targetId = null) => {
    setSaveSuccessMsg('');
    setSaveErrorMsg('');
    setNewWebpFiles([]);
    setCompressionLogs([]);
    setSelectedPdfFile(null);

    if (targetId) {
      const item = products.find(p => p.id === targetId || p.slug === targetId || p.recordId === targetId);
      if (item) {
        setEditingId(item.id);
        setFormData({
          id: item.id || '',
          recordId: item.recordId || '',
          name: item.name || '',
          slug: item.slug || '',
          category: item.category || 'excavadoras',
          categoryName: item.categoryName || 'Mini Excavadoras',
          brand: item.brand || (item.name?.toLowerCase().includes('sany') ? 'SANY' : 'RIPPA'),
          tonnage: item.tonnage || '',
          price: item.price || 'Consultar valor',
          isSold: Boolean(item.isSold),
          description: item.description || '',
          location: item.location || 'Entrega con inducción en terreno a todo Chile',
          warranty: item.warranty || '1 año de garantía componentes esenciales (Motor y Bomba)',
          commonBenefits: Array.isArray(item.commonBenefits) ? item.commonBenefits : [
            "De regalo acople rápido, dedo pulgar hidráulico, kit primera mantención gratis",
            "1 año de garantía componentes esenciales",
            "Certificación Euro 5, EPA, CE"
          ]
        });
        setExistingGallery(Array.isArray(item.gallery) ? [...item.gallery] : (item.image ? [item.image] : []));
        setCurrentPdfUrl(item.pdfUrl || '');
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    // Modo nuevo producto
    setEditingId(null);
    setFormData({
      id: '',
      recordId: '',
      name: '',
      slug: '',
      category: 'excavadoras',
      categoryName: 'Mini Excavadoras',
      brand: 'RIPPA',
      tonnage: '1.0 Ton',
      price: 'Consultar valor',
      isSold: false,
      description: '',
      location: 'Entrega con inducción en terreno a todo Chile',
      warranty: '1 año de garantía componentes esenciales (Motor y Bomba)',
      commonBenefits: [
        "De regalo acople rápido, dedo pulgar hidráulico, kit primera mantención gratis",
        "1 año de garantía componentes esenciales",
        "Certificación Euro 5, EPA, CE"
      ]
    });
    setExistingGallery([]);
    setCurrentPdfUrl('');
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cerrar editor y volver al listado
  const handleCloseEditor = () => {
    setIsEditing(false);
    setEditingId(null);
    setSaveSuccessMsg('');
    setSaveErrorMsg('');
    if (urlEditId) {
      navigate('/admin');
    }
  };

  // Logout
  const handleLogout = () => {
    productService.logout();
    navigate('/admin/login');
  };

  // Toggle rápido de Vendido / Disponible desde las tarjetas
  const handleToggleSold = async (id, e) => {
    e?.stopPropagation();
    await productService.toggleSold(id);
    await loadData();
  };

  // Eliminar producto
  const handleDelete = async (id, name, e) => {
    e?.stopPropagation();
    if (window.confirm(`¿Estás seguro de que deseas eliminar permanentemente "${name}" del catálogo?`)) {
      await productService.delete(id);
      await loadData();
      if (isEditing && editingId === id) {
        handleCloseEditor();
      }
    }
  };

  // Subir y comprimir múltiples imágenes a WebP
  const handleImageFilesSelected = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setCompressing(true);
    setCompressionLogs([]);

    try {
      const compressedList = await compressMultipleImages(files, 1400, 0.78, (done, total, res) => {
        setCompressionLogs(prev => [
          ...prev, 
          `${res.fileName}: ${res.originalSizeKb} KB → ${res.sizeKb} KB WebP (-${res.reductionPercent}%)`
        ]);
      });

      setNewWebpFiles(prev => [...prev, ...compressedList]);
    } catch (err) {
      alert('Error al comprimir imágenes: ' + err.message);
    } finally {
      setCompressing(false);
      // Reset input
      e.target.value = '';
    }
  };

  // Remover foto existente
  const handleRemoveExistingPhoto = (indexToRemove) => {
    setExistingGallery(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Remover foto nueva comprimida
  const handleRemoveNewPhoto = (indexToRemove) => {
    setNewWebpFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Manejar selección de archivo PDF
  const handlePdfFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        alert('Por favor selecciona un archivo con formato .PDF');
        return;
      }
      setSelectedPdfFile(file);
    }
  };

  // Guardar ficha completa
  const handleSaveFicha = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('El nombre del modelo es obligatorio.');
      return;
    }

    setIsSaving(true);
    setSaveSuccessMsg('');
    setSaveErrorMsg('');

    try {
      // 1. Preparar lista de archivos WebP nuevos a subir
      const rawWebpFiles = newWebpFiles.map(item => item.file);

      // 2. Preparar galería combinada
      // Las fotos locales/existentes se mantienen
      const combinedGallery = [...existingGallery];
      newWebpFiles.forEach(item => {
        combinedGallery.push(item.dataUrl);
      });

      const payload = {
        ...formData,
        image: combinedGallery[0] || formData.image || '',
        gallery: combinedGallery,
        pdfUrl: currentPdfUrl
      };

      const result = await productService.save(payload, rawWebpFiles, selectedPdfFile);

      if (result.success) {
        setSaveSuccessMsg(result.message || '¡Ficha guardada exitosamente!');
        // Limpiar archivos nuevos ya que se integraron
        setNewWebpFiles([]);
        setSelectedPdfFile(null);
        await loadData();

        // Si fue una actualización, mantener la galería actualizada en la vista
        if (result.remoteSaved) {
          // Dar aviso de éxito claro
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 100);
        }
      } else {
        setSaveErrorMsg('No se pudo guardar la ficha. Verifique la conexión.');
      }
    } catch (err) {
      console.error('Error al guardar:', err);
      setSaveErrorMsg('Error inesperado al guardar: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Filtrado de productos para el listado móvil y de escritorio
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tonnage && p.tonnage.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.price && p.price.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'stock' && !p.isSold) || 
        (statusFilter === 'sold' && p.isSold);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, categoryFilter, statusFilter]);

  // Contadores de resumen
  const stats = useMemo(() => {
    const total = products.length;
    const available = products.filter(p => !p.isSold).length;
    const sold = products.filter(p => p.isSold).length;
    return { total, available, sold };
  }, [products]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-orange-500 selection:text-white">

      {/* 1. TOP NAVBAR MINIMALISTA BLANCO */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/brand/rst_logo_official.png"
                alt="RST Logo"
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/brand/logo_main.png';
                }}
              />
            </Link>
            <div className="hidden sm:block h-5 w-px bg-slate-200" />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-heading font-black uppercase text-slate-900 tracking-wider">
                Panel de Administración
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Catálogo Oficial RST Importaciones
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Ver Sitio Web</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-xs font-bold text-slate-600 transition-colors cursor-pointer"
              title="Cerrar Sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. VISTA A: PÁGINA COMPLETA DE EDICIÓN DE FICHA           */}
      {/* ========================================================= */}
      {isEditing ? (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

          {/* Barra superior de navegación del editor */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCloseEditor}
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer shadow-xs"
                title="Volver al Catálogo"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="text-left">
                <span className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-[#FE8003]">
                  {editingId ? 'Editar Maquinaria Existente' : 'Nuevo Ingreso al Catálogo'}
                </span>
                <h1 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 leading-tight">
                  {formData.name || 'Nueva Ficha Técnica'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleCloseEditor}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveFicha}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FE8003] hover:bg-orange-600 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando en BD...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Guardar Ficha</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Notificaciones de Éxito o Error */}
          {saveSuccessMsg && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3 shadow-xs text-left animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">{saveSuccessMsg}</div>
                <div className="text-xs text-emerald-700 mt-0.5">
                  Los cambios han sido aplicados y son visibles de inmediato en el catálogo web.
                </div>
              </div>
            </div>
          )}

          {saveErrorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3 shadow-xs text-left">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Aviso del Sistema</div>
                <div className="text-xs text-red-700 mt-0.5">{saveErrorMsg}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSaveFicha} className="space-y-8 text-left">

            {/* SECCIÓN 1: DATOS COMERCIALES */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-heading font-bold uppercase text-slate-900 tracking-wide flex items-center gap-2">
                  <Box className="w-4 h-4 text-[#FE8003]" />
                  <span>1. Identificación y Estado Comercial</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Nombre visible para los clientes, categoría y disponibilidad inmediata.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* Nombre */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold uppercase text-slate-700 mb-1.5">
                    Nombre del Modelo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Modelo Rippa R18 Kubota"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#FE8003] focus:outline-none transition-colors"
                  />
                </div>

                {/* Marca */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase text-slate-700 mb-1.5">
                    Marca Oficial
                  </label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#FE8003] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="RIPPA">RIPPA</option>
                    <option value="SANY">SANY</option>
                    <option value="SANNY">SANNY</option>
                    <option value="OTRA">Otra Maquinaria</option>
                  </select>
                </div>

                {/* Categoría de Tonelaje */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase text-slate-700 mb-1.5">
                    Rango de Tonelaje
                  </label>
                  <input
                    type="text"
                    value={formData.tonnage}
                    onChange={(e) => setFormData({ ...formData, tonnage: e.target.value })}
                    placeholder="Ej. 1.8 Ton, 3.86 Ton, 6.0 Ton..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#FE8003] focus:outline-none transition-colors"
                  />
                </div>

                {/* Precio */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase text-slate-700 mb-1.5">
                    Precio o Valor Referencial
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Ej. $12.990.000 + IVA o Consultar valor"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#FE8003] focus:outline-none transition-colors"
                  />
                </div>

                {/* Estado Vendido / En Stock (Switch Grande Táctil) */}
                <div>
                  <label className="block text-xs font-heading font-bold uppercase text-slate-700 mb-1.5">
                    Estado de Inventario
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isSold: !formData.isSold })}
                    className={`w-full py-2.5 px-4 rounded-xl border text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer transition-all ${
                      formData.isSold
                        ? 'bg-slate-100 border-slate-300 text-slate-600'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-xs'
                    }`}
                  >
                    <span>{formData.isSold ? '⛔ Marcada como VENDIDA' : '✅ DISPONIBLE EN STOCK'}</span>
                    <span className={`w-3 h-3 rounded-full ${formData.isSold ? 'bg-slate-400' : 'bg-emerald-500 animate-pulse'}`} />
                  </button>
                </div>

              </div>
            </div>

            {/* SECCIÓN 2: GALERÍA DE IMÁGENES MULTI-UPLOAD Y COMPRESIÓN WEBP */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-heading font-bold uppercase text-slate-900 tracking-wide flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#FE8003]" />
                    <span>2. Galería de Imágenes (Multi-Foto & Optimización WebP)</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Las fotos se comprimen automáticamente en el navegador a <strong>formato WebP en muy bajo peso</strong> (&lt; 90 KB) para que la web cargue instantáneamente en teléfonos móviles.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-400 self-start sm:self-auto bg-slate-100 px-2.5 py-1 rounded-lg">
                  Total fotos: {existingGallery.length + newWebpFiles.length}
                </span>
              </div>

              {/* Botón de subida múltiple con Drag & Drop visual */}
              <div className="relative border-2 border-dashed border-slate-300 hover:border-[#FE8003] bg-slate-50/70 rounded-2xl p-6 text-center transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageFilesSelected}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="space-y-2 pointer-events-none">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 text-[#FE8003] mx-auto flex items-center justify-center shadow-xs">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-heading font-bold text-slate-800">
                      Toca o arrastra varias fotos a la vez aquí
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Soporta JPG, PNG, WEBP de alta resolución. Se convierten en baja automáticamente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reporte de Compresión en Vivo */}
              {compressing && (
                <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 flex items-center gap-3 text-xs text-orange-900 font-medium">
                  <Loader2 className="w-4 h-4 animate-spin text-[#FE8003]" />
                  <span>Comprimiendo y convirtiendo imágenes a WebP ultraligero...</span>
                </div>
              )}

              {compressionLogs.length > 0 && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FE8003]" />
                    <span>Compresión Automática WebP realizada con éxito:</span>
                  </div>
                  {compressionLogs.map((log, idx) => (
                    <div key={idx} className="font-mono text-emerald-700 font-medium">
                      ✓ {log}
                    </div>
                  ))}
                </div>
              )}

              {/* Grid de Fotos Existentes y Nuevas */}
              {(existingGallery.length > 0 || newWebpFiles.length > 0) && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-heading font-bold uppercase text-slate-700 block">
                    Fotos de la Ficha (La primera será la foto de portada):
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                    
                    {/* Fotos Existentes */}
                    {existingGallery.map((imgUrl, idx) => (
                      <div 
                        key={`exist-${idx}`} 
                        className="group relative aspect-4/3 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-xs"
                      >
                        <img 
                          src={imgUrl} 
                          alt={`Foto ${idx + 1}`} 
                          className="w-full h-full object-contain p-1"
                        />
                        {idx === 0 && (
                          <span className="absolute top-1.5 left-1.5 bg-[#FE8003] text-white text-[9px] font-heading font-bold uppercase px-1.5 py-0.5 rounded shadow-xs">
                            Portada
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingPhoto(idx)}
                          className="absolute top-1.5 right-1.5 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-opacity cursor-pointer"
                          title="Eliminar esta foto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* Nuevas Fotos Comprimidas */}
                    {newWebpFiles.map((item, idx) => (
                      <div 
                        key={`new-${idx}`} 
                        className="group relative aspect-4/3 bg-emerald-50 rounded-xl overflow-hidden border-2 border-emerald-400 shadow-xs"
                      >
                        <img 
                          src={item.dataUrl} 
                          alt={item.fileName} 
                          className="w-full h-full object-contain p-1"
                        />
                        <span className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[9px] font-heading font-bold uppercase px-1.5 py-0.5 rounded shadow-xs">
                          {item.sizeKb} KB
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveNewPhoto(idx)}
                          className="absolute top-1.5 right-1.5 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-opacity cursor-pointer"
                          title="Quitar foto nueva"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN 3: SUBIDA DE FICHA TÉCNICA EN PDF */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-heading font-bold uppercase text-slate-900 tracking-wide flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FE8003]" />
                  <span>3. Ficha Técnica Oficial y Manual (PDF)</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Permite a los clientes descargar el manual oficial en PDF desde la página del producto.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
                
                {/* Zona de subida de PDF */}
                <div className="relative border-2 border-dashed border-slate-300 hover:border-[#FE8003] bg-slate-50 rounded-2xl p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handlePdfFileSelected}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="space-y-2 pointer-events-none">
                    <FileText className="w-8 h-8 text-[#FE8003] mx-auto" />
                    <div className="text-xs font-heading font-bold text-slate-800">
                      {selectedPdfFile ? selectedPdfFile.name : 'Seleccionar nuevo archivo PDF'}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {selectedPdfFile ? `${(selectedPdfFile.size / 1024 / 1024).toFixed(2)} MB listo para subir` : 'Haz clic para adjuntar PDF'}
                    </p>
                  </div>
                </div>

                {/* Estado del PDF actual */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-heading font-bold uppercase text-slate-700">
                    PDF Actual en el Catálogo:
                  </div>

                  {currentPdfUrl ? (
                    <div className="space-y-3">
                      <div className="text-xs font-mono text-slate-600 truncate bg-white p-2.5 rounded-lg border border-slate-200">
                        {currentPdfUrl}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={currentPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Abrir / Descargar PDF</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setCurrentPdfUrl('')}
                          className="px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Eliminar PDF
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400 italic">
                      No hay ningún PDF asociado actualmente a este modelo.
                    </div>
                  )}

                  {selectedPdfFile && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium">
                      ✓ Nuevo PDF seleccionado: <strong>{selectedPdfFile.name}</strong>. Se subirá al guardar la ficha.
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* SECCIÓN 4: ESPECIFICACIONES TÉCNICAS Y DESCRIPCIÓN */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-base font-heading font-bold uppercase text-slate-900 tracking-wide flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#FE8003]" />
                  <span>4. Especificaciones Técnicas y Garantía</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Detalles mecánicos (motor Kubota/Yanmar, balde, fuerza) y política de garantía.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase text-slate-700 mb-1.5">
                    Descripción Técnica Completa
                  </label>
                  <textarea
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Especifique motor, cilindros, profundidad de excavación, balde, etc..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:bg-white focus:border-[#FE8003] focus:outline-none transition-colors font-mono leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading font-bold uppercase text-slate-700 mb-1.5">
                      Garantía Oficial
                    </label>
                    <input
                      type="text"
                      value={formData.warranty}
                      onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                      placeholder="1 año de garantía componentes esenciales (Motor y Bomba)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#FE8003] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-heading font-bold uppercase text-slate-700 mb-1.5">
                      Ubicación de Despacho e Inducción
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Entrega con inducción en terreno a todo Chile"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-[#FE8003] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÓN FLOTANTE O FINAL DE GUARDADO */}
            <div className="sticky bottom-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4 z-30">
              <div className="hidden sm:block text-xs text-slate-500">
                Asegúrate de revisar las fotos y precios antes de guardar.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleCloseEditor}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-600 cursor-pointer"
                >
                  Volver al Listado
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FE8003] hover:bg-orange-600 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Guardando Cambios...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Guardar Ficha Completa</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>

        </div>
      ) : (

        /* ========================================================= */
        /* 3. VISTA B: LISTADO MÓVIL Y DE ESCRITORIO (TARJETAS)      */
        /* ========================================================= */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

          {/* Header con resumen de inventario y botón Nuevo */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-heading font-black uppercase text-slate-900 tracking-wide">
                Catálogo de Maquinarias
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Administra fichas técnicas, disponibilidad en tiempo real y precios para la web.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => handleOpenEditor(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FE8003] hover:bg-orange-600 text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Nuevo Equipo</span>
              </button>
            </div>
          </div>

          {/* Tarjetas de Estadísticas Rápidas */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5 text-left">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="text-[10px] sm:text-xs font-heading font-bold uppercase text-slate-400">Total Catálogo</div>
              <div className="text-xl sm:text-2xl font-heading font-black text-slate-900 mt-1">{stats.total}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="text-[10px] sm:text-xs font-heading font-bold uppercase text-emerald-600">En Stock</div>
              <div className="text-xl sm:text-2xl font-heading font-black text-emerald-600 mt-1">{stats.available}</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="text-[10px] sm:text-xs font-heading font-bold uppercase text-slate-500">Vendidas</div>
              <div className="text-xl sm:text-2xl font-heading font-black text-slate-600 mt-1">{stats.sold}</div>
            </div>
          </div>

          {/* Barra de Filtros y Búsqueda adaptada a móvil */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-left">
            
            {/* Buscador */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por modelo, motor, tonelaje..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:bg-white focus:border-[#FE8003] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filtros de Categoría y Stock */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
              >
                <option value="all">Todos los estados</option>
                <option value="stock">Solo En Stock</option>
                <option value="sold">Solo Vendidas</option>
              </select>

              <button
                onClick={loadData}
                disabled={loadingList}
                className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 cursor-pointer transition-colors shrink-0"
                title="Actualizar datos desde la base de datos"
              >
                <RefreshCw className={`w-4 h-4 ${loadingList ? 'animate-spin text-[#FE8003]' : ''}`} />
              </button>
            </div>

          </div>

          {/* GRID RESPONSIVO DE CUADRADOS / TARJETAS (CERO SCROLL HORIZONTAL EN MÓVIL) */}
          {loadingList ? (
            <div className="py-20 text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#FE8003] mx-auto" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Cargando maquinaria desde la base de datos...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 bg-white border border-slate-200 rounded-2xl text-center p-8 space-y-3">
              <Box className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-heading font-bold text-slate-700 uppercase">
                No se encontraron modelos con los filtros actuales
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Prueba borrando el término de búsqueda o cambiando el filtro de estado.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 text-left">
              {filteredProducts.map((product) => {
                const coverImg = product.image || product.gallery?.[0] || '/brand/logo_main.png';
                const hasPdf = Boolean(product.pdfUrl);

                return (
                  <div
                    key={product.id || product.slug}
                    className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Contenedor Cuadrado de la Imagen */}
                      <div className="relative aspect-4/3 sm:aspect-square bg-slate-100 p-4 flex items-center justify-center overflow-hidden border-b border-slate-100">
                        <img
                          src={coverImg}
                          alt={product.name}
                          className={`w-full h-full object-contain transition-transform duration-300 ${
                            product.isSold ? 'grayscale contrast-75 opacity-80' : ''
                          }`}
                          loading="lazy"
                        />

                        {/* Badges superiores */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                          <span className={`text-[10px] font-heading font-black uppercase px-2 py-0.5 rounded shadow-xs ${
                            product.isSold 
                              ? 'bg-slate-800 text-white' 
                              : 'bg-emerald-600 text-white'
                          }`}>
                            {product.isSold ? 'VENDIDA' : 'EN STOCK'}
                          </span>
                        </div>

                        {product.tonnage && (
                          <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-heading font-bold uppercase px-2 py-0.5 rounded border border-slate-200 shadow-xs">
                            {product.tonnage}
                          </span>
                        )}

                        {hasPdf && (
                          <div className="absolute bottom-2.5 right-2.5 bg-slate-900/80 text-white text-[9px] font-heading font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1 shadow-xs">
                            <FileText className="w-2.5 h-2.5 text-[#FE8003]" />
                            <span>PDF</span>
                          </div>
                        )}
                      </div>

                      {/* Información de la Ficha */}
                      <div className="p-4 sm:p-5 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-heading font-bold uppercase text-[#FE8003] tracking-wider truncate">
                            {product.brand || 'RIPPA'} · {product.categoryName || 'Mini Excavadora'}
                          </span>
                          <span className="text-xs font-heading font-black text-slate-900 shrink-0">
                            {product.isSold ? 'VENDIDA' : product.price}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 leading-snug line-clamp-2">
                          {product.name}
                        </h3>

                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {product.description || 'Sin descripción técnica agregada.'}
                        </p>
                      </div>
                    </div>

                    {/* Acciones de la Tarjeta */}
                    <div className="p-4 pt-0 space-y-2.5">
                      
                      {/* Switch Rápido Disponible / Vendida */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleSold(product.id, e)}
                        className={`w-full py-2 px-3 rounded-xl border text-[11px] font-heading font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer transition-colors ${
                          product.isSold
                            ? 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                            : 'bg-emerald-50/60 border-emerald-200 text-emerald-800 hover:bg-emerald-100/60'
                        }`}
                        title="Toca para cambiar estado entre Disponible y Vendida"
                      >
                        <span>{product.isSold ? 'Cambiar a: Disponible' : 'Cambiar a: Vendida'}</span>
                        <span className={`w-2 h-2 rounded-full ${product.isSold ? 'bg-slate-400' : 'bg-emerald-500'}`} />
                      </button>

                      {/* Botón Principal: EDITAR FICHA COMPLETA (Abre la página completa de la ficha) */}
                      <div className="grid grid-cols-5 gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditor(product.id)}
                          className="col-span-4 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#FE8003]" />
                          <span>Editar Ficha</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDelete(product.id, product.name, e)}
                          className="col-span-1 inline-flex items-center justify-center p-2.5 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Eliminar del catálogo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
