import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldAlert, ArrowRight } from 'lucide-react';
import { productService, ADMIN_CREDENTIALS } from '../services/productService';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const success = await productService.login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-4 sm:p-6 selection:bg-orange-500 selection:text-white">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 space-y-6">

        {/* Logo Oficial de RST */}
        <div className="text-center space-y-3">
          <div className="inline-block p-3 bg-slate-950/80 rounded-2xl border border-slate-700 shadow-inner">
            <img
              src="/brand/rst_logo_official.png"
              alt="Logo RST Importaciones"
              className="h-16 w-auto mx-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/brand/logo_main.png';
              }}
            />
          </div>
          <div>
            <h1 className="text-xl font-heading font-black text-white uppercase tracking-wider">
              Panel de Administración
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Gestión de Catálogo · Venta de Maquinaria Nueva y Semi Nueva RST
            </p>
          </div>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg p-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Formulario de Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Usuario
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="RST4"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-heading font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-orange-600 hover:bg-orange-500 text-white font-heading font-bold uppercase text-xs tracking-wider py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Iniciar Sesión</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Nota informativa de credenciales */}
        <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <div className="font-bold text-slate-300 flex items-center justify-between">
            <span>Credenciales de Acceso:</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800">
              Activo
            </span>
          </div>
          <div>Usuario: <code className="text-orange-400 font-bold">{ADMIN_CREDENTIALS.username}</code></div>
          <div>Clave: <code className="text-orange-400 font-bold">{ADMIN_CREDENTIALS.password}</code></div>
        </div>

      </div>
    </div>
  );
}
