import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden flex flex-col items-center justify-center px-6 font-sans">
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Aura violeta (portal) */}
      <div className="absolute -left-40 top-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-400 rounded-full blur-[140px] opacity-20 pointer-events-none" />
      
      {/* Aura alternativa */}
      <div className="absolute -right-40 bottom-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-blue-500 via-cyan-500 to-purple-600 rounded-full blur-[140px] opacity-15 pointer-events-none" />

      {/* Contenedor principal */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        
        {/* Número 404 cinematográfico */}
        <h1 className="text-8xl md:text-9xl font-black uppercase tracking-tighter mb-2 leading-none">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 drop-shadow-[0_10px_20px_rgba(168,85,247,0.3)]">
            404
          </span>
        </h1>

        {/* Subtítulo */}
        <h2 className="text-2xl md:text-3xl text-zinc-400 font-bold tracking-widest uppercase mb-8">
          — DIMENSIÓN NO ENCONTRADA —
        </h2>

        {/* Descripción */}
        <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl mx-auto">
          Has intentado acceder a una dimensión que no existe en el tejido multiversal de esta aplicación. El portal que buscas ha sido colapsado o nunca existió.
        </p>

        {/* Visualización artística del error */}
        <div className="mb-12 p-8 bg-zinc-900/40 border border-purple-500/20 rounded-3xl backdrop-blur-xl">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Zap size={32} className="text-purple-400 animate-pulse" />
            <div className="text-sm text-zinc-400 font-mono">PORTAL COLAPSADO</div>
            <Zap size={32} className="text-purple-400 animate-pulse" />
          </div>
          <p className="text-xs text-zinc-500 font-mono">La ruta solicitada no existe en esta realidad.</p>
        </div>

        {/* Botones de navegación */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/50"
          >
            Regresar al Nexo Central
          </Link>

          <Link
            href="/pokemon"
            className="group relative px-8 py-3 bg-zinc-900/80 border border-zinc-800 hover:border-purple-500/40 text-white font-bold rounded-xl transition-all duration-300"
          >
            ⚡ Ir a Pokémon
          </Link>

          <Link
            href="/rickandmorty"
            className="group relative px-8 py-3 bg-zinc-900/80 border border-zinc-800 hover:border-green-500/40 text-white font-bold rounded-xl transition-all duration-300"
          >
            ☢ Ir a Rick & Morty
          </Link>
        </div>
      </div>
    </div>
  );
}