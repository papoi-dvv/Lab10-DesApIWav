import { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Zap, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Facción Pokémon - Colisión Interdimensional",
  description: "Explora el universo Pokémon mediante SSG e ISR. Batalla de renderizado de alta velocidad.",
};

interface PokemonLayoutProps {
  children: ReactNode;
}

export default function PokemonLayout({ children }: PokemonLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden">
      
      {/* Efectos de fondo temáticos Pokémon */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15" />
      
      {/* Aura energética Pokémon (Amarillo-Púrpura) */}
      <div className="absolute -left-60 top-0 w-[800px] h-[800px] bg-gradient-to-br from-yellow-400 via-amber-500 to-purple-600 rounded-full blur-[180px] opacity-15 pointer-events-none" />
      
      {/* Luz complementaria */}
      <div className="absolute -right-60 bottom-0 w-[800px] h-[800px] bg-gradient-to-bl from-purple-500 via-pink-500 to-yellow-300 rounded-full blur-[180px] opacity-10 pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/40 border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          
          {/* Branding Pokémon */}
          <Link
            href="/pokemon"
            className="group flex items-center gap-3 text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-purple-500 hover:from-yellow-300 hover:to-purple-400 transition-all"
          >
            <div className="p-2 bg-yellow-950/40 border border-yellow-500/30 rounded-lg group-hover:bg-yellow-900/50 transition-colors">
              <Zap size={24} className="text-yellow-400" />
            </div>
            <span>Pokédex</span>
          </Link>

          {/* Botón volver */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-lg text-sm font-semibold text-zinc-300 hover:text-white transition-all hover:bg-zinc-800"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">Volver</span>
          </Link>
        </div>
      </nav>

      {/* Contenido */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
