import Link from "next/link";
import { PokemonListResponse, SimplePokemon } from "@/types/pokemon";
import { IoMdList } from "react-icons/io";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import Image from "next/image";

// Definimos el límite de Pokémon por pestaña/página
const ITEMS_PER_PAGE = 48;
const TOTAL_POKEMONS = 1302; // Cantidad aproximada actual en la PokeAPI
const TOTAL_PAGES = Math.ceil(TOTAL_POKEMONS / ITEMS_PER_PAGE);

interface Props {
  searchParams: Promise<{ page?: string }>;
}

async function getPokemons(page: number): Promise<SimplePokemon[]> {
  // Calculamos el desfase (offset) según la página actual
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`,
    {
      next: { revalidate: 86400 }, // Mantiene los datos estáticos, revalidando cada 24 horas
    }
  );

  if (!res.ok) throw new Error("Error al cargar pokémon");

  const data: PokemonListResponse = await res.json();

  return data.results.map((pokemon) => {
    // Extraemos el ID directamente de la URL porque el índice ya no es confiable debido al offset
    const urlParts = pokemon.url.split("/");
    const id = parseInt(urlParts[urlParts.length - 2]);

    return {
      name: pokemon.name,
      id: id,
    };
  });
}

export default async function PokemonList({ searchParams }: Props) {
  // Leemos la página actual desde la URL, si no existe por defecto es 1
  const { page } = await searchParams;
  const currentPage = Math.max(1, Math.min(parseInt(page || "1") || 1, TOTAL_PAGES));

  const pokemons = await getPokemons(currentPage);

  // Lógica para mostrar un rango limitado de pestañas (Ej: página actual y vecinas)
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(TOTAL_PAGES, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-left mb-12 drop-shadow-lg">
          <IoMdList size={40} className="inline-block" /> Lista de Pokémons (ISR)
        </h1>

        {/* Rejilla de Tarjetas de Pokémon */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {pokemons.map((pokemon) => (
            <Link
              key={pokemon.name}
              href={`/pokemon/${pokemon.name}`}
              className="transform transition hover:scale-105"
            >
              <div className="bg-white text-gray-700 rounded-xl shadow-lg p-6 hover:shadow-2xl cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <Image
                    width={100}
                    height={100}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                    alt={pokemon.name}
                    className="w-32 h-32 mx-auto"
                    priority={false}
                    // Fallback por si el Pokémon de IDs altos no tiene imagen tipo dream-world
                    unoptimized 
                  />
                  <h2 className="text-xl font-bold text-center capitalize mt-4">
                    {pokemon.name}
                  </h2>
                </div>
                <p className="text-gray-500 text-center mt-2">
                  #{pokemon.id.toString().padStart(3, "0")}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── ÍNDICE DE PESTAÑAS (NAVEGACIÓN) ─── */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 bg-black/20 p-4 rounded-2xl backdrop-blur-xs">
          
          {/* Botón Anterior */}
          <Link
            href={`/pokemon?page=${currentPage - 1}`}
            className={`p-3 rounded-xl bg-white/10 text-white transition hover:bg-white/20 ${
              currentPage === 1 ? "pointer-events-none opacity-40" : ""
            }`}
          >
            <IoArrowBack size={20} />
          </Link>

          {/* Primera Página (Si está lejos) */}
          {startPage > 1 && (
            <>
              <Link
                href="/pokemon?page=1"
                className="px-4 py-2 rounded-xl text-white transition hover:bg-white/10"
              >
                1
              </Link>
              <span className="text-white/40 px-1">...</span>
            </>
          )}

          {/* Números de Pestañas Dinámicas */}
          {pageNumbers.map((pageNum) => (
            <Link
              key={pageNum}
              href={`/pokemon?page=${pageNum}`}
              className={`px-4 py-2 rounded-xl font-bold transition ${
                currentPage === pageNum
                  ? "bg-purple-600 text-white shadow-md shadow-purple-900/50"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              {pageNum}
            </Link>
          ))}

          {/* Última Página (Si está lejos) */}
          {endPage < TOTAL_PAGES && (
            <>
              <span className="text-white/40 px-1">...</span>
              <Link
                href={`/pokemon?page=${TOTAL_PAGES}`}
                className="px-4 py-2 rounded-xl text-white transition hover:bg-white/10"
              >
                {TOTAL_PAGES}
              </Link>
            </>
          )}

          {/* Botón Siguiente */}
          <Link
            href={`/pokemon?page=${currentPage + 1}`}
            className={`p-3 rounded-xl bg-white/10 text-white transition hover:bg-white/20 ${
              currentPage === TOTAL_PAGES ? "pointer-events-none opacity-40" : ""
            }`}
          >
            <IoArrowForward size={20} />
          </Link>
        </div>
        
        <p className="text-center text-white/50 text-sm mt-4">
          Página {currentPage} de {TOTAL_PAGES}
        </p>
      </div>
    </div>
  );
}