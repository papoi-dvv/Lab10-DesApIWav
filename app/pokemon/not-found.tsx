import Link from 'next/link';
import { ChevronLeft, Zap } from 'lucide-react';

export default function PokemonNotFound() {
  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden flex flex-col items-center justify-center px-6 font-sans">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="absolute -left-40 top-1/4 w-[600px] h-[600px] bg-gradient-to-br from-yellow-400 via-amber-500 to-purple-600 rounded-full blur-[140px] opacity-20 pointer-events-none" />
      <div className="absolute -right-40 bottom-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-purple-500 via-pink-500 to-yellow-300 rounded-full blur-[140px] opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-yellow-950/40 border border-yellow-500/30 rounded-2xl backdrop-blur-xl">
            <Zap size={64} className="text-yellow-400 animate-pulse" />
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-400 to-purple-500 drop-shadow-[0_5px_15px_rgba(250,204,21,0.3)]">
            No Encontrado
          </span>
        </h1>

        <h2 className="text-xl md:text-2xl text-zinc-400 font-bold tracking-widest uppercase mb-6">
          — POKÉMON DESCONOCIDO —
        </h2>

        <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl mx-auto">
          Este Pokémon no está registrado en la Pokédex de esta dimensión. Verifica el nombre e intenta nuevamente.
        </p>

        <Link
          href="/pokemon"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-600 to-purple-600 hover:from-yellow-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-900/50"
        >
          <ChevronLeft size={20} />
          <span>Volver al Pokédex</span>
        </Link>
      </div>
    </div>
  );
}