import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LogOut, 
  Plus, 
  Search, 
  Download, 
  RotateCcw, 
  ExternalLink, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Edit3, 
  Tag, 
  Box, 
  Database,
  Eye,
  Check,
  Upload,
  Image as ImageIcon,
  Loader2,
  Sparkles
} from 'lucide-react';
import { productService } from '../services/productService';
import { compressAndConvertToWebP } from '../utils/imageCompressor';

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Estados de carga y compresión WebP
  const [selectedWebpFile, setSelectedWebpFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [compressingImage, setCompressingImage] = useState(false);
  const [compressionStats, setCompressionStats] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [manualUrlMode, setManualUrlMode] = useState(false);

  // Formulario nuevo producto
  const [formData, setFormData] = useState({
    name: '',
    category: 'excavadoras',
    categoryName: 'Mini Excavadoras',
    price: 'Consultar valor',
    description: '',
    image: '',
    isSold: false
  });

  const loadData = async () => {
    const list = await productService.getAll();
    setProducts(list);
  };

  useEffect(() => {
    if (!productService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadData();
    window.addEventListener('rst_catalog_updated', loadData);
    return () => window.removeEventListener('rst_catalog_updated', loadData);
  }, [navigate]);

  const handleLogout = () => {
    productService.logout();
    navigate('/admin/login');
  };

  const handleToggleSold = async (id) => {
    await productService.toggleSold(id);
    await loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto del catálogo?')) {
      await productService.delete(id);
      await loadData();
    }
  };

  const handleReset = async () => {
    if (window.confirm('¿Restablecer el catálogo completo a los 6 modelos oficiales?')) {
      await productService.resetToDefaults();
      await loadData();
    }
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(products, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `catalogo_rst_exportado_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Manejador de selección de imagen con compresión automática a WebP
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCompressingImage(true);
      setCompressionStats(null);
      const originalSizeKb = (file.size / 1024).toFixed(1);

      // Compresión client-side en canvas a formato WebP optimizado
      const result = await compressAndConvertToWebP(file, 1600, 0.82);
      setSelectedWebpFile(result.file);
      setImagePreview(result.dataUrl);
      setFormData(prev => ({ ...prev, image: result.dataUrl }));
      setCompressionStats({
        originalKb: originalSizeKb,
        webpKb: result.sizeKb,
        savings: Math.max(0, Math.round((1 - (result.file.size / file.size)) * 100))
      });
    } catch (err) {
      console.error(err);
      alert('Error al optimizar imagen: ' + err.message);
    } finally {
      setCompressingImage(false);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSaving(true);
    try {
      const catNames = {
        excavadoras: 'Mini Excavadoras',
        tractores: 'Tractores',
        implementos: 'Implementos y Motores',
        camiones: 'Camiones'
      };

      const toSave = {
        ...formData,
        categoryName: catNames[formData.category] || 'Maquinaria',
        id: editingProduct ? editingProduct.id : undefined,
        recordId: editingProduct?.recordId,
        gallery: formData.image ? [formData.image] : ['/images/excavators/rst-10.jpg'],
        image: formData.image || '/images/excavators/rst-10.jpg',
        location: 'Puerto Montt / Llanquihue, Región de Los Lagos'
      };

      await productService.save(toSave, selectedWebpFile);
      setIsAddModalOpen(false);
      setEditingProduct(null);
      setSelectedWebpFile(null);
      setImagePreview('');
      setCompressionStats(null);
      setFormData({
        name: '',
        category: 'excavadoras',
        categoryName: 'Mini Excavadoras',
        price: 'Consultar valor',
        description: '',
        image: '',
        isSold: false
      });
      await loadData();
    } catch (err) {
      console.error(err);
      alert('Error al guardar producto: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const openNewModal = () => {
    setEditingProduct(null);
    setSelectedWebpFile(null);
    setImagePreview('');
    setCompressionStats(null);
    setManualUrlMode(false);
    setFormData({
      name: '',
      category: 'excavadoras',
      categoryName: 'Mini Excavadoras',
      price: 'Consultar valor',
      description: '',
      image: '',
      isSold: false
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setSelectedWebpFile(null);
    setImagePreview(p.image || '');
    setCompressionStats(null);
    setManualUrlMode(false);
    setFormData({
      name: p.name,
      category: p.category,
      categoryName: p.categoryName,
      price: p.price,
      description: p.description,
      image: p.image,
      isSold: p.isSold
    });
    setIsAddModalOpen(true);
  };

  // Filtrado
  const filtered = products.filter(p => {
    if (selectedCategory === 'vendidas') {
      if (!p.isSold) return false;
    } else if (selectedCategory !== 'all') {
      if (p.category !== selectedCategory) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !(p.description || '').toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const totalSold = products.filter(p => p.isSold).length;
  const totalAvailable = products.length - totalSold;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      
      {/* 1. Barra Superior del Panel Admin */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/brand/rst_logo_official.png"
              alt="Logo RST"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/brand/logo_main.png';
              }}
            />
            <div className="border-l border-slate-800 pl-3">
              <h1 className="text-sm font-heading font-black uppercase text-white tracking-wider">
                Panel de Administración RST
              </h1>
              <p className="text-[10px] text-emerald-400 font-mono">
                Base de Datos Local · Listo para Backend API
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver Web Pública</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white text-xs font-bold transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* 2. Tarjetas de Resumen y Acciones Rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-400">Total Maquinarias</span>
              <Box className="w-4 h-4 text-orange-400" />
            </div>
            <div className="text-3xl font-heading font-black text-white mt-2">
              {products.length}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Registradas en el catálogo</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-400">Disponibles</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-heading font-black text-emerald-400 mt-2">
              {totalAvailable}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Listas para venta y cotización</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-400">Vendidas</span>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-3xl font-heading font-black text-red-400 mt-2">
              {totalSold}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Con filtro y lienzo de Vendida</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-400">Exportar Datos</span>
              <Database className="w-4 h-4 text-blue-400" />
            </div>
            <button
              onClick={handleExportJSON}
              className="w-full mt-3 inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar JSON Base de Datos</span>
            </button>
          </div>
        </div>

        {/* 3. Barra de Control: Búsqueda, Filtros y Botón Agregar */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Buscador */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Filtro Pestañas */}
          <div className="flex items-center flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Todos los Equipos' },
              { id: 'excavadoras', label: 'Excavadoras' },
              { id: 'vendidas', label: 'Vendidas' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-950 text-slate-300 hover:bg-slate-700 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center gap-2">
            <button
              onClick={openNewModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Equipo</span>
            </button>

            <button
              onClick={handleReset}
              title="Restablecer catálogo a los 6 modelos oficiales"
              className="p-2 bg-slate-950 border border-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4. Tabla de Gestión de Productos */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-heading text-[10px] tracking-wider border-b border-slate-700">
                <tr>
                  <th className="py-3 px-4">Equipo</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4">Precio Actual</th>
                  <th className="py-3 px-4 text-center">Estado (Vendida)</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-slate-700/30 transition-colors">
                    {/* Foto y Nombre */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded overflow-hidden bg-slate-950 shrink-0 border border-slate-700">
                          <img
                            src={p.image}
                            alt={p.name}
                            className={`w-full h-full object-cover ${p.isSold ? 'grayscale' : ''}`}
                          />
                          {p.isSold && (
                            <span className="absolute inset-0 bg-red-600/80 text-[8px] font-black text-white flex items-center justify-center">
                              VENDIDA
                            </span>
                          )}
                        </div>
                        <div className="max-w-md">
                          <span className="font-bold text-white text-xs block truncate">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-slate-400 truncate block mt-0.5">
                            {p.description ? p.description.slice(0, 75) + '...' : 'Consultar más información'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Categoría */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 font-mono text-[10px] border border-slate-700">
                        {p.categoryName}
                      </span>
                    </td>

                    {/* Precio */}
                    <td className="py-3 px-4 font-bold text-white">
                      {p.price}
                    </td>

                    {/* Toggle Vendida */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleSold(p.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all ${
                          p.isSold
                            ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                        }`}
                      >
                        {p.isSold ? 'VENDIDA' : 'DISPONIBLE'}
                      </button>
                    </td>

                    {/* Acciones */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/ficha/${p.id}`}
                          target="_blank"
                          title="Ver Ficha Pública"
                          className="p-1.5 bg-slate-950 text-slate-300 hover:text-white rounded border border-slate-700 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => openEditModal(p)}
                          title="Editar Equipo"
                          className="p-1.5 bg-slate-950 text-slate-300 hover:text-orange-400 rounded border border-slate-700 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
                          title="Eliminar del Catálogo"
                          className="p-1.5 bg-slate-950 text-slate-300 hover:text-red-400 rounded border border-slate-700 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* 5. Modal para Crear o Editar Equipo */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h2 className="text-base font-heading font-black uppercase text-white">
                {editingProduct ? 'Editar Máquina' : 'Agregar Nueva Máquina al Catálogo'}
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                  Nombre del Equipo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Mini excavadora Rippa R15 1.5T"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="excavadoras">Mini Excavadoras</option>
                    <option value="tractores">Tractores</option>
                    <option value="implementos">Implementos y Motores</option>
                    <option value="camiones">Camiones</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                    Precio o Valor
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. $18.900.000 CLP o Consultar valor"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Sección Imagen con Compresión Automática a WebP */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold uppercase text-slate-300">
                    Fotografía del Equipo (Compresión WebP Automática)
                  </label>
                  <button
                    type="button"
                    onClick={() => setManualUrlMode(!manualUrlMode)}
                    className="text-[10px] text-orange-400 hover:text-orange-300 underline font-medium"
                  >
                    {manualUrlMode ? 'Cambiar a Subir Archivo' : 'Ingresar URL manual'}
                  </button>
                </div>

                {!manualUrlMode ? (
                  <div className="space-y-3">
                    <label className="border-2 border-dashed border-slate-700 hover:border-orange-500/60 bg-slate-950/60 hover:bg-slate-950 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={compressingImage || isSaving}
                      />
                      {compressingImage ? (
                        <div className="flex flex-col items-center gap-2 py-3">
                          <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
                          <span className="text-xs text-orange-300 font-medium">
                            Comprimiendo y convirtiendo a WebP...
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1.5 text-center py-2">
                          <div className="p-2.5 rounded-full bg-slate-900 group-hover:bg-orange-500/10 text-slate-400 group-hover:text-orange-400 transition-colors">
                            <Upload className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                            Haz clic para seleccionar o arrastra una foto
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Cualquier formato (JPG, PNG) se convertirá y comprimirá a <strong>WebP</strong> optimizado
                          </span>
                        </div>
                      )}
                    </label>

                    {/* Badge de Ahorro y Estadísticas WebP */}
                    {compressionStats && (
                      <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-lg p-2.5 flex items-center justify-between text-xs text-emerald-300">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>
                            Original: <strong>{compressionStats.originalKb} KB</strong> → WebP: <strong>{compressionStats.webpKb} KB</strong>
                          </span>
                        </div>
                        <span className="bg-emerald-800/60 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          -{compressionStats.savings}% tamaño
                        </span>
                      </div>
                    )}

                    {/* Previsualización */}
                    {(imagePreview || formData.image) && (
                      <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <img
                          src={imagePreview || formData.image}
                          alt="Previsualización"
                          className="w-16 h-16 object-cover rounded-lg border border-slate-700 shrink-0"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/brand/logo_main.png';
                          }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-white truncate">
                            {selectedWebpFile ? selectedWebpFile.name : 'Imagen actual'}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {selectedWebpFile ? 'Lista para subir a PocketBase' : formData.image}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder="/images/catalog_webp/mi_foto.webp o https://..."
                      value={formData.image}
                      onChange={(e) => {
                        setFormData({ ...formData, image: e.target.value });
                        setImagePreview(e.target.value);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">
                  Descripción Detallada
                </label>
                <textarea
                  rows={4}
                  placeholder="Especificaciones, motor, accesorios incluidos..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isSoldCheck"
                  checked={formData.isSold}
                  onChange={(e) => setFormData({ ...formData, isSold: e.target.checked })}
                  className="rounded text-orange-500 focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="isSoldCheck" className="text-xs text-slate-300 font-bold cursor-pointer">
                  Marcar como VENDIDA (aplica filtro grisáceo y lienzo diagonal)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  disabled={isSaving}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving || compressingImage}
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors shadow flex items-center gap-1.5"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isSaving ? 'Guardando...' : (editingProduct ? 'Actualizar Equipo' : 'Guardar Equipo')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
