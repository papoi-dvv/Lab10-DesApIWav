import Link from 'next/link';
import { Metadata } from 'next';
import { Pokemon, PokemonListResponse } from '@/types/pokemon';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ChevronLeft, Zap, Droplet, Leaf, Wind } from 'lucide-react';

interface PokemonPageProps {
  params: {
    name: string;
  };
}

async function getPokemon(name: string): Promise<Pokemon> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
    next: { revalidate: 86400 }
  });
  
  if (!res.ok) {
    notFound();
  }
  
  return res.json();
}

export async function generateStaticParams() { 
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data: PokemonListResponse = await res.json();
  
  return data.results.map((pokemon) => ({
    name: pokemon.name,
  }));
}

export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
  const { name } = await params;
  
  try {
    const pokemon = await getPokemon(name);
    return {
      title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} - Pokédex Multiversal`,
      description: `Información detallada sobre ${pokemon.name}. ID #${pokemon.id}`,
    };
  } catch {
    return {
      title: 'Pokémon no encontrado',
    };
  }
}

const typeColors: Record<string, { bg: string; text: string; light: string }> = {
  fire: { bg: 'from-red-600 to-orange-600', text: 'text-red-300', light: 'bg-red-950/40' },
  water: { bg: 'from-blue-600 to-cyan-600', text: 'text-blue-300', light: 'bg-blue-950/40' },
  grass: { bg: 'from-green-600 to-emerald-600', text: 'text-green-300', light: 'bg-green-950/40' },
  electric: { bg: 'from-yellow-500 to-amber-600', text: 'text-yellow-300', light: 'bg-yellow-950/40' },
  psychic: { bg: 'from-pink-600 to-purple-600', text: 'text-pink-300', light: 'bg-pink-950/40' },
  ice: { bg: 'from-cyan-500 to-blue-500', text: 'text-cyan-300', light: 'bg-cyan-950/40' },
  dragon: { bg: 'from-indigo-600 to-purple-600', text: 'text-indigo-300', light: 'bg-indigo-950/40' },
  dark: { bg: 'from-gray-700 to-black', text: 'text-gray-300', light: 'bg-gray-900/40' },
  fairy: { bg: 'from-pink-500 to-rose-500', text: 'text-pink-300', light: 'bg-pink-950/40' },
  normal: { bg: 'from-gray-500 to-zinc-600', text: 'text-gray-300', light: 'bg-gray-900/40' },
  fighting: { bg: 'from-orange-700 to-red-700', text: 'text-orange-300', light: 'bg-orange-950/40' },
  flying: { bg: 'from-indigo-500 to-blue-400', text: 'text-indigo-300', light: 'bg-indigo-950/40' },
  poison: { bg: 'from-purple-600 to-pink-600', text: 'text-purple-300', light: 'bg-purple-950/40' },
  ground: { bg: 'from-yellow-700 to-orange-700', text: 'text-yellow-300', light: 'bg-yellow-950/40' },
  rock: { bg: 'from-yellow-800 to-orange-800', text: 'text-yellow-300', light: 'bg-yellow-950/40' },
  bug: { bg: 'from-green-700 to-lime-600', text: 'text-green-300', light: 'bg-green-950/40' },
  ghost: { bg: 'from-purple-700 to-indigo-700', text: 'text-purple-300', light: 'bg-purple-950/40' },
  steel: { bg: 'from-gray-600 to-blue-600', text: 'text-gray-300', light: 'bg-gray-950/40' },
};

export default async function PokemonDetail({ params }: PokemonPageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);
  const primaryType = pokemon.types[0].type.name;
  const colors = typeColors[primaryType] || typeColors.normal;

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden">
      
      {/* Background effects themed */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15" />
      
      {/* Type-based aura */}
      <div className={`absolute -left-40 top-1/4 w-[600px] h-[600px] bg-gradient-to-br ${colors.bg} rounded-full blur-[140px] opacity-20 pointer-events-none`} />
      <div className={`absolute -right-40 bottom-1/4 w-[600px] h-[600px] bg-gradient-to-bl ${colors.bg} rounded-full blur-[140px] opacity-15 pointer-events-none`} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        
        {/* Back button */}
        <Link
          href="/pokemon"
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-lg text-sm font-semibold text-zinc-300 hover:text-white transition-all hover:bg-zinc-800"
        >
          <ChevronLeft size={18} />
          <span>Volver al Pokédex</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Imagen principal */}
          <div className="lg:col-span-1 flex flex-col items-center justify-start">
            <div className={`relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden bg-gradient-to-b ${colors.bg} border-2 border-white/10 shadow-2xl flex items-center justify-center p-8 backdrop-blur-xl`}>
              
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
              
              <Image
                width={400}
                height={400}
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-full h-full object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* ID y meta info */}
            <div className="mt-8 w-full max-w-sm text-center space-y-2">
              <div className="inline-block px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                <p className="text-xs text-zinc-500 font-mono">POKÉDEX ID</p>
                <p className={`text-2xl font-black ${colors.text}`}>#{pokemon.id.toString().padStart(4, '0')}</p>
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div className="lg:col-span-2">
            
            {/* Title */}
            <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-4 capitalize text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
              {pokemon.name}
            </h1>

            {/* Type badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {pokemon.types.map((type) => {
                const typeColor = typeColors[type.type.name] || typeColors.normal;
                return (
                  <div
                    key={type.type.name}
                    className={`px-6 py-2.5 rounded-full font-bold capitalize text-white border border-white/20 bg-gradient-to-r ${typeColor.bg} shadow-lg`}
                  >
                    {type.type.name}
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 mb-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Zap size={20} className="text-yellow-400" />
                Estadísticas Base
              </h3>
              <div className="space-y-4">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-zinc-300 capitalize">
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                      <span className="font-bold text-white">{stat.base_stat}</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${colors.bg} transition-all duration-500`}
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              
              <div className={`${colors.light} border border-zinc-800 rounded-xl p-4 backdrop-blur-sm`}>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Altura</p>
                <p className="text-2xl font-bold text-white">{(pokemon.height / 10).toFixed(1)} m</p>
              </div>

              <div className={`${colors.light} border border-zinc-800 rounded-xl p-4 backdrop-blur-sm`}>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Peso</p>
                <p className="text-2xl font-bold text-white">{(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>

              <div className={`sm:col-span-2 ${colors.light} border border-zinc-800 rounded-xl p-4 backdrop-blur-sm`}>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Habilidades</p>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <span key={ability.ability.name} className="px-3 py-1 bg-zinc-900/60 border border-zinc-700 rounded-md text-sm text-zinc-300 capitalize">
                      {ability.ability.name.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumen de capacidades */}
            <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Wind size={20} className="text-cyan-400" />
                Resumen de Poder
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                  <span className="text-sm font-medium text-zinc-300">Experiencia Base</span>
                  <span className="text-white font-bold">150 EXP</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg">
                  <span className="text-sm font-medium text-zinc-300">Índice de Captura</span>
                  <span className={`text-white font-bold ${pokemon.id <= 151 ? 'text-yellow-400' : 'text-zinc-400'}`}>
                    {pokemon.id <= 151 ? 'Alto' : 'Estándar'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}