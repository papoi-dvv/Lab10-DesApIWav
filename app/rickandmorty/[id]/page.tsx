import { Character, ApiResponse } from "@/types/rickmorty";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Zap, Users, MapPin, Wand2, Radio } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

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

export async function generateStaticParams() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data: ApiResponse = await res.json();

  return data.results.map((character) => ({
    id: character.id.toString(),
  }));
}

export default async function CharacterDetail({ params }: Props) {
  const { id } = await params;
  const character = await getCharacter(id);

  const statusColor = character.status === 'Alive' ? 'from-green-600 to-emerald-600' : character.status === 'Dead' ? 'from-red-600 to-rose-600' : 'from-gray-600 to-zinc-600';
  const statusTextColor = character.status === 'Alive' ? 'text-green-300' : character.status === 'Dead' ? 'text-red-300' : 'text-gray-300';
  const statusBg = character.status === 'Alive' ? 'bg-green-950/40' : character.status === 'Dead' ? 'bg-red-950/40' : 'bg-gray-950/40';

  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-white overflow-hidden">
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-15" />
      
      {/* Status-based aura */}
      <div className={`absolute -left-40 top-1/4 w-[600px] h-[600px] bg-gradient-to-br ${statusColor} rounded-full blur-[140px] opacity-20 pointer-events-none`} />
      <div className={`absolute -right-40 bottom-1/4 w-[600px] h-[600px] bg-gradient-to-bl ${statusColor} rounded-full blur-[140px] opacity-15 pointer-events-none`} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        
        {/* Back button */}
        <Link
          href="/rickandmorty"
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-lg text-sm font-semibold text-zinc-300 hover:text-white transition-all hover:bg-zinc-800"
        >
          <ChevronLeft size={18} />
          <span>Volver a Dimensión</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Imagen principal */}
          <div className="lg:col-span-1 flex flex-col items-center justify-start">
            <div className={`relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden bg-gradient-to-b ${statusColor} border-2 border-white/10 shadow-2xl flex items-center justify-center p-4 backdrop-blur-xl`}>
              
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
              
              <Image
                src={character.image}
                alt={character.name}
                fill
                sizes="(max-width: 512px) 100vw, 512px"
                loading="lazy"
                className="object-cover drop-shadow-2xl"
              />
            </div>

            {/* ID badge */}
            <div className="mt-8 w-full max-w-sm text-center">
              <div className="inline-block px-6 py-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                <p className="text-xs text-zinc-500 font-mono uppercase">Registro de Ciudadela</p>
                <p className="text-3xl font-black text-green-400 mt-1">#{character.id.toString().padStart(4, '0')}</p>
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Title */}
            <div>
              <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-3 capitalize text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
                {character.name}
              </h1>
              
              {/* Status badge */}
              <div className={`inline-block px-5 py-2 rounded-lg font-bold ${statusBg} border border-white/20 ${statusTextColor}`}>
                {character.status === 'Alive' ? '● Vivo' : character.status === 'Dead' ? '● Muerto' : '● Desconocido'}
              </div>
            </div>

            {/* Información principal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className={`${statusBg} border border-zinc-800 rounded-2xl p-5 backdrop-blur-sm`}>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Zap size={16} className="text-yellow-400" />
                  Esencia Biológica
                </p>
                <p className="text-xl font-bold text-white">{character.species}</p>
                {character.type && (
                  <p className="text-xs text-zinc-400 mt-2 truncate">Subtipo: {character.type}</p>
                )}
              </div>

              <div className={`${statusBg} border border-zinc-800 rounded-2xl p-5 backdrop-blur-sm`}>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Users size={16} className="text-purple-400" />
                  Género
                </p>
                <p className="text-xl font-bold text-white capitalize">{character.gender}</p>
              </div>

              <div className={`${statusBg} border border-zinc-800 rounded-2xl p-5 backdrop-blur-sm`}>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-blue-400" />
                  Origen
                </p>
                <p className="text-lg font-bold text-white truncate">{character.origin.name}</p>
              </div>

              <div className={`${statusBg} border border-zinc-800 rounded-2xl p-5 backdrop-blur-sm`}>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-indigo-400" />
                  Ubicación Actual
                </p>
                <p className="text-lg font-bold text-white truncate">{character.location.name}</p>
              </div>
            </div>

            {/* Apariciones en episodios */}
            <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Radio size={20} className="text-green-400" />
                Apariciones Transmitidas
              </h3>
              
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 mb-4">
                <p className="text-3xl font-black text-green-400">
                  {character.episode.length}
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                  {character.episode.length === 1 ? 'episodio registrado' : 'episodios registrados'}
                </p>
              </div>

              {character.episode.length > 0 && (
                <div className="text-xs text-zinc-400">
                  <p className="font-semibold text-zinc-300 mb-2">Primeros episodios:</p>
                  <div className="flex flex-wrap gap-2">
                    {character.episode.slice(0, 8).map((ep, idx) => {
                      const episodeNum = ep.split('/').pop() || idx + 1;
                      return (
                        <span key={idx} className="px-2 py-1 bg-green-950/30 border border-green-500/20 rounded text-xs text-green-400 font-mono">
                          E{episodeNum}
                        </span>
                      );
                    })}
                    {character.episode.length > 8 && (
                      <span className="px-2 py-1 bg-zinc-900/60 border border-zinc-700 rounded text-xs text-zinc-400">
                        +{character.episode.length - 8} más
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ISR Info */}
            <div className="bg-zinc-900/30 border border-dashed border-zinc-800 rounded-xl p-4">
              <p className="text-xs text-zinc-500 font-mono">
                <span className="text-green-400 font-bold">ISR Activo</span> • Revalidación: cada 10 días • Última sincronización: generada en build
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}