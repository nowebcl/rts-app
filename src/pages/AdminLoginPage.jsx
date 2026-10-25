import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ShieldAlert, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { productService } from '../services/productService';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await productService.login(username, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Credenciales incorrectas. Verifique usuario y contraseña.');
      }
    } catch (err) {
      setError('Error al procesar la autenticación. Intente más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-orange-500 selection:text-white">
      
      {/* Botón Volver al Sitio */}
      <div className="w-full max-w-md mb-4 text-left">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Catálogo Público</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-8 sm:p-10 space-y-6">

        {/* Logo Oficial de RST */}
        <div className="text-center space-y-3">
          <div className="inline-block p-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-xs">
            <img
              src="/brand/rst_logo_official.png"
              alt="Logo RST Importaciones"
              className="h-14 w-auto mx-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/brand/logo_main.png';
              }}
            />
          </div>
          <div>
            <h1 className="text-xl font-heading font-black text-slate-900 uppercase tracking-wider">
              Panel de Administración
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Gestión de Maquinaria · Acceso Restringido
            </p>
          </div>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl p-3.5 flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario de Login */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Usuario o Correo
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingresa tu usuario"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#FE8003] focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#FE8003] focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#FE8003] hover:bg-orange-600 disabled:opacity-50 text-white font-heading font-bold uppercase text-xs tracking-wider py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verificando credenciales...</span>
              </>
            ) : (
              <>
                <span>Iniciar Sesión</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-[11px] text-slate-400">
            Conexión protegida SSL/TLS. Noweb Labs Software.
          </p>
        </div>

      </div>
    </div>
  );
}
