import Link from "next/link";
import { IoPlanetOutline, IoArrowBackOutline } from "react-icons/io5";

export default function RickAndMortyNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-8 text-center text-white">
      <div className="bg-zinc-950 border border-zinc-800 p-8 md:p-12 rounded-3xl max-w-md shadow-2xl relative overflow-hidden">
        
        {/* Efecto de brillo de fondo verde portal */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Ícono animado de planeta/portal */}
        <div className="inline-flex p-4 bg-green-500/10 text-green-400 rounded-full mb-6 animate-pulse border border-green-500/20">
          <IoPlanetOutline size={50} />
        </div>

        {/* Mensaje de Error Interdimensional */}
        <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-3 tracking-tight">
          ERROR 404
        </h1>
        <h2 className="text-xl font-bold text-zinc-200 mb-2">
          ¡Dimensión Desconocida!
        </h2>
        <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
          El personaje o la realidad alternativa que estás intentando escanear no existe en los registros de la Ciudadela de Ricks. Puede que haya sido borrado por la Federación Galáctica.
        </p>

        {/* Botón de retorno al panel principal de la tarea */}
        <Link
          href="/rickandmorty"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-green-950/50 transition-all transform active:scale-95 text-sm"
        >
          <IoArrowBackOutline size={18} />
          Volver a la Base de Datos
        </Link>
      </div>
    </div>
  );
}