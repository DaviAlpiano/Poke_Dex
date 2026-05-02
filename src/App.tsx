import { PokeProvider } from './contexts/PokeProvider.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { Header } from './layouts/Header.tsx';
import Favorites from './pages/Favorites.tsx';
import { Footer } from './layouts/Footer.tsx';
import PokemonProfile from './pages/PokemonProfile.tsx';

function App() {
  return (
    <PokeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen overflow-x-hidden bg-[url('/fundo.png')] bg-cover bg-center bg-no-repeat bg-fixed">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/pokedex" replace />} />
              <Route path="/pokedex" element={<Home />} />
              <Route path="/pokedex/favorites" element={<Favorites />} />
              <Route
                path="/pokedex/pokemon/:name"
                element={<PokemonProfile />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </PokeProvider>
  );
}
export default App;
