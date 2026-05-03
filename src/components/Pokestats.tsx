import type { FilteredPokemon, PokemonStat } from '../types/api';

export function PokeStats({ pokemon }: { pokemon: FilteredPokemon }) {
  return (
    <div className="flex-1 space-y-6">
      <section>
        <h2 className="text-white/70 font-bold uppercase tracking-widest mb-4">
          Base Stats
        </h2>
        <div className="space-y-3 bg-black/30 p-4 rounded-lg">
          {pokemon.stats.map((stat: PokemonStat) => (
            <div key={stat.name} className="flex items-center gap-4 text-white">
              <span className="w-10 text-xs font-bold uppercase">
                {stat.name}
              </span>
              <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 shadow-[0_0_10px_#4ade80]"
                  style={{ width: `${stat.value / 2}%` }}
                ></div>
              </div>
              <span className="w-8 text-right font-mono">{stat.value}</span>
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
  );
}
