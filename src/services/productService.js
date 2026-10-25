import defaultProducts from '../data/products';

export const PB_BASE_URL = 'https://bd.rstimportaciones.cl';
const STORAGE_KEY = 'rst_catalog_products_v7';
const AUTH_KEY = 'rst_admin_authenticated';
const PB_TOKEN_KEY = 'rst_pb_session_token';

// Helper de sanitización estricta para evitar inyecciones en URLs o queries
function sanitizeId(val) {
  if (typeof val !== 'string') return '';
  return val.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50);
}

class ProductService {
  constructor() {
    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;
    try {
      // Limpiar versiones antiguas del catálogo dummy anterior
      localStorage.removeItem('rst_catalog_products');
      localStorage.removeItem('rst_catalog_products_v2');
      localStorage.removeItem('rst_catalog_products_v3');
      localStorage.removeItem('rst_catalog_products_v4');
      localStorage.removeItem('rst_catalog_products_v5');
      localStorage.removeItem('rst_catalog_products_v6');

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
   * Obtener token de sesión activo (almacenado solo durante el login válido)
   */
  getSuperuserToken() {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(PB_TOKEN_KEY) || localStorage.getItem(PB_TOKEN_KEY);
  }

  /**
   * Obtener todos los productos oficiales
   * (con respaldo automático en cache local si la red falla)
   */
  async getAll() {
    try {
      // 1. Intentar leer desde PocketBase (Regla pública de lectura)
      const res = await fetch(`${PB_BASE_URL}/api/collections/productos/records?perPage=100&sort=numberId`, {
        cache: 'no-store'
      });

      if (res.ok) {
        const json = await res.json();
        if (json.items && json.items.length > 0) {
          const mapped = json.items.map(r => {
            const defaultItem = defaultProducts.find(d => d.slug === r.slug || d.name === r.name || d.id === r.slug) || {};
            const fileList = Array.isArray(r.imagenes) ? r.imagenes : (r.imagenes ? [r.imagenes] : []);
            const gallery = fileList.length > 0
              ? fileList.map(f => `${PB_BASE_URL}/api/files/productos/${r.id}/${encodeURIComponent(f)}`)
              : (defaultItem.gallery || [`/catalogo/${r.slug || 'rippa-r06'}/foto-3.webp`]);

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
              pdfUrl: r.pdfUrl || defaultItem.pdfUrl || '',
              location: r.location || defaultItem.location || 'Entrega con inducción en terreno a todo Chile',
              warranty: r.warranty || defaultItem.warranty || '1 año de garantía componentes esenciales (Motor y Bomba)',
              image: gallery[0] || defaultItem.image || '',
              gallery: gallery
            };
          });

          // Asegurar que si hay productos locales no presentes en PocketBase, se agreguen
          defaultProducts.forEach(def => {
            if (!mapped.some(m => m.slug === def.slug || m.id === def.id)) {
              mapped.push(def);
            }
          });

          // Actualizar caché local
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mapped));
          }
          return mapped;
        }
      }
    } catch (e) {
      console.warn('Aviso: Usando catálogo local debido a:', e.message);
    }

    // 2. Fallback a catálogo oficial por defecto
    if (typeof window !== 'undefined') {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed) && parsed.length === defaultProducts.length) {
            return parsed;
          }
        }
        return defaultProducts;
      } catch (e) {
        return defaultProducts;
      }
    }
    return defaultProducts;
  }

  /**
   * Obtener un producto por ID o Slug sanitizado
   */
  async getById(idOrSlug) {
    const cleanId = String(idOrSlug || '').trim();
    const list = await this.getAll();
    return list.find(p => p.id === cleanId || p.slug === cleanId || String(p.numberId) === cleanId) || null;
  }

  /**
   * Guardar o crear producto (PocketBase + LocalStorage)
   */
  async save(productData, webpFile = null) {
    const token = this.getSuperuserToken();

    // 1. Si tenemos token autenticado, guardar en PocketBase
    if (token) {
      try {
        const formData = new FormData();
        formData.append('name', String(productData.name || '').slice(0, 150));
        formData.append('category', String(productData.category || 'excavadoras').slice(0, 50));
        formData.append('categoryName', String(productData.categoryName || 'Mini Excavadoras').slice(0, 50));
        formData.append('price', String(productData.price || 'Consultar valor').slice(0, 50));
        formData.append('isSold', String(Boolean(productData.isSold)));
        formData.append('description', String(productData.description || 'Consultar más información').slice(0, 2000));
        formData.append('location', String(productData.location || 'Entrega con inducción en terreno a todo Chile').slice(0, 150));
        formData.append('warranty', String(productData.warranty || '1 año de garantía componentes esenciales').slice(0, 150));
        
        if (productData.pdfUrl) {
          formData.append('pdfUrl', String(productData.pdfUrl).slice(0, 300));
        }

        if (webpFile) {
          formData.append('imagenes', webpFile, webpFile.name);
        }

        if (productData.numberId) {
          formData.append('numberId', String(parseInt(productData.numberId, 10) || Date.now()));
        } else {
          formData.append('numberId', String(Date.now()));
        }

        if (productData.slug) {
          formData.append('slug', sanitizeId(productData.slug));
        } else {
          const generatedSlug = (productData.name || 'maquina')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          formData.append('slug', `${generatedSlug}-${Date.now().toString().slice(-4)}`);
        }

        const rawRecordId = productData.recordId || (productData.id && productData.id.length === 15 ? productData.id : null);
        const safeRecordId = rawRecordId ? sanitizeId(rawRecordId) : null;
        const isUpdate = Boolean(safeRecordId);
        const url = isUpdate 
          ? `${PB_BASE_URL}/api/collections/productos/records/${safeRecordId}`
          : `${PB_BASE_URL}/api/collections/productos/records`;

        const res = await fetch(url, {
          method: isUpdate ? 'PATCH' : 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });

        if (res.ok) {
          const saved = await res.json();
          window.dispatchEvent(new Event('rst_catalog_updated'));
          return saved;
        }
      } catch (e) {
        console.error('Error al guardar en PocketBase:', e);
      }
    }

    // Fallback: guardar en localStorage si PB no responde o modo offline
    const list = await this.getAll();
    const index = list.findIndex(p => p.id === productData.id);

    let updatedList;
    if (index >= 0) {
      updatedList = [...list];
      updatedList[index] = { ...updatedList[index], ...productData };
    } else {
      const newId = `rst-${Date.now().toString().slice(-4)}`;
      const newProduct = {
        ...productData,
        id: productData.id || newId,
        numberId: list.length + 1,
        slug: productData.slug || `${productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${list.length + 1}`
      };
      updatedList = [newProduct, ...list];
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    window.dispatchEvent(new Event('rst_catalog_updated'));
    return productData;
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
    if (token && product.recordId) {
      const safeRecordId = sanitizeId(product.recordId);
      try {
        await fetch(`${PB_BASE_URL}/api/collections/productos/records/${safeRecordId}`, {
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

    // Actualizar local
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
   * Eliminar producto de forma segura
   */
  async delete(id) {
    const safeId = sanitizeId(id);
    const list = await this.getAll();
    const product = list.find(p => p.id === safeId || p.id === id);

    const token = this.getSuperuserToken();
    if (token && product && product.recordId) {
      const safeRecordId = sanitizeId(product.recordId);
      try {
        await fetch(`${PB_BASE_URL}/api/collections/productos/records/${safeRecordId}`, {
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

  // Auth Helpers seguros (cero credenciales almacenadas en código plano)
  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(AUTH_KEY) === 'true' || localStorage.getItem(AUTH_KEY) === 'true';
  }

  /**
   * Autenticación contra PocketBase enviando credenciales ingresadas por el usuario
   */
  async login(username, password) {
    if (!username || !password) return false;

    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    // Mapear alias RST4 a la cuenta de superusuario en PocketBase si el usuario ingresa su alias
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
          // Opcionalmente mantener en localStorage para persistencia de sesión si se desea
          localStorage.setItem(AUTH_KEY, 'true');
          localStorage.setItem(PB_TOKEN_KEY, data.token);
          return true;
        }
      }
    } catch (e) {
      console.error('Error durante la autenticación segura:', e);
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
