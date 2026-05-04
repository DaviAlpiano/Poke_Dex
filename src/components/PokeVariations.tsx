import { useNavigate } from 'react-router-dom';
import type { VariationData } from '../types/api';

export function PokeVariations({
  variations,
}: {
  variations: VariationData[];
}) {
  const navigate = useNavigate();

  return (
    <section className="mt-6">
      <h2 className="text-white/70 font-bold uppercase tracking-widest mb-4">
        Pokémon Variations
      </h2>
      <div className="flex flex-wrap items-center justify-around p-4 rounded-2xl backdrop-blur-sm border border-white/30">
        {variations.map((variation) => (
          <div key={variation.id} className="flex items-center">
            <div
              className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-110"
              onClick={() => navigate(`/Poke_Dex/pokemon/${variation.name}`)}
            >
              <div className=" bg-white/10 rounded-full flex items-center p-5 justify-center group-hover:bg-white/20 border border-white/5">
                <img
                  src={variation.image}
                  alt={variation.name}
                  className="w-30 h-30 object-contain"
                />
              </div>
              <span className="text-white text-[10px] font-bold capitalize mt-1 opacity-80">
                {variation.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
