import {
  createReducer,
  createAction,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';
import {PayloadActionCreator} from '@reduxjs/toolkit/src/createAction';
import {EngageState} from '../DomainLayer';
import {Pokemon, PokemonSpecieType} from '../entities/pokemon';
import {
  getPokemonSpecieDetailThunk,
  getPokemonsThunk,
  getPokemonTypeDetailThunk,
} from '../thunks/pokemonThunk';

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

export const getPokemonSpecieDetails: PayloadActionCreator<PokemonSpecieType> =
  createAction('duck/pokemon/getPokemonSpecieDetails');

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

function handleGetPokemonSpecieDetails(
  state: PokemonState,
  action: PayloadAction<PokemonSpecieType>,
): PokemonState {
  return {
    ...state,
    detailedPokemon: {
      ...(state.detailedPokemon as Pokemon),
      pokemon_specie: action.payload,
    },
    isLoading: false,
  };
}

function handleGetPokemonTypeDetail(
  state: PokemonState,
  action: PayloadAction<string[]>,
): PokemonState {
  return {
    ...state,
    detailedPokemon: {
      ...(state.detailedPokemon as Pokemon),
      weaknesses: action.payload,
    },
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
    [getPokemonSpecieDetailThunk.pending.type]: handlePending,
    [getPokemonSpecieDetailThunk.rejected.type]: handleRejected,
    [getPokemonSpecieDetailThunk.fulfilled.type]: handleGetPokemonSpecieDetails,
    [getPokemonTypeDetailThunk.pending.type]: handlePending,
    [getPokemonTypeDetailThunk.rejected.type]: handleRejected,
    [getPokemonTypeDetailThunk.fulfilled.type]: handleGetPokemonTypeDetail,
    [selectPokemon.type]: handleSelectPokemon,
  });
