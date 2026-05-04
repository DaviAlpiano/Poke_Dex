import { useState } from 'react';
import { usePoke } from '../contexts/usePoke';
import { pokemonTypes, typeColors } from '../utils/typeData';

export default function TypeFilters() {
  const { typeFilter, setTypeFilter, setTypeFilterOn } = usePoke();

  const [isOpen, setIsOpen] = useState(false);

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
    <div className="sticky top-40 md:top-20 z-40 w-full max-w-5xl mx-auto mb-10 px-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full md:w-64 mx-auto bg-white/30 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg transition-all active:scale-95 mb-4 text-white font-bold cursor-pointer"
      >
        <span>
          {typeFilter
            ? `Tipo: ${typeFilter.toUpperCase()}`
            : 'Filtrar por Tipo'}
        </span>
        <span
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </button>
      <div
        className={`
        overflow-hidden transition-all duration-500 ease-in-out
        ${isOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'}
      `}
      >
        <div className="bg-white/0.5 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/30">
          <div className="flex flex-wrap gap-3 justify-center">
            {pokemonTypes.map((type) => {
              const isSelected = typeFilter === type;
              return (
                <button
                  key={type}
                  className={`
                    px-4 py-2 cursor-pointer rounded-full text-white font-bold capitalize 
                    transition-all duration-300 ease-in-out hover:scale-110 
                    ${typeColors[type]}
                    ${isSelected ? 'ring-4 ring-white shadow-2xl scale-110' : 'opacity-80'}
                  `}
                  onClick={() => newTypeFilter(type)}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
