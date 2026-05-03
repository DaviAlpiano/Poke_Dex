import { useState } from 'react';
import { typeColors30 } from '../utils/typeData';
import { PokeFavoriteButton } from './PokeFavoriteButton';
import { MdGif, MdImage } from 'react-icons/md';
import type { FilteredPokemon } from '../types/api';

export function PokeData({ pokemon }: { pokemon: FilteredPokemon }) {
  const [activeMedia, setActiveMedia] = useState<'png' | 'gif'>('png');

  const officialArtwork = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const officialShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`;
  const gifAnimated = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;
  const gifShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${pokemon.id}.gif`;

  return (
    <div className="flex-1 flex flex-col items-center">
      <span className="text-white/50 font-black text-4xl self-start">
        #{pokemon.id.toString().padStart(3, '0')}
      </span>
      <div className="relative w-64 h-64 mt-4 flex items-center justify-center group bg-white/10 rounded-3xl border border-white/20 shadow-lg">
        <img
          src={activeMedia === 'png' ? officialArtwork : gifAnimated}
          alt={pokemon.name}
          className={`absolute transition-all duration-500 group-hover:opacity-0 ${
            activeMedia === 'png'
              ? 'w-64 h-64 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]'
              : 'min-w-30 min-h-30 object-contain'
          }`}
        />
        <img
          src={activeMedia === 'png' ? officialShiny : gifShiny}
          alt={`${pokemon.name} shiny`}
          className={`absolute transition-all duration-500 opacity-0 group-hover:opacity-100 ${
            activeMedia === 'png'
              ? 'w-64 h-64 drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]' // Brilho dourado para o Shiny
              : 'min-w-30 min-h-30 object-contain'
          }`}
        />
        <div className="z-10 absolute top-2 right-2 flex gap-1 bg-black/50 backdrop-blur-sm p-1 rounded-full border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setActiveMedia('png')}
            className={`p-2 rounded-full transition-colors ${activeMedia === 'png' ? 'bg-yellow-400 text-slate-900' : 'text-white/60 hover:bg-white/10'}`}
          >
            <MdImage className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveMedia('gif')}
            className={`p-2 rounded-full transition-colors ${activeMedia === 'gif' ? 'bg-yellow-400 text-slate-900' : 'text-white/60 hover:bg-white/10'}`}
          >
            <MdGif className="w-5 h-5" />
          </button>
        </div>
      </div>

      <h1 className="text-white text-5xl font-black capitalize mt-4">
        {pokemon.name}
      </h1>

      <div className="flex gap-2 mt-4">
        {pokemon.types.map((type: string) => (
          <span
            key={type}
            className={`px-6 py-2 rounded-full ${typeColors30[type] || 'bg-slate-200'} text-white font-bold backdrop-blur-md capitalize`}
          >
            {type}
          </span>
        ))}
        <PokeFavoriteButton id={pokemon.id} />
      </div>
    </div>
  );
}
