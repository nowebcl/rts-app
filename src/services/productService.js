import defaultProducts from '../data/products';

export const PB_BASE_URL = 'https://bd.rstimportaciones.cl';
const STORAGE_KEY = 'rst_catalog_products_v3';
const AUTH_KEY = 'rst_admin_authenticated';
const PB_TOKEN_KEY = 'rst_pb_super_token';

// Credenciales oficiales requeridas
export const ADMIN_CREDENTIALS = {
  username: 'RST4',
  password: 'Rst#2026!Pass'
};

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

      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
      } else {
        const parsed = JSON.parse(stored);
        // Si no tiene los 6 modelos oficiales, refrescar
        if (!Array.isArray(parsed) || parsed.length !== defaultProducts.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
        }
      }
    } catch (e) {
      console.warn('Error inicializando storage:', e);
    }
  }

  /**
   * Obtener token de superusuario de PocketBase si es necesario
   */
  async getSuperuserToken() {
    if (typeof window === 'undefined') return null;
    const cached = localStorage.getItem(PB_TOKEN_KEY);
    if (cached) return cached;

    try {
      const resp = await fetch(`${PB_BASE_URL}/api/collections/_superusers/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: 'admin@rst.cl', password: 'Rst#2026!Pass' })
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.token) {
          localStorage.setItem(PB_TOKEN_KEY, data.token);
          return data.token;
        }
      }
    } catch (e) {
      console.warn('No se pudo autenticar en PocketBase directamente:', e);
    }
    return null;
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
              ? fileList.map(f => `${PB_BASE_URL}/api/files/productos/${r.id}/${f}`)
              : (defaultItem.gallery || [`/catalogo/${r.slug || 'rippa-r06'}/foto-1.webp`]);

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
   * Obtener un producto por ID o Slug
   */
  async getById(idOrSlug) {
    const list = await this.getAll();
    return list.find(p => p.id === idOrSlug || p.slug === idOrSlug || String(p.numberId) === idOrSlug) || null;
  }

  /**
   * Guardar o crear producto (PocketBase + LocalStorage)
   */
  async save(productData, webpFile = null) {
    const token = await this.getSuperuserToken();

    // 1. Si tenemos token, guardar en PocketBase
    if (token) {
      try {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('category', productData.category);
        formData.append('categoryName', productData.categoryName);
        formData.append('price', productData.price || 'Consultar valor');
        formData.append('isSold', String(Boolean(productData.isSold)));
        formData.append('description', productData.description || 'Consultar más información');
        formData.append('location', productData.location || 'Entrega con inducción en terreno a todo Chile');
        formData.append('warranty', productData.warranty || '1 año de garantía componentes esenciales');
        if (productData.pdfUrl) {
          formData.append('pdfUrl', productData.pdfUrl);
        }

        if (webpFile) {
          formData.append('imagenes', webpFile, webpFile.name);
        }

        if (productData.numberId) {
          formData.append('numberId', String(productData.numberId));
        } else {
          formData.append('numberId', String(Date.now()));
        }

        if (productData.slug) {
          formData.append('slug', productData.slug);
        } else {
          const generatedSlug = (productData.name || 'maquina')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          formData.append('slug', `${generatedSlug}-${Date.now().toString().slice(-4)}`);
        }

        const isUpdate = Boolean(productData.recordId || (productData.id && productData.id.length === 15));
        const url = isUpdate 
          ? `${PB_BASE_URL}/api/collections/productos/records/${productData.recordId || productData.id}`
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

    // Fallback: guardar en localStorage si PB no responde
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
    const list = await this.getAll();
    const product = list.find(p => p.id === id);
    if (!product) return false;

    const nextSold = !product.isSold;
    const nextPrice = nextSold ? 'VENDIDA' : (product.price === 'VENDIDA' ? 'Consultar valor' : product.price);

    const token = await this.getSuperuserToken();
    if (token && product.recordId) {
      try {
        await fetch(`${PB_BASE_URL}/api/collections/productos/records/${product.recordId}`, {
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
      if (p.id === id) {
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
    const list = await this.getAll();
    const product = list.find(p => p.id === id);

    const token = await this.getSuperuserToken();
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

    const filtered = list.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new Event('rst_catalog_updated'));
    return true;
  }

  /**
   * Restablecer al catálogo base de los 6 modelos oficiales
   */
  async resetToDefaults() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    window.dispatchEvent(new Event('rst_catalog_updated'));
    return defaultProducts;
  }

  // Auth Helpers
  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(AUTH_KEY) === 'true';
  }

  async login(username, password) {
    if (username.trim() === ADMIN_CREDENTIALS.username && password.trim() === ADMIN_CREDENTIALS.password) {
      localStorage.setItem(AUTH_KEY, 'true');
      try {
        await this.getSuperuserToken();
      } catch (e) {
        console.warn('Superuser prefetch failed:', e);
      }
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(PB_TOKEN_KEY);
  }
}

export const productService = new ProductService();
export default productService;
