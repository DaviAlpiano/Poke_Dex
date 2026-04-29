import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pokeNames } from '../utils/pokeNames';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const suggestions = pokeNames
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 10);

  const handleSelect = (name: string) => {
    setQuery('');
    setShowSuggestions(false);
    navigate(`/pokedex/pokemon/${name}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-60">
      <div className="flex items-center bg-white/20 backdrop-blur-md rounded-2xl p-2 border border-white/30 shadow-lg">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Pesquisar Pokémon..."
          className="w-full bg-transparent outline-none px-4 text-white placeholder:text-white/60 font-bold"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && suggestions.length > 0) {
              handleSelect(suggestions[0].name);
            }
          }}
        />
        <span className="pr-4">🔍</span>
      </div>

      {showSuggestions && query.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/50">
          {suggestions.length > 0 ? (
            suggestions.map((p) => (
              <li
                key={p.url.split('/').slice(-2, -1)[0]}
                onClick={() => handleSelect(p.name)}
                className="px-6 py-3 hover:bg-red-500 hover:text-white cursor-pointer font-bold text-slate-700 transition-colors flex justify-between items-center"
              >
                <span>{p.name.toUpperCase()}</span>
                <span className="text-xs opacity-50">
                  #0{p.url.split('/').slice(-2, -1)[0]}
                </span>
              </li>
            ))
          ) : (
            <li className="px-6 py-3 text-slate-400 text-sm">
              Nenhum Pokémon encontrado...
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
