// Este not-found es exclusivo para los pokémon que no se encuentran en la lista de los 151 originales, o para rutas inválidas dentro de la sección de pokémon. Proporciona un mensaje claro y un botón para regresar a la lista principal, manteniendo la estética del sitio con un diseño moderno y atractivo.
import Link from "next/link";
import { IoArrowBackOutline, IoWarningOutline } from "react-icons/io5";

export default function PokemonNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 max-w-md shadow-2xl transform transition hover:scale-102">
        
        {/* Ícono temático de advertencia */}
        <div className="inline-flex p-4 bg-red-500/20 text-red-400 rounded-full mb-6 animate-bounce">
          <IoWarningOutline size={50} />
        </div>

        {/* Mensaje de Error */}
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
          ¡Pokémon Salvaje No Encontrado!
        </h1>
        <p className="text-gray-300 mb-8 leading-relaxed">
          El Pokémon que estás intentando buscar no está registrado en esta Pokédex regional o la ruta ingresada es inválida.
        </p>

        {/* Botón de retorno a la lista */}
        <Link
          href="/pokemon"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl shadow-md transition-all active:scale-95"
        >
          <IoArrowBackOutline size={20} />
          Regresar a la Lista (ISR)
        </Link>
      </div>
    </div>
  );
}