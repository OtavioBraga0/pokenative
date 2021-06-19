import {Dispatch} from 'redux';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {EngageState} from '../DomainLayer';
import {Pokemon} from '../entities/pokemon';
import {getDetailedPokemon, getPokemons} from '../../data/services/pokemon';
import {AxiosResponse} from 'axios';

export interface ThunkApi {
  dispatch: Dispatch;
  state: EngageState;
  rejectValue: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

const getPokemonDetails = (
  pokemon: Pokemon,
): Promise<AxiosResponse<Pokemon>> => {
  return getDetailedPokemon(pokemon.name);
};

export const getPokemonsThunk = createAsyncThunk<Pokemon[], void, ThunkApi>(
  'thunk/pokemon/getPokemonThunk',
  async (_, thunkAPI) => {
    try {
      const {generation} = thunkAPI.getState().filter;

      const listPokemons = await getPokemons(generation);

      const detailedPokemons = listPokemons.map(pokemon =>
        getPokemonDetails(pokemon),
      );

      const pokemons: Pokemon[] = await Promise.all(
        detailedPokemons.map(result => result.catch(e => e)),
      ).then(results => results.map(result => result.data));

      return pokemons;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
