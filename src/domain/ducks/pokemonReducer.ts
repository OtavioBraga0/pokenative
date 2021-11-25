import {
  createReducer,
  createAction,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';
import {PayloadActionCreator} from '@reduxjs/toolkit/src/createAction';
import {EngageState} from '../DomainLayer';
import {Pokemon} from '../entities/pokemon';
import {getPokemonsThunk} from '../thunks/pokemonThunk';

export type PokemonActionsType =
  | PayloadAction<Pokemon>
  | PayloadAction<null>
  | PayloadAction<boolean>;

export interface PokemonState {
  pokemons: Pokemon[];
  detailedPokemon: Pokemon | null;
  isLoading: boolean;
}

export const POKEMON_INITIAL_STATE: PokemonState = {
  pokemons: [],
  detailedPokemon: null,
  isLoading: false,
};

export const pokemonSelector = (state: EngageState): PokemonState =>
  state.pokemon;

export const isLoading: PayloadActionCreator<PokemonState> = createAction(
  'duck/pokemon/isLoading',
);

export const selectPokemon: PayloadActionCreator<Pokemon> = createAction(
  'duck/pokemon/selectPokemon',
);

function handleGetDetailedPokemons(
  state: PokemonState,
  action: PayloadAction<Pokemon[]>,
): PokemonState {
  return {
    ...state,
    pokemons: action.payload,
    isLoading: false,
  };
}

function handleSelectPokemon(
  state: PokemonState,
  action: PayloadAction<Pokemon>,
): PokemonState {
  return {
    ...state,
    detailedPokemon: action.payload,
    isLoading: false,
  };
}

function handlePending(state: PokemonState): PokemonState {
  return {
    ...state,
    isLoading: true,
  };
}

function handleRejected(state: PokemonState): PokemonState {
  return {
    ...state,
    isLoading: false,
  };
}

export const pokemonReducer: Reducer<PokemonState, PokemonActionsType> =
  createReducer(POKEMON_INITIAL_STATE, {
    [getPokemonsThunk.pending.type]: handlePending,
    [getPokemonsThunk.rejected.type]: handleRejected,
    [getPokemonsThunk.fulfilled.type]: handleGetDetailedPokemons,
    [selectPokemon.type]: handleSelectPokemon,
  });
