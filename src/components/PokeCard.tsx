import type { Pokemon } from '../types/api';
import { PokeFavoriteButton } from './PokeFavoriteButton';

export default function PokeCard({ pokemon }: { pokemon: Pokemon }) {
  const { name, url, id, types } = pokemon;
  const typeColors: Record<string, string> = {
    grass: 'bg-green-500',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    bug: 'bg-lime-600',
    normal: 'bg-slate-400',
    poison: 'bg-purple-500',
    electric: 'bg-yellow-400',
    ground: 'bg-amber-700',
    fairy: 'bg-pink-300',
    fighting: 'bg-orange-700',
    psychic: 'bg-pink-500',
    rock: 'bg-stone-500',
    ghost: 'bg-indigo-700',
    ice: 'bg-cyan-300',
    dragon: 'bg-violet-600',
    steel: 'bg-zinc-400',
    flying: 'bg-sky-400',
  };
  const mainType = pokemon.types?.[0] || 'normal';
  const cardColor = typeColors[mainType] || 'bg-slate-200';

  return (
    <div
      className={`group flex flex-col items-center p-6 
    rounded-3xl shadow-lg hover:shadow-2xl 
    border border-white/20
    transition-all duration-300 ease-in-out
    hover:-translate-y-2 hover:scale-[1.03]
    cursor-pointer
    ${cardColor}`}
    >
      <h2 className="bg-red-600 text-white px-4 py-1 rounded-full text-lg sm:text-xl font-extrabold capitalize tracking-tight mb-4 inline-block shadow-sm">
        {name + ' Nº ' + url.split('/')[6]}
      </h2>
      <div className="relative w-full h-48 flex items-center justify-center bg-slate-50/50 rounded-2xl p-2 mb-4 overflow-hidden">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          alt={`Imagem padrão do Pokémon ${name}`}
          className="absolute max-h-full max-w-full object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-0"
          loading="lazy"
        />
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`}
          alt={`Imagem de hover do Pokémon ${name}`}
          className="absolute max-h-full max-w-full object-contain transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-150 group-hover:-translate-y-2"
          loading="lazy"
        />
      </div>
      <div className="flex gap-2 justify-center w-full items-center">
        {types.map((type) => (
          <div
            key={type}
            className="flex items-center bg-white/20 rounded-full p-1 pr-3 shadow-sm"
          >
            <img
              src={`/pokeTypes/${type}.webp`}
              alt={type}
              className="w-10 h-10 object-contain"
            />
            <span className="text-white text-xs font-bold capitalize ml-1">
              {type}
            </span>
          </div>
        ))}
        <PokeFavoriteButton id={id} />
      </div>
    </div>
  );
}
