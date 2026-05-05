import { useNavigate } from 'react-router-dom';
import type { EvolutionData } from '../types/api';
import { pokeNames } from '../utils/pokeNames';

export function EvolutionChain({
  evolutionData,
}: {
  evolutionData: EvolutionData[];
}) {
  const navigate = useNavigate();

  const handleNext = (pokemon: EvolutionData) => {
    const nextId = pokemon.id;
    const nextPokemon = pokeNames.find((p) => {
      const id = p.url.split('/').slice(-2, -1)[0];
      return id === nextId.toString();
    });

    if (nextPokemon) {
      navigate(`/Poke_Dex/pokemon/${nextPokemon.name.toLowerCase()}`);
    }
  };

  return (
    <section className="mt-6">
      <h2 className="text-white/70 font-bold uppercase tracking-widest mb-4">
        Evolution Chain
      </h2>
      <div className="flex flex-wrap items-center justify-around p-4 rounded-2xl backdrop-blur-sm border border-white/30">
        {evolutionData.map((evo) => (
          <div key={evo.id} className="flex items-center">
            <div
              className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-110"
              onClick={() => handleNext(evo)}
            >
              <div className=" bg-white/10 rounded-full flex items-center p-5 justify-center group-hover:bg-white/20 border border-white/5">
                <img
                  src={evo.image}
                  alt={evo.name}
                  className="w-30 h-30 object-contain"
                />
              </div>
              <span className="text-white text-[10px] font-bold capitalize mt-1 opacity-80">
                {evo.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
