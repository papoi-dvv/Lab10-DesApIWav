import Link from 'next/link';
import { ChevronLeft, Atom } from 'lucide-react';

export default function RickAndMortyNotFound() {
  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden flex flex-col items-center justify-center px-6 font-sans">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="absolute -left-40 top-1/4 w-[600px] h-[600px] bg-gradient-to-br from-green-500 via-emerald-600 to-cyan-500 rounded-full blur-[140px] opacity-20 pointer-events-none" />
      <div className="absolute -right-40 bottom-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-500 via-teal-500 to-green-500 rounded-full blur-[140px] opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-green-950/40 border border-green-500/30 rounded-2xl backdrop-blur-xl animate-spin-slow">
            <Atom size={64} className="text-green-400" />
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-500 drop-shadow-[0_5px_15px_rgba(52,211,153,0.3)]">
            Dimensión Perdida
          </span>
        </h1>

        <h2 className="text-xl md:text-2xl text-zinc-400 font-bold tracking-widest uppercase mb-6">
          — PERSONAJE NO EXISTE —
        </h2>

        <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8 max-w-xl mx-auto">
          El personaje que buscas ha sido borrado de los registros de la Ciudadela. Puede que nunca haya existido en esta realidad.
        </p>

        <Link
          href="/rickandmorty"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-900/50"
        >
          <ChevronLeft size={20} />
          <span>Volver a Dimensión</span>
        </Link>
      </div>
    </div>
  );
}