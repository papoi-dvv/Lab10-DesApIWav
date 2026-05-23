import { Character, ApiResponse } from "@/types/rickmorty";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoArrowBackOutline, IoPlanetOutline, IoBodyOutline, IoFilmOutline } from "react-icons/io5";

interface Props {
  params: Promise<{ id: string }>;
}

// ✨ REQUISITO: Revalidación de datos cada 10 días (10 días = 864,000 segundos)
export const revalidate = 864000;

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 864000 }
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error("Error en la sincronización galáctica");
  }

  return res.json();
}

// ✨ REQUISITO: Generar las rutas estáticas por ID en el build de producción
export async function generateStaticParams() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data: ApiResponse = await res.json();

  // Mapeamos los primeros IDs disponibles devueltos por la primera página de la API
  return data.results.map((character) => ({
    id: character.id.toString(),
  }));
}

export default async function CharacterDetail({ params }: Props) {
  const { id } = await params;
  const character = await getCharacter(id);

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Banner Decorativo basado en el estado */}
        <div className={`h-4 w-full ${
          character.status === 'Alive' ? 'bg-gradient-to-r from-green-500 to-emerald-400' : character.status === 'Dead' ? 'bg-gradient-to-r from-red-600 to-rose-500' : 'bg-zinc-600'
        }`} />

        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center md:items-start">
          
          {/* Contenedor de Imagen con Lazy Loading */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-lg shrink-0">
            <Image
              src={character.image}
              alt={character.name}
              fill
              sizes="(max-w-800px) 100vw, 320px"
              loading="lazy"
              className="object-cover"
            />
          </div>

          {/* Mapeo completo de Campos del Response */}
          <div className="flex-1 w-full">
            <span className="text-xs font-mono font-bold bg-zinc-800 text-zinc-400 px-3 py-1 rounded-md">
              ID #{character.id.toString().padStart(3, '0')}
            </span>
            <h1 className="text-4xl font-black mt-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              {character.name}
            </h1>

            {/* Ficha técnica en rejilla */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              
              <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-900/60 flex gap-3 items-start">
                <IoBodyOutline className="text-green-400 mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Esencia Biológica</h4>
                  <p className="text-zinc-200 font-medium mt-0.5">{character.species}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">Género: <span className="capitalize">{character.gender}</span></p>
                </div>
              </div>

              <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-900/60 flex gap-3 items-start">
                <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${
                  character.status === 'Alive' ? 'bg-green-500' : character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                }`} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Signo de Vida</h4>
                  <p className="text-zinc-200 font-medium mt-0.5">{character.status}</p>
                  {character.type && (
                    <p className="text-xs text-zinc-400 mt-0.5 truncate max-w-[180px]">Subtipo: {character.type}</p>
                  )}
                </div>
              </div>

              <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-900/60 flex gap-3 items-start">
                <IoPlanetOutline className="text-blue-400 mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Origen Cosmográfico</h4>
                  <p className="text-zinc-200 font-medium mt-0.5 truncate max-w-[200px]">{character.origin.name}</p>
                </div>
              </div>

              <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-900/60 flex gap-3 items-start">
                <IoPlanetOutline className="text-indigo-400 mt-1 shrink-0" size={20} />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Ubicación de Avistamiento</h4>
                  <p className="text-zinc-200 font-medium mt-0.5 truncate max-w-[200px]">{character.location.name}</p>
                </div>
              </div>

            </div>

            {/* Listado de episodios mapeados */}
            <div className="mt-6 bg-zinc-900/40 p-4 rounded-xl border border-zinc-900/60 flex gap-3 items-start">
              <IoFilmOutline className="text-purple-400 mt-1 shrink-0" size={20} />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Apariciones Fílmicas</h4>
                <p className="text-zinc-200 font-medium mt-0.5">
                  Presente en <span className="text-purple-400 font-bold">{character.episode.length}</span> {character.episode.length === 1 ? 'episodio' : 'episodios'}.
                </p>
              </div>
            </div>

            {/* Botón Volver */}
            <div className="mt-8 pt-6 border-t border-zinc-900">
              <Link
                href="/rickandmorty"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all text-sm"
              >
                <IoArrowBackOutline size={16} /> Volver a Rick & Morty
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}