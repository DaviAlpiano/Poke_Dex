import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { typeColors30 } from '../utils/typeData';
import { MdImage, MdGif } from 'react-icons/md';

export default function PokemonProfile() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeMedia, setActiveMedia] = useState<'png' | 'gif'>('png');

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

  const cardColor =
    typeColors30[pokemon?.types[0]?.type.name] || 'bg-slate-200';

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

  const officialArtwork = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  const gifAnimated = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;

  return (
    <div className="p-4 md:p-8 flex flex-col items-center">
      <div
        className={`w-full max-w-4xl ${cardColor} backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl flex flex-col md:flex-row gap-10`}
      >
        <div className="flex-1 flex flex-col items-center">
          <span className="text-white/50 font-black text-4xl self-start">
            #{pokemon.id.toString().padStart(3, '0')}
          </span>
          <div className="relative w-64 h-64 mt-4 flex items-center justify-center group">
            <img
              src={activeMedia === 'png' ? officialArtwork : gifAnimated}
              alt={name}
              className={`transition-all duration-300 ${
                activeMedia === 'png'
                  ? 'w-64 h-64 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                  : 'min-w-30 min-h-30 object-contain'
              }`}
            />
            <div className="absolute top-2 right-2 flex gap-1 bg-black/50 backdrop-blur-sm p-1 rounded-full border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setActiveMedia('png')}
                title="Mostrar Imagem Oficial"
                className={`p-2 rounded-full transition-colors ${activeMedia === 'png' ? 'bg-yellow-400 text-slate-900' : 'text-white/60 hover:bg-white/10'}`}
              >
                <MdImage className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveMedia('gif')}
                title="Mostrar GIF Animado"
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
            {pokemon.types
              .map((t: { type: { name: string } }) => t.type.name)
              .map((type) => (
                <span
                  key={type}
                  className={`px-6 py-2 rounded-full ${typeColors30[type] || 'bg-slate-200'} text-white font-bold backdrop-blur-md capitalize`}
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
                <div
                  key={stat.stat.name}
                  className="flex items-center gap-4 text-white"
                >
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
          <section>
            <h2 className="text-white/70 font-bold uppercase tracking-widest mb-4">
              Width & Height
            </h2>
            <div className="space-y-3 bg-black/30 p-4 pr-10 rounded-lg">
              <div className="flex items-center gap-4 text-white">
                <span className="w-10 text-xs font-bold uppercase">Weight</span>
                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 shadow-[0_0_10px_#4ade80]"
                    style={{
                      width: `${Math.min((pokemon.weight / 10000) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <span className="w-8 text-right font-mono">
                  {pokemon.weight === 0 ? '?' : pokemon.weight / 10}kg
                </span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <span className="w-10 text-xs font-bold uppercase">height</span>
                <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 shadow-[0_0_10px_#4ade80]"
                    style={{
                      width: `${Math.min((pokemon.height / 1000) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <span className="w-8 text-right font-mono">
                  {pokemon.height / 10}m
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
