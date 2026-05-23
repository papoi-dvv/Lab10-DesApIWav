import Link from "next/link";
import { PokemonListResponse, SimplePokemon } from "@/types/pokemon";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";

const ITEMS_PER_PAGE = 48;
const TOTAL_POKEMONS = 1302;
const TOTAL_PAGES = Math.ceil(TOTAL_POKEMONS / ITEMS_PER_PAGE);

interface Props {
  searchParams: Promise<{ page?: string }>;
}

async function getPokemons(page: number): Promise<SimplePokemon[]> {
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`,
    {
      next: { revalidate: 86400 },
    }
  );

  if (!res.ok) throw new Error("Error al cargar pokémon");

  const data: PokemonListResponse = await res.json();

  return data.results.map((pokemon) => {
    const urlParts = pokemon.url.split("/");
    const id = parseInt(urlParts[urlParts.length - 2]);

    return {
      name: pokemon.name,
      id: id,
    };
  });
}

export default async function PokemonList({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Math.min(parseInt(page || "1") || 1, TOTAL_PAGES));

  const pokemons = await getPokemons(currentPage);

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(TOTAL_PAGES, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 overflow-hidden">
      
      {/* Contenedor principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        
        {/* Header de sección */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-950/30 border border-yellow-500/20 text-xs font-semibold tracking-widest text-yellow-400 uppercase mb-6 backdrop-blur-sm">
            <Sparkles size={14} className="animate-spin-slow" />
            Generación Estática Incremental (ISR)
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-400 to-purple-500">
              Batalla de Pokémon
            </span>
          </h1>

          <p className="text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Explora 1,302 criaturas elementales prerenderizadas con velocidad extrema. Cada página se genera bajo demanda y se reutiliza durante 24 horas para un rendimiento AAA.
          </p>
        </div>

        {/* Grid de Pokémon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
          {pokemons.map((pokemon) => (
            <Link
              key={pokemon.name}
              href={`/pokemon/${pokemon.name}`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900/40 to-zinc-950/80 backdrop-blur-xl border border-yellow-500/10 hover:border-yellow-500/40 transition-all duration-500 p-4 flex flex-col items-center justify-center aspect-square hover:scale-110 hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]"
            >
              {/* Luz interior */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-transparent to-purple-500/0 group-hover:from-yellow-500/10 group-hover:to-purple-500/10 transition-all" />
              
              {/* Contenido */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-2 w-full h-full">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <Image
                    width={80}
                    height={80}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                    alt={pokemon.name}
                    className="w-full h-full drop-shadow-lg group-hover:scale-125 transition-transform duration-300"
                    priority={false}
                    unoptimized
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xs md:text-sm font-bold text-white capitalize truncate group-hover:text-yellow-300 transition-colors">
                    {pokemon.name}
                  </h3>
                  <p className="text-xs text-zinc-500 font-mono">
                    #{pokemon.id.toString().padStart(4, "0")}
                  </p>
                </div>
              </div>

              {/* Borde brillante al hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-yellow-400/50 shadow-[inset_0_0_20px_rgba(250,204,21,0.1)]" />
            </Link>
          ))}
        </div>

        {/* Navegación de páginas */}
        <div className="flex flex-col gap-6 items-center">
          
          {/* Indicador de página */}
          <div className="text-center">
            <p className="text-sm font-semibold text-zinc-400 mb-1">
              Página <span className="text-yellow-400 font-bold">{currentPage}</span> de{" "}
              <span className="text-yellow-400 font-bold">{TOTAL_PAGES}</span>
            </p>
            <p className="text-xs text-zinc-500">
              Mostrando {pokemons.length} criaturas
            </p>
          </div>

          {/* Botones de navegación */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-4 backdrop-blur-xl">
            
            {/* Anterior */}
            <Link
              href={`/pokemon?page=${currentPage - 1}`}
              className={`p-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-bold ${
                currentPage === 1
                  ? "bg-zinc-900/50 text-zinc-600 cursor-not-allowed opacity-50"
                  : "bg-yellow-950/40 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-900/50 hover:border-yellow-500/60 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)]"
              }`}
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline text-sm">Anterior</span>
            </Link>

            {/* Primera página */}
            {startPage > 1 && (
              <>
                <Link
                  href="/pokemon?page=1"
                  className="px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all text-sm font-semibold"
                >
                  1
                </Link>
                <span className="text-zinc-600 px-1">•••</span>
              </>
            )}

            {/* Números de página */}
            {pageNumbers.map((pageNum) => (
              <Link
                key={pageNum}
                href={`/pokemon?page=${pageNum}`}
                className={`px-4 py-3 rounded-xl font-bold transition-all duration-300 text-sm ${
                  currentPage === pageNum
                    ? "bg-gradient-to-r from-yellow-600 to-purple-600 text-white shadow-lg shadow-yellow-900/50 border border-yellow-500/50"
                    : "bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {pageNum}
              </Link>
            ))}

            {/* Última página */}
            {endPage < TOTAL_PAGES && (
              <>
                <span className="text-zinc-600 px-1">•••</span>
                <Link
                  href={`/pokemon?page=${TOTAL_PAGES}`}
                  className="px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all text-sm font-semibold"
                >
                  {TOTAL_PAGES}
                </Link>
              </>
            )}

            {/* Siguiente */}
            <Link
              href={`/pokemon?page=${currentPage + 1}`}
              className={`p-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-bold ${
                currentPage === TOTAL_PAGES
                  ? "bg-zinc-900/50 text-zinc-600 cursor-not-allowed opacity-50"
                  : "bg-yellow-950/40 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-900/50 hover:border-yellow-500/60 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)]"
              }`}
            >
              <span className="hidden sm:inline text-sm">Siguiente</span>
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}