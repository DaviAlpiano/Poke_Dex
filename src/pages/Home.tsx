import { usePoke } from '../contexts/usePoke';
import type { Pokemons } from '../types/api';

export default function Home() {
  const { pokemonList } = usePoke();
  return (
    <div>
      {pokemonList.map((pokemon: Pokemons) => (
        <div key={pokemon.name}>{pokemon.name}</div>
      ))}
    </div>
  );
}
