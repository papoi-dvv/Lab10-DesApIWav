import Image from "next/image";
import Link from "next/link";
import { Swords, Zap, Atom, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden flex flex-col justify-between font-sans">
      
      {/* ─── EFECTOS DE FONDO CINEASTAS Y DESTELLOS AMBIENTALES ─── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Aura Energética Pokémon (Izquierda) */}
      <div className="absolute -left-40 top-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-600 via-amber-500 to-yellow-400 rounded-full blur-[140px] opacity-25 animate-pulse pointer-events-none" />
      
      {/* Aura Radiactiva Rick & Morty (Derecha) */}
      <div className="absolute -right-40 bottom-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-green-500 via-emerald-600 to-cyan-500 rounded-full blur-[140px] opacity-20 pointer-events-none" />

      {/* ─── SECCIÓN HERO (NEXO CENTRAL) ─── */}
      <header className="relative z-10 max-w-5xl mx-auto text-center pt-20 px-6 flex flex-col items-center">
        
        {/* Insignia Premium de la Plataforma */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-6 shadow-xl shadow-black/40">
          <Sparkles size={14} className="text-amber-400 animate-spin-slow" />
          Plataforma de Desarrollo Multiversal
        </div>

        {/* Gran Título de Colisión de Realidades */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none select-none">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-400 to-purple-500 drop-shadow-[0_5px_15px_rgba(245,158,11,0.3)]">
            Colisión
          </span>
          <br />
          <span className="text-zinc-100 font-extrabold text-4xl md:text-6xl tracking-widest block my-2 text-zinc-400">
            — INTERDIMENSIONAL —
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-500 drop-shadow-[0_5px_15px_rgba(52,211,153,0.3)]">
            Inminente
          </span>
        </h1>

        {/* Subtítulo Descriptivo */}
        <p className="max-w-2xl text-base md:text-lg text-zinc-400 mt-6 leading-relaxed font-medium drop-shadow-md">
          Dos realidades colisionan en una obra maestra de ingeniería web. Explora bases de datos galácticas optimizadas de forma extrema mediante arquitecturas híbridas en el servidor.
        </p>

        {/* Logotipo Flotante de Next.js */}
        <div className="mt-8 p-3 bg-zinc-900/30 backdrop-blur-xs rounded-2xl border border-zinc-800/50 shadow-inner">
          <Image
            className="dark:invert opacity-70"
            src="/next.svg"
            alt="Logo Next.js"
            width={110}
            height={22}
            priority
          />
        </div>
      </header>

      {/* ─── ZONA DE COMBATE / SECCIÓN DE MÓDULOS EN COMPOSICIÓN DIVIDIDA ─── */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-6 my-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Ícono de Espadas Cruzadas en el Epicentro Tridimensional */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 border-2 border-zinc-800 text-zinc-400 p-4 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)] z-20 hidden lg:flex items-center justify-center animate-pulse">
          <Swords size={28} className="text-zinc-200" />
        </div>

        {/* FACCION POKÉMON (Módulo Energético/Anime) */}
        <Link
          href="/pokemon"
          className="group relative flex flex-col justify-between p-8 bg-gradient-to-b from-zinc-900/40 to-zinc-950/80 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/60 rounded-3xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden"
        >
          {/* Luz de neón interna decorativa */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-yellow-400 opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-purple-950/50 border border-purple-500/30 rounded-2xl text-yellow-400 shadow-md group-hover:bg-purple-900/60 group-hover:text-yellow-300 transition-colors">
                <Zap size={32} className="fill-current animate-pulse" />
              </div>
              <span className="text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full">
                MÓDULO ALTA ENERGÍA
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400 group-hover:from-yellow-300 group-hover:to-purple-300 transition-all">
              Facción Pokémon
            </h2>
            
            <p className="text-zinc-400 text-sm md:text-base mt-4 leading-relaxed font-medium">
              Ingresa al campo de batalla elemental donde se despliega una Pokédex de renderizado ultrarrápido. Implementa estrategias de generación estática incremental capaces de procesar criaturas salvajes dinámicamente bajo demanda.
            </p>

            {/* Características técnicas destacadas */}
            <ul className="space-y-2 mt-6 text-xs font-semibold text-zinc-500 group-hover:text-zinc-400 transition-colors">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Renderizado Estático Incremental (ISR) continuo.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                Paginación matricial fluida de alta velocidad.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                Carga selectiva de sprites vectoriales (Dream World).
              </li>
            </ul>
          </div>

          {/* Botón de Acción Estilo Portal Pokémon */}
          <div className="mt-8 flex items-center justify-between w-full p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800 group-hover:border-purple-500/40 transition-colors">
            <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
              Iniciar Combate Estático
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-lg shadow-purple-900/50 transform group-hover:translate-x-1 transition-transform">
              &rarr;
            </div>
          </div>
        </Link>

        {/* FACCION RICK & MORTY (Módulo Sci-Fi/Caos) */}
        <Link
          href="/rickandmorty"
          className="group relative flex flex-col justify-between p-8 bg-gradient-to-b from-zinc-900/40 to-zinc-950/80 backdrop-blur-xl border border-green-500/20 hover:border-green-500/60 rounded-3xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(34,197,94,0.2)] overflow-hidden"
        >
          {/* Luz de neón interna decorativa */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity" />

          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-green-950/50 border border-green-500/30 rounded-2xl text-green-400 shadow-md group-hover:bg-green-900/60 group-hover:text-green-300 transition-colors">
                <Atom size={32} className="animate-spin-slow" />
              </div>
              <span className="text-xs font-mono font-bold bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full">
                DIMENSIÓN RADIACTIVA
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 group-hover:from-green-300 group-hover:to-cyan-300 transition-all">
              Dimensión Rick & Morty
            </h2>
            
            <p className="text-zinc-400 text-sm md:text-base mt-4 leading-relaxed font-medium">
              Cruza el umbral hacia el caos interdimensional de la Ciudadela. Domina búsquedas avanzadas en tiempo real controladas por estados del cliente junto a perfiles prerrenderizados de forma rígida y duradera.
            </p>

            {/* Características técnicas destacadas */}
            <ul className="space-y-2 mt-6 text-xs font-semibold text-zinc-500 group-hover:text-zinc-400 transition-colors">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Generación Estática de Servidor (SSG) forzada.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Filtros interactivos multi-variable en tiempo real (CSR).
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Sincronización galáctica e ISR fija de 10 días.
              </li>
            </ul>
          </div>

          {/* Botón de Acción Estilo Portal Multiverso */}
          <div className="mt-8 flex items-center justify-between w-full p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800 group-hover:border-green-500/40 transition-colors">
            <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
              Cruzar Portal Cuántico
            </span>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center justify-center font-bold shadow-lg shadow-green-950/50 transform group-hover:translate-x-1 transition-transform">
              &rarr;
            </div>
          </div>
        </Link>
      </main>

      {/* ─── PIE DE PÁGINA ACCESIBLE ─── */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-xs text-zinc-500 font-medium">
        <p>
          Desarrollado de forma modular aplicando patrones avanzados de Next.js App Router.
        </p>
        <p className="bg-zinc-900 px-3 py-1 rounded-md border border-zinc-800 text-zinc-400">
          Entorno de Laboratorio 2026 • Modo Oscuro Activo
        </p>
      </footer>
    </div>
  );
}