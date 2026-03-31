import { useContext } from 'react';
import PokeContext from './PokeContext';

export const usePoke = () => useContext(PokeContext);
