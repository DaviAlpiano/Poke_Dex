import { PokeProvider } from './contexts/PokeProvider.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';

function App() {
  return (
    <PokeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </PokeProvider>
  );
}
export default App;
