import defaultProducts from '../data/products';

export const PB_BASE_URL = 'https://bd.rstimportaciones.cl';
const STORAGE_KEY = 'rst_catalog_products_v10';
const AUTH_KEY = 'rst_admin_authenticated';
const PB_TOKEN_KEY = 'rst_pb_session_token';

// Helper de sanitización estricta para evitar inyecciones en URLs o queries
function sanitizeId(val) {
  if (typeof val !== 'string') return '';
  return val.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50);
}

export const CANONICAL_MODEL_ORDER = [
  'rippa-r06',
  'rippa-r10-eco',
  'rippa-r15',
  'rippa-r18',
  'rippa-r22-pro',
  'sanny-sy35u',
  'sanny-sy60c',
  'sanny-sy75c'
];

export function sortProductsCanonical(list) {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => {
    const slugA = a.slug || a.id;
    const slugB = b.slug || b.id;
    const idxA = CANONICAL_MODEL_ORDER.indexOf(slugA);
    const idxB = CANONICAL_MODEL_ORDER.indexOf(slugB);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return (Number(a.numberId) || 0) - (Number(b.numberId) || 0);
  });
}

class ProductService {
  constructor() {
    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem('rst_catalog_products');
      localStorage.removeItem('rst_catalog_products_v2');
      localStorage.removeItem('rst_catalog_products_v3');
      localStorage.removeItem('rst_catalog_products_v4');
      localStorage.removeItem('rst_catalog_products_v5');
      localStorage.removeItem('rst_catalog_products_v6');
      localStorage.removeItem('rst_catalog_products_v7');
      localStorage.removeItem('rst_catalog_products_v8');
      localStorage.removeItem('rst_catalog_products_v9');

      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
      } else {
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed) || parsed.length !== defaultProducts.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
        }
      }
    } catch (e) {
      console.warn('Error inicializando storage:', e);
    }
  }

  /**
   * Obtener token de sesión activo
   */
  getSuperuserToken() {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(PB_TOKEN_KEY) || localStorage.getItem(PB_TOKEN_KEY);
  }

  /**
   * Obtener todos los productos oficiales
   * (con sincronización PocketBase y respaldo local)
   */
  async getAll() {
    try {
      const res = await fetch(`${PB_BASE_URL}/api/collections/productos/records?perPage=100&sort=numberId`, {
        cache: 'no-store'
      });

      if (res.ok) {
        const json = await res.json();
        if (json.items && json.items.length > 0) {
          let mapped = json.items.map(r => {
            const defaultItem = defaultProducts.find(d => d.slug === r.slug || d.name === r.name || d.id === r.slug) || {};
            const fileList = Array.isArray(r.imagenes) ? r.imagenes : (r.imagenes ? [r.imagenes] : []);
            
            const gallery = fileList.length > 0
              ? fileList.map(f => `${PB_BASE_URL}/api/files/productos/${r.id}/${encodeURIComponent(f)}`)
              : (defaultItem.gallery || [`/nuevas imagenes de productos/8f09b593-89b7-4ac8-b85b-e5dfa94f8b52.png`]);

            // Manejo de PDF: si tiene archivo cargado en PB o URL
            let resolvedPdfUrl = r.pdfUrl || defaultItem.pdfUrl || '';
            if (r.pdfFile) {
              resolvedPdfUrl = `${PB_BASE_URL}/api/files/productos/${r.id}/${encodeURIComponent(r.pdfFile)}`;
            }

            return {
              id: defaultItem.id || r.slug || r.id,
              recordId: r.id,
              numberId: r.numberId || defaultItem.numberId || 1,
              name: r.name,
              slug: r.slug,
              category: r.category || defaultItem.category || 'excavadoras',
              categoryName: r.categoryName || defaultItem.categoryName || 'Mini Excavadoras',
              brand: defaultItem.brand || (r.name.toLowerCase().includes('sany') ? 'SANY' : 'RIPPA'),
              tonnage: defaultItem.tonnage || '',
              price: r.price || defaultItem.price || 'Consultar valor',
              isSold: Boolean(r.isSold),
              description: r.description || defaultItem.description || 'Consultar especificaciones oficiales',
              commonBenefits: defaultItem.commonBenefits || [
                "De regalo acople rápido, dedo pulgar hidráulico, kit primera mantención gratis",
                "1 año de garantía componentes esenciales",
                "Certificación Euro 5, EPA, CE"
              ],
              pdfUrl: resolvedPdfUrl,
              pdfFileName: r.pdfFile || '',
              location: r.location || defaultItem.location || 'Entrega con inducción en terreno a todo Chile',
              warranty: r.warranty || defaultItem.warranty || '1 año de garantía componentes esenciales (Motor y Bomba)',
              image: gallery[0] || defaultItem.image || '',
              gallery: gallery,
              rawFiles: fileList
            };
          });

          // Asegurar que si hay productos locales no presentes en PocketBase, se agreguen
          defaultProducts.forEach(def => {
            if (!mapped.some(m => m.slug === def.slug || m.id === def.id)) {
              mapped.push(def);
            }
          });

          // Ordenar formalmente por numberId (Rippa 1..5, Sany 6..8)
          mapped = sortProductsCanonical(mapped);

          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
          }
          return mapped;
        }
      }
    } catch (e) {
      console.warn('Aviso: Conectando con catálogo local:', e.message);
    }

    // Fallback a localStorage o defaults
    if (typeof window !== 'undefined') {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length >= defaultProducts.length) {
            return sortProductsCanonical(parsed);
          }
        }
      } catch (e) {
        // ignore
      }
    }
    return sortProductsCanonical(defaultProducts);
  }

  /**
   * Obtener producto por ID o Slug
   */
  async getById(idOrSlug) {
    const cleanId = String(idOrSlug || '').trim();
    const list = await this.getAll();
    return list.find(p => p.id === cleanId || p.slug === cleanId || p.recordId === cleanId) || null;
  }

  /**
   * Guardar o editar ficha de producto (Soporta múltiples imágenes WebP y archivo PDF)
   */
  async save(productData, newImageFiles = [], newPdfFile = null) {
    const token = this.getSuperuserToken();
    let remoteSaved = false;
    let remoteError = null;

    // 1. Intentar guardar en PocketBase si tenemos sesión
    if (token) {
      try {
        const formData = new FormData();
        formData.append('name', String(productData.name || '').trim().slice(0, 150));
        formData.append('category', String(productData.category || 'excavadoras').slice(0, 50));
        formData.append('categoryName', String(productData.categoryName || 'Mini Excavadoras').slice(0, 50));
        formData.append('price', String(productData.price || 'Consultar valor').slice(0, 50));
        formData.append('isSold', String(Boolean(productData.isSold)));
        formData.append('description', String(productData.description || '').slice(0, 4000));
        formData.append('location', String(productData.location || 'Entrega con inducción en terreno a todo Chile').slice(0, 150));
        formData.append('warranty', String(productData.warranty || '1 año de garantía componentes esenciales').slice(0, 150));

        if (productData.pdfUrl && typeof productData.pdfUrl === 'string') {
          formData.append('pdfUrl', productData.pdfUrl.slice(0, 300));
        }

        // Subir archivo PDF técnico si se proporcionó
        if (newPdfFile instanceof File) {
          formData.append('pdfFile', newPdfFile, newPdfFile.name);
        }

        // Subir múltiples imágenes WebP
        if (Array.isArray(newImageFiles) && newImageFiles.length > 0) {
          newImageFiles.forEach((file) => {
            if (file instanceof File) {
              formData.append('imagenes', file, file.name);
            }
          });
        }

        if (productData.numberId) {
          formData.append('numberId', String(parseInt(productData.numberId, 10) || Date.now()));
        }

        const slugValue = sanitizeId(productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
        formData.append('slug', slugValue);

        // Identificar si existe el registro en PocketBase por recordId, slug o id
        let targetRecordId = (productData.recordId && productData.recordId.length === 15) ? productData.recordId : null;
        if (!targetRecordId) {
          const currentList = await this.getAll();
          const match = currentList.find(p => p.id === productData.id || p.slug === slugValue || p.name === productData.name);
          if (match && match.recordId && match.recordId.length === 15) {
            targetRecordId = match.recordId;
          }
        }

        const isUpdate = Boolean(targetRecordId);
        const url = isUpdate
          ? `${PB_BASE_URL}/api/collections/productos/records/${targetRecordId}`
          : `${PB_BASE_URL}/api/collections/productos/records`;

        const res = await fetch(url, {
          method: isUpdate ? 'PATCH' : 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });

        if (res.ok) {
          remoteSaved = true;
        } else {
          const errDetail = await res.text();
          remoteError = `Error HTTP ${res.status}: ${errDetail}`;
          console.warn('PocketBase save error:', remoteError);
        }
      } catch (err) {
        remoteError = err.message || 'Error de conexión con la base de datos';
        console.error('Error al guardar en PocketBase:', err);
      }
    }

    // 2. Garantizar que siempre se guarde localmente (Doble resiliencia)
    const list = await this.getAll();
    const index = list.findIndex(p => p.id === productData.id || p.slug === productData.slug);

    let updatedList;
    if (index >= 0) {
      updatedList = [...list];
      updatedList[index] = { 
        ...updatedList[index], 
        ...productData,
        // Conservar o actualizar galería local
        gallery: productData.gallery || updatedList[index].gallery
      };
    } else {
      const newId = productData.id || `rst-${Date.now().toString().slice(-4)}`;
      const newProduct = {
        ...productData,
        id: newId,
        numberId: list.length + 1,
        slug: productData.slug || `${productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${list.length + 1}`
      };
      updatedList = [newProduct, ...list];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event('rst_catalog_updated'));

    return {
      success: true,
      remoteSaved,
      remoteError,
      message: remoteSaved 
        ? '¡Ficha guardada exitosamente en la base de datos oficial!' 
        : (remoteError ? `Guardado localmente. (Aviso de BD: ${remoteError})` : 'Guardado exitosamente.')
    };
  }

  /**
   * Cambiar estado a Vendida / Disponible
   */
  async toggleSold(id) {
    const safeId = sanitizeId(id);
    const list = await this.getAll();
    const product = list.find(p => p.id === safeId || p.id === id);
    if (!product) return false;

    const nextSold = !product.isSold;
    const nextPrice = nextSold ? 'VENDIDA' : (product.price === 'VENDIDA' ? 'Consultar valor' : product.price);

    const token = this.getSuperuserToken();
    let targetRecordId = (product.recordId && product.recordId.length === 15) ? product.recordId : null;
    
    if (token && targetRecordId) {
      try {
        await fetch(`${PB_BASE_URL}/api/collections/productos/records/${targetRecordId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ isSold: nextSold, price: nextPrice })
        });
      } catch (e) {
        console.error('Error actualizando estado en PocketBase:', e);
      }
    }

    const updated = list.map(p => {
      if (p.id === id || p.id === safeId) {
        return { ...p, isSold: nextSold, price: nextPrice };
      }
      return p;
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('rst_catalog_updated'));
    return true;
  }

  /**
   * Eliminar producto
   */
  async delete(id) {
    const safeId = sanitizeId(id);
    const list = await this.getAll();
    const product = list.find(p => p.id === safeId || p.id === id);

    const token = this.getSuperuserToken();
    if (token && product && product.recordId) {
      try {
        await fetch(`${PB_BASE_URL}/api/collections/productos/records/${product.recordId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (e) {
        console.error('Error eliminando de PocketBase:', e);
      }
    }

    const filtered = list.filter(p => p.id !== id && p.id !== safeId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('rst_catalog_updated'));
    return true;
  }

  /**
   * Restablecer al catálogo base oficial
   */
  async resetToDefaults() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    window.dispatchEvent(new Event('rst_catalog_updated'));
    return defaultProducts;
  }

  // Auth Helpers seguros
  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(AUTH_KEY) === 'true' || localStorage.getItem(AUTH_KEY) === 'true';
  }

  async login(username, password) {
    if (!username || !password) return false;

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();
    const identity = (trimmedUser.toUpperCase() === 'RST4') ? 'admin@rst.cl' : trimmedUser;

    try {
      const resp = await fetch(`${PB_BASE_URL}/api/collections/_superusers/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity, password: trimmedPass })
      });

      if (resp.ok) {
        const data = await resp.json();
        if (data && data.token) {
          sessionStorage.setItem(AUTH_KEY, 'true');
          sessionStorage.setItem(PB_TOKEN_KEY, data.token);
          localStorage.setItem(AUTH_KEY, 'true');
          localStorage.setItem(PB_TOKEN_KEY, data.token);
          return true;
        }
      }
    } catch (e) {
      console.error('Error durante la autenticación:', e);
    }
    return false;
  }

  logout() {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(PB_TOKEN_KEY);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(PB_TOKEN_KEY);
  }
}

export const productService = new ProductService();
export default productService;
