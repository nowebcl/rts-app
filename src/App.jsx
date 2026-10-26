import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import CompareDrawer from './components/CompareDrawer';
import { CompareProvider } from './context/CompareContext';

// Pages
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import DeliveriesPage from './pages/DeliveriesPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ImplementosPage from './pages/ImplementosPage';
import AboutPage from './pages/AboutPage';
import RippaAlliancePage from './pages/RippaAlliancePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Scroll to top component on route transition with hash anchor support
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col font-sans antialiased bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      {!isAdminRoute && <Navbar />}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/entregas-exitosas" element={<DeliveriesPage />} />
          <Route path="/entregas" element={<DeliveriesPage />} />
          <Route path="/portafolio" element={<DeliveriesPage />} />
          <Route path="/clientes" element={<DeliveriesPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="/ficha/:id" element={<ProductDetailPage />} />
          <Route path="/implementos" element={<ImplementosPage />} />
          <Route path="/aditamentos" element={<ImplementosPage />} />
          <Route path="/accesorios" element={<ImplementosPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/quienes-somos" element={<AboutPage />} />
          <Route path="/alianza-rippa" element={<RippaAlliancePage />} />
          <Route path="/alianza-con-rippa" element={<RippaAlliancePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/servicios-realizados" element={<ServicesPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          
          {/* Rutas de Administración con Fondo Blanco Minimalista */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/editar/:id" element={<AdminDashboardPage />} />
          <Route path="/admin/nuevo" element={<AdminDashboardPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          
          {/* Fallback to Home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <CompareDrawer />}
      {!isAdminRoute && <WhatsAppFloating />}
    </div>
  );
}

export default function App() {
  return (
    <CompareProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppLayout />
      </BrowserRouter>
    </CompareProvider>
  );
}
