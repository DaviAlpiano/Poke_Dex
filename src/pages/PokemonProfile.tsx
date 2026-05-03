import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { typeColors30 } from '../utils/typeData';
import { EvolutionChain } from '../components/EvolutionChain';
import { PokeData } from '../components/PokeData';
import type {
  EvolutionData,
  FilteredPokemon,
  VariationData,
} from '../types/api';
import { PokeStats } from '../components/Pokestats';
import { PokeVariations } from '../components/PokeVariations';

interface VarietyPokemon {
  name: string;
  url: string;
}

interface VarietyEntry {
  is_default: boolean;
  pokemon: VarietyPokemon;
}

export default function PokemonProfile() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<FilteredPokemon>({
    id: 0,
    name: '',
    types: [],
    stats: [],
    weight: 0,
    height: 0,
    speciesUrl: '',
  });
  const [evolutionData, setEvolutionData] = useState<EvolutionData[]>([]);
  const [variations, setVariations] = useState<VariationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getPokemonDetails() {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name?.toLowerCase()}`,
        );
        if (!response.ok) throw new Error('Pokemon não encontrado');
        const data = await response.json();
        const filteredPokemon = {
          id: data.id,
          name: data.name,
          types: data.types.map((t: { type: { name: string } }) => t.type.name),
          stats: data.stats.map(
            (s: { stat: { name: string }; base_stat: number }) => ({
              name: s.stat.name,
              value: s.base_stat,
            }),
          ),
          weight: data.weight,
          height: data.height,
          speciesUrl: data.species.url,
        };
        setPokemon(filteredPokemon);

        const speciesRes = await fetch(data.species.url);
        const speciesData = await speciesRes.json();

        const otherVarieties = speciesData.varieties
          .filter((v: VarietyEntry) => v.is_default === false)
          .map((v: VarietyEntry) => {
            const id = parseInt(
              v.pokemon.url.split('/').filter(Boolean).pop() || '0',
            );
            return {
              name: v.pokemon.name,
              id: id,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            };
          });

        setVariations(otherVarieties);

        const evolutionRes = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionRes.json();
        const list = [];
        let currentStep = evolutionData.chain;

        while (currentStep) {
          const pokemonId = currentStep.species.url.split('/').slice(-2, -1)[0];
          list.push({
            name: currentStep.species.name,
            id: pokemonId,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
          });
          currentStep = currentStep.evolves_to[0];
        }

        setEvolutionData(list);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getPokemonDetails();
  }, [name]);

  const cardColor = typeColors30[pokemon.types[0]] || 'bg-slate-200';

  if (loading)
    return (
      <div className="p-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]  bg-black/40 rounded-lg">
          <img
            src="/pikachuRunning.gif"
            alt="Nenhum Pokémon favorito encontrado"
            className="w-64 opacity-75"
          />
          <p className="text-white font-bold mt-4 text-xl">
            Buscando dados na
            <span className="text-yellow-400"> PokeAPI!</span>
          </p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="p-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]  bg-black/40 rounded-lg">
          <img
            src="/noFavorites.png"
            alt="Nenhum Pokémon favorito encontrado"
            className="w-64 opacity-75 animate-pulse"
          />
          <p className="text-white font-bold mt-4 text-xl">
            Pokémon não
            <span className="text-yellow-400"> encontrado!</span>
          </p>
        </div>
      </div>
    );

  return (
    <div className="p-4 md:p-8 flex flex-col items-center">
      <div
        className={`w-full max-w-4xl ${cardColor} backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl md:flex-row gap-10`}
      >
        <div
          className={`w-full max-w-4xl backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl flex flex-col md:flex-row gap-10`}
        >
          <PokeData pokemon={pokemon} />
          <PokeStats pokemon={pokemon} />
        </div>
        {evolutionData && <EvolutionChain evolutionData={evolutionData} />}
        {variations.length > 0 && <PokeVariations variations={variations} />}
      </div>
    </div>
  );
}
