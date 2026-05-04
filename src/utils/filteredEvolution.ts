interface EvolutionSpecies {
  name: string;
  url: string;
}

interface EvolutionNode {
  species: EvolutionSpecies;
  evolves_to: EvolutionNode[];
}

interface EvolutionDataResponse {
  chain: EvolutionNode;
  id: number;
}

export function filteredEvolution(evolutionData: EvolutionDataResponse) {
  const list = [];
  const baseId = evolutionData.chain.species.url.split('/').slice(-2, -1)[0];
  list.push({
    name: evolutionData.chain.species.name,
    id: baseId,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${baseId}.png`,
  });

  evolutionData.chain.evolves_to.forEach((evolution: EvolutionNode) => {
    const evoId = evolution.species.url.split('/').slice(-2, -1)[0];
    list.push({
      name: evolution.species.name,
      id: evoId,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`,
    });

    evolution.evolves_to.forEach((thirdEvo: EvolutionNode) => {
      const thirdId = thirdEvo.species.url.split('/').slice(-2, -1)[0];
      list.push({
        name: thirdEvo.species.name,
        id: thirdId,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${thirdId}.png`,
      });
    });
  });
  return list;
}
