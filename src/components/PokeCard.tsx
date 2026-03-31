import type { Pokemon } from '../types/api';

export default function PokeCard({ name, url }: Pokemon) {
  return (
    <div
      className="
      flex flex-col items-center 
      bg-white p-6 
      rounded-3xl shadow-lg hover:shadow-2xl 
      border border-slate-100
      transition-all duration-300 ease-in-out
      hover:-translate-y-2 hover:scale-[1.03]
      cursor-pointer
    "
    >
      <h2
        className="
        text-lg sm:text-xl
        md:text-2xl font-extrabold text-slate-900 
        capitalize tracking-tight
        mb-4
      "
      >
        {name}
      </h2>
      <div
        className="
        w-full h-full 
        flex items-center justify-center 
        bg-slate-50 rounded-2xl
        p-2
      "
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url.split('/')[6]}.png`}
          alt={`Imagem do Pokémon ${name}`}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
}
