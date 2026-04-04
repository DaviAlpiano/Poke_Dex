import { PokeProvider } from './contexts/PokeProvider.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import { Header } from './layouts/Header.tsx';
import Favorites from './pages/Favorites.tsx';

function App() {
  return (
    <PokeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </PokeProvider>
  );
}
export default App;
