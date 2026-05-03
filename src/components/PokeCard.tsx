import { Link } from 'react-router-dom';
import type { Pokemon } from '../types/api';
import { typeColors } from '../utils/typeData';
import { PokeFavoriteButton } from './PokeFavoriteButton';

export default function PokeCard({ pokemon }: { pokemon: Pokemon }) {
  const { name, id, types } = pokemon;
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
      <h2 className="bg-red-600 text-white px-4 py-1 rounded-full text-lg sm:text-xl font-extrabold capitalize tracking-tight mb-4 inline-block shadow-sm truncate">
        {name + ' Nº ' + id}
      </h2>
      <div className="relative w-full h-48 flex items-center justify-center bg-slate-50/50 rounded-2xl p-2 mb-4 overflow-hidden">
        <Link
          to={`/pokedex/pokemon/${name.toLocaleLowerCase()}`}
          className="absolute w-full h-full flex items-center justify-center"
        >
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
        </Link>
      </div>
      <div className="flex gap-2 justify-center w-full items-center">
        {types.map((type) => (
          <div
            key={type}
            className="flex items-center bg-white/20 rounded-full p-1 shadow-sm truncate"
          >
            <img
              src={`/pokeTypes/${type}.webp`}
              alt={type}
              className="w-10 h-10 object-contain"
            />
          </div>
        ))}
        <PokeFavoriteButton pokemon={pokemon} />
      </div>
    </div>
  );
}
