import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { typeColors30 } from '../utils/typeData';

export default function PokemonProfile() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);
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
        setPokemon(data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getPokemonDetails();
  }, [name]);

  const cardColor = typeColors30[pokemon?.types[0]?.type.name] || 'bg-slate-200';

  if (loading)
    return (
      <div className="text-white text-center mt-20">
        Buscando dados na PokéAPI...
      </div>
    );
  if (error)
    return (
      <div className="text-white text-center mt-20">
        Pokémon não encontrado!
      </div>
    );

  console.log(cardColor);

  return (
    <main className="p-4 md:p-8 flex flex-col items-center">
      <div
        className={`w-full max-w-4xl ${cardColor} backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl flex flex-col md:flex-row gap-10`}
      >
        <div className="flex-1 flex flex-col items-center">
          <span className="text-white/50 font-black text-4xl self-start">
            #{pokemon.id.toString().padStart(3, '0')}
          </span>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={name}
            className="w-64 h-64 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          />
          <h1 className="text-white text-5xl font-black capitalize mt-4">
            {pokemon.name}
          </h1>

          <div className="flex gap-2 mt-4">
            {pokemon.types
              .map((t: { type: { name: string } }) => t.type.name)
              .map((type) => (
                <span
                  key={type}
                  className={`px-6 py-2 rounded-full ${typeColors30[type] || 'bg-slate-200'} text-white font-bold backdrop-blur-md`}
                >
                  {type}
                </span>
              ))}
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <section>
            <h2 className="text-white/70 font-bold uppercase tracking-widest mb-4">
              Base Stats
            </h2>
            <div className="space-y-3 bg-black/30 p-4 rounded-lg">
              {pokemon.stats.map((stat: any) => (
                <div className="flex items-center gap-4 text-white">
                  <span className="w-10 text-xs font-bold uppercase">
                    {stat.stat.name}
                  </span>
                  <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-400 shadow-[0_0_10px_#4ade80]"
                      style={{ width: `${stat.base_stat / 2}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-right font-mono">
                    {stat.base_stat}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
