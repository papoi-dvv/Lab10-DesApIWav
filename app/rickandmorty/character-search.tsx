'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Character } from '@/types/rickmorty';
import { Search, Filter, X, Atom } from 'lucide-react';

interface CharacterSearchProps {
  initialCharacters: Character[];
}

export default function CharacterSearch({ initialCharacters }: CharacterSearchProps) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search && !status && !gender && !type) {
      setCharacters(initialCharacters);
      return;
    }

    setLoading(true);
    const fetchFilteredCharacters = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append('name', search);
        if (status) queryParams.append('status', status);
        if (gender) queryParams.append('gender', gender);
        if (type) queryParams.append('type', type);

        const res = await fetch(`https://rickandmortyapi.com/api/character/?${queryParams.toString()}`);
        if (!res.ok) {
          setCharacters([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setCharacters(data.results);
      } catch (error) {
        console.error("Error filtrando personajes:", error);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchFilteredCharacters();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, status, gender, type, initialCharacters]);

  const hasFilters = !!(search || status || gender || type);

  const handleClearFilters = () => {
    setSearch('');
    setStatus('');
    setGender('');
    setType('');
  };

  return (
    <div className="space-y-8">
      
      {/* Barra de búsqueda y filtros */}
      <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
        
        {/* Título de filtros */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Filter size={20} className="text-green-400" />
            Filtros de Búsqueda
          </h2>
          {hasFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-zinc-800/60 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-zinc-300 hover:text-white transition-all"
            >
              <X size={14} />
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Grid de inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Búsqueda por nombre */}
          <div className="relative">
            <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">
              Buscar por nombre
            </label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                type="text"
                placeholder="Rick, Morty..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-zinc-900/60 text-white rounded-xl px-10 py-2.5 border border-zinc-700 focus:outline-hidden focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all text-sm placeholder-zinc-600"
              />
            </div>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">
              Estado
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-zinc-900/60 text-white rounded-xl px-4 py-2.5 border border-zinc-700 focus:outline-hidden focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all text-sm appearance-none cursor-pointer"
            >
              <option value="">Todos los estados</option>
              <option value="alive">Vivo</option>
              <option value="dead">Muerto</option>
              <option value="unknown">Desconocido</option>
            </select>
          </div>

          {/* Género */}
          <div>
            <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">
              Género
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-zinc-900/60 text-white rounded-xl px-4 py-2.5 border border-zinc-700 focus:outline-hidden focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all text-sm appearance-none cursor-pointer"
            >
              <option value="">Todos los géneros</option>
              <option value="female">Femenino</option>
              <option value="male">Masculino</option>
              <option value="genderless">Sin género</option>
              <option value="unknown">Desconocido</option>
            </select>
          </div>

          {/* Tipo */}
          <div className="relative">
            <label className="block text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">
              Tipo de ser
            </label>
            <input
              type="text"
              placeholder="Humano, Alien..."
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-zinc-900/60 text-white rounded-xl px-4 py-2.5 border border-zinc-700 focus:outline-hidden focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all text-sm placeholder-zinc-600"
            />
          </div>
        </div>

        {/* Info de resultados */}
        {hasFilters && (
          <div className="mt-4 text-xs text-zinc-400 font-medium">
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Sincronizando con la Ciudadela...
              </span>
            ) : (
              <span>
                {characters.length} {characters.length === 1 ? 'personaje' : 'personajes'} encontrado{characters.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Grid de personajes */}
      {characters.length === 0 ? (
        <div className="py-16 text-center bg-zinc-900/20 border border-dashed border-zinc-800 rounded-2xl backdrop-blur-sm">
          <Atom className="mx-auto mb-4 text-green-400/50 opacity-50" size={48} />
          <p className="text-zinc-400 text-lg font-medium">
            {hasFilters ? 'No se encontraron personajes con los filtros aplicados.' : 'Cargando personajes...'}
          </p>
          {hasFilters && (
            <p className="text-zinc-500 text-sm mt-2">
              Intenta ajustar los filtros o realiza una nueva búsqueda.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {characters.map((character) => (
            <Link
              key={character.id}
              href={`/rickandmorty/${character.id}`}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900/40 to-zinc-950/80 backdrop-blur-xl border border-green-500/10 hover:border-green-500/40 transition-all duration-500 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
            >
              
              {/* Luz interior */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-transparent to-cyan-500/0 group-hover:from-green-500/10 group-hover:to-cyan-500/10 transition-all" />
              
              {/* Contenido */}
              <div className="relative z-10 flex flex-col h-full">
                
                {/* Imagen */}
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-800">
                  <Image
                    src={character.image}
                    alt={character.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Status indicator overlay */}
                  <div className={`absolute top-3 right-3 w-3 h-3 rounded-full border-2 border-white ${
                    character.status === 'Alive' ? 'bg-green-500' : character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                  }`} />
                </div>

                {/* Información */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-green-300 transition-colors truncate">
                      {character.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 truncate">
                      {character.species}
                    </p>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-zinc-800">
                    <p className="text-xs font-mono text-zinc-500">
                      <span className={`font-bold ${
                        character.status === 'Alive' ? 'text-green-400' : character.status === 'Dead' ? 'text-red-400' : 'text-zinc-400'
                      }`}>
                        {character.status}
                      </span>
                      {character.gender !== 'unknown' && <span className="text-zinc-600"> • {character.gender}</span>}
                    </p>
                  </div>
                </div>
              </div>

              {/* Borde brillante */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-green-400/30 shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}