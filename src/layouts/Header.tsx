import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

export function Header() {
  return (
    <header className="w-full bg-red-600 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/Poke_Dex" className="flex items-center gap-2">
            <img
              src="/pokebolaIcon.webp"
              alt="PokéDex Logo"
              className="w-8 h-8 animate-pulse"
            />
            <h1 className="text-white text-2xl font-black tracking-tighter uppercase">
              Poké<span className="text-yellow-400">Dex</span>
            </h1>
          </Link>
        </div>
        <SearchBar />
        <nav className="hidden sm:block">
          <ul className="flex gap-6 text-white font-bold">
            <li>
              <Link
                to="/Poke_Dex"
                className="text-white font-bold hover:text-yellow-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Poke_Dex/favorites"
                className="text-white font-bold hover:text-yellow-400 transition-colors"
              >
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
