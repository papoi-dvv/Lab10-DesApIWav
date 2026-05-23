import { ApiResponse } from "@/types/rickmorty";
import CharacterSearch from "./character-search";
import { Atom, Sparkles, ChevronLeft } from "lucide-react";
import Link from "next/link";

async function getInitialCharacters(): Promise<ApiResponse> {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "force-cache",
  });

  if (!res.ok) throw new Error("Error al obtener los personajes de Rick and Morty");

  return res.json();
}

export default async function RickAndMortyHome() {
  const data = await getInitialCharacters();

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden">
      
      {/* Efectos de fondo temáticos Rick & Morty */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15" />
      
      {/* Aura radiactiva (Verde-Cian) */}
      <div className="absolute -left-60 top-0 w-[800px] h-[800px] bg-gradient-to-br from-green-500 via-emerald-600 to-cyan-500 rounded-full blur-[180px] opacity-15 pointer-events-none" />
      
      {/* Luz complementaria */}
      <div className="absolute -right-60 bottom-0 w-[800px] h-[800px] bg-gradient-to-bl from-cyan-500 via-teal-500 to-green-500 rounded-full blur-[180px] opacity-10 pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/40 border-b border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          
          {/* Branding Rick & Morty */}
          <Link
            href="/rickandmorty"
            className="group flex items-center gap-3 text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-500 hover:from-green-300 hover:to-cyan-400 transition-all"
          >
            <div className="p-2 bg-green-950/40 border border-green-500/30 rounded-lg group-hover:bg-green-900/50 transition-colors animate-spin-slow">
              <Atom size={24} className="text-green-400" />
            </div>
            <span>Dimensión</span>
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

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-950/30 border border-green-500/20 text-xs font-semibold tracking-widest text-green-400 uppercase mb-6 backdrop-blur-sm">
            <Sparkles size={14} className="animate-pulse" />
            Generación Estática de Servidor (SSG)
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-500">
              Dimensión Multiversal
            </span>
          </h1>

          <p className="text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            La Ciudadela interdimensional compilada estáticamente. Busca personajes en tiempo real (CSR) mientras exploras perfiles prerrenderizados con perfiles individuales que se actualizan cada 10 días.
          </p>
        </div>

        {/* Search component */}
        <CharacterSearch initialCharacters={data.results} />
      </div>
    </div>
  );
}