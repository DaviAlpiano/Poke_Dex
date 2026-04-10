import { useContext } from 'react';
import PokeContext from '../contexts/PokeContext';

export function LoadMoreButton() {
  const { loadMore, loading } = useContext(PokeContext);

  return (
    <div className="flex justify-center pb-12">
      <button
        onClick={loadMore}
        disabled={loading}
        className="
          bg-red-600 hover:bg-red-700 mt-10
          text-white font-black uppercase tracking-widest
          py-4 px-10 rounded-full
          shadow-[0_0_20px_rgba(220,38,38,0.4)]
          hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]
          transition-all duration-300
          active:scale-95 
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? 'Buscando na Pokedex mundial...' : 'Carregar mais Pokémon'}
      </button>
    </div>
  );
}
