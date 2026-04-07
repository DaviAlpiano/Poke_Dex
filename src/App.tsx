import { PokeProvider } from './contexts/PokeProvider.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { Header } from './layouts/Header.tsx';
import Favorites from './pages/Favorites.tsx';

function App() {
  return (
    <PokeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen overflow-x-hidden bg-[url('/fundo.png')] bg-cover bg-center bg-no-repeat bg-fixed">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </PokeProvider>
  );
}
export default App;
