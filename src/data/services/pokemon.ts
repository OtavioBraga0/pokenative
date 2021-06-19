import axios, {AxiosResponse} from 'axios';
import {Pokemon} from '../../domain/entities/pokemon';

export async function getPokemons(generation: string): Promise<Pokemon[]> {
  const resp = await axios.get(`generation/generation-${generation}`);

  return resp.data.pokemon_species;
}

export function getDetailedPokemon(
  name: string,
): Promise<AxiosResponse<Pokemon>> {
  return axios.get(`pokemon/${name}`);
}
