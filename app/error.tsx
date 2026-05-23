'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden flex flex-col items-center justify-center px-6 font-sans">
      
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Aura roja (error) */}
      <div className="absolute -left-40 top-1/4 w-[600px] h-[600px] bg-gradient-to-br from-red-600 via-rose-500 to-pink-400 rounded-full blur-[140px] opacity-20 pointer-events-none" />
      
      {/* Aura complementaria */}
      <div className="absolute -right-40 bottom-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-orange-500 via-amber-600 to-red-600 rounded-full blur-[140px] opacity-15 pointer-events-none" />

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        
        {/* Icono de alerta animado */}
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-2xl backdrop-blur-xl">
            <AlertTriangle size={64} className="text-red-400 animate-pulse" />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-rose-400 to-pink-400 drop-shadow-[0_5px_15px_rgba(244,63,94,0.3)]">
            Error Crítico
          </span>
        </h1>

        {/* Subtítulo */}
        <h2 className="text-xl md:text-2xl text-zinc-400 font-bold tracking-widest uppercase mb-6">
          — FALLO EN LA DIMENSIÓN —
        </h2>

        {/* Descripción */}
        <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl mx-auto">
          Ocurrió un error inesperado en el tejido dimensional de la aplicación. Nuestro equipo de ingenieros multiversales está trabajando para restaurar la estabilidad.
        </p>

        {/* Detalle del error */}
        {error.message && (
          <div className="mb-8 p-4 bg-zinc-900/50 border border-red-500/20 rounded-xl backdrop-blur-md">
            <p className="text-xs text-zinc-400 font-mono break-words">
              {error.message}
            </p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="group relative px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-900/50 flex items-center justify-center gap-2"
          >
            <span>Reintentar</span>
            <span className="group-hover:rotate-180 transition-transform duration-300">↻</span>
          </button>

          <Link
            href="/"
            className="group relative px-8 py-3 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Home size={20} />
            <span>Volver al Inicio</span>
          </Link>
        </div>

        {/* Información técnica */}
        <div className="mt-12 p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-lg backdrop-blur-sm">
          <p className="text-xs text-zinc-500 font-mono">
            Código de error: {error.digest || 'UNKNOWN'} • Contacta al equipo si el problema persiste.
          </p>
        </div>
      </div>
    </div>
  );
}