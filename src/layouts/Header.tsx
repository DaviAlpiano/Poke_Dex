import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import pokeLogo from '/public/pokebolaIcon.webp';

export function Header() {
  return (
    <header className="w-full bg-red-600 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-auto flex justify-between items-center">
          <Link to="/Poke_Dex" className="flex items-center gap-2">
            <img
              src={pokeLogo}
              alt="PokéDex Logo"
              className="w-8 h-8 animate-pulse"
            />
            <h1 className="text-white text-2xl font-black tracking-tighter uppercase">
              Poké<span className="text-yellow-400">Dex</span>
            </h1>
          </Link>
          <nav className="md:hidden">
            <Link
              to="/Poke_Dex/favorites"
              className="text-white text-sm font-bold bg-white/10 px-3 py-1 rounded-full"
            >
              ★ Favs
            </Link>
          </nav>
        </div>
        <div className="w-full md:max-w-xs lg:max-w-md">
          <SearchBar />
        </div>
        <nav className="hidden md:block">
          <ul className="flex gap-6 text-white font-bold">
            <li>
              <Link
                to="/Poke_Dex"
                className="hover:text-yellow-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Poke_Dex/favorites"
                className="hover:text-yellow-400 transition-colors"
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
