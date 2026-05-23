'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Character } from '@/types/rickmorty';

interface CharacterSearchProps {
  initialCharacters: Character[];
}

export default function CharacterSearch({ initialCharacters }: CharacterSearchProps) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    // Si no hay filtros aplicados, volvemos a la lista inicial estática
    if (!search && !status && !gender && !type) {
      setCharacters(initialCharacters);
      return;
    }

    // CSR: Petición de búsqueda y filtros combinados en tiempo real
    const fetchFilteredCharacters = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('name', search);
        if (status) queryParams.append('status', status);
        if (gender) queryParams.append('gender', gender);
        if (type) queryParams.append('type', type);

        const res = await fetch(`https://rickandmortyapi.com/api/character/?${queryParams.toString()}`);
        if (!res.ok) {
          setCharacters([]); // Si la API devuelve 404, vaciamos la lista
          return;
        }
        const data = await res.json();
        setCharacters(data.results);
      } catch (error) {
        console.error("Error filtrando personajes:", error);
        setCharacters([]);
      }
    };

    // Debounce simple para no saturar la API al escribir el nombre
    const delayDebounceFn = setTimeout(() => {
      fetchFilteredCharacters();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, status, gender, type, initialCharacters]);

  return (
    <div>
      {/* ─── BARRA DE BÚSQUEDA Y FILTROS ─── */}
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">Buscar por nombre</label>
          <input
            type="text"
            placeholder="Ej. Rick, Morty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-800 text-white rounded-xl px-4 py-2.5 border border-zinc-700 focus:outline-hidden focus:border-green-500 transition-colors text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">Estado (Status)</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-zinc-800 text-white rounded-xl px-4 py-2.5 border border-zinc-700 focus:outline-hidden focus:border-green-500 transition-colors text-sm capitalize"
          >
            <option value="">Todos</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">Género (Gender)</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-zinc-800 text-white rounded-xl px-4 py-2.5 border border-zinc-700 focus:outline-hidden focus:border-green-500 transition-colors text-sm capitalize"
          >
            <option value="">Todos</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">Tipo (Type)</label>
          <input
            type="text"
            placeholder="Ej. Parasite, Clone..."
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-zinc-800 text-white rounded-xl px-4 py-2.5 border border-zinc-700 focus:outline-hidden focus:border-green-500 transition-colors text-sm"
          />
        </div>
      </div>

      {/* ─── REJILLA DE PERSONAJES FILTRADOS ─── */}
      {characters.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-800">
          <p className="text-zinc-400 text-lg">No se encontraron personajes con los filtros aplicados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rickandmorty/${character.id}`}
              className="group bg-zinc-900 text-white rounded-2xl shadow-lg overflow-hidden border border-zinc-800 hover:border-green-500/50 transition-all transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-800">
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    sizes="(max-w-700px) 100vw, 25vw"
                    loading="lazy" // ✨ REQUISITO: Carga de imágenes bajo demanda (Lazy Loading)
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold tracking-tight group-hover:text-green-400 transition-colors truncate">
                    {character.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      character.status === 'Alive' ? 'bg-green-500' : character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                    }`} />
                    <p className="text-sm text-zinc-400 truncate">
                      {character.status} - {character.species}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5 pt-0 text-xs text-zinc-500 text-right font-mono">
                #{character.id.toString().padStart(3, '0')}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}