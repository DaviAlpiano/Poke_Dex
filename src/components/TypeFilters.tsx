import { usePoke } from '../contexts/usePoke';
import { pokemonTypes, typeColors } from '../utils/typeData';

export default function TypeFilters() {
  const { typeFilter, typeFilterOn, setTypeFilter, setTypeFilterOn } =
    usePoke();

  const newTypeFilter = (type: string) => {
    if (typeFilter === type) {
      setTypeFilter('');
      setTypeFilterOn(false);
    } else {
      setTypeFilter(type);
      setTypeFilterOn(true);
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl max-w-5xl mx-auto mb-10 shadow-xl border border-white/30">
      <div className="flex flex-wrap gap-3 justify-center">
        {pokemonTypes.map((type) => {
          return (
            <button
              key={type}
              className={`px-4 py-2 cursor-pointer rounded-full text-white font-bold capitalize transition-all duration-300 ease-in-out hover:scale-110 ${typeColors[type]}`}
              onClick={() => {
                newTypeFilter(type);
              }}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
