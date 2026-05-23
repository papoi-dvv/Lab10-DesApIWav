import { ApiResponse } from "@/types/rickmorty";
import CharacterSearch from "./character-search";
import { IoLogoOctocat } from "react-icons/io5";

async function getInitialCharacters(): Promise<ApiResponse> {
  // ✨ REQUISITO: Forzar el caché en la petición (SSG)
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "force-cache",
  });

  if (!res.ok) throw new Error("Error al obtener los personajes de Rick and Morty");

  return res.json();
}

export default async function RickAndMortyHome() {
  const data = await getInitialCharacters();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 tracking-tight flex items-center gap-3">
            <IoLogoOctocat size={45} className="text-green-400" /> Universos de Rick & Morty (SSG)
          </h1>
          <p className="text-zinc-400 text-lg mt-2 max-w-2xl">
            Explora la base de datos interdimensional. La primera carga se genera de forma estática en el servidor y las búsquedas operan en tiempo real.
          </p>
        </header>

        {/* Pasamos los personajes iniciales al componente cliente interactivo */}
        <CharacterSearch initialCharacters={data.results} />
      </div>
    </div>
  );
}