import { createContext } from 'react';
import type { PokeContextType } from '../types/api';

const PokeContext = createContext({} as PokeContextType);

export default PokeContext;
