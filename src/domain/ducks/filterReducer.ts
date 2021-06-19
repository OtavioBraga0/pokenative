import {
  createReducer,
  createAction,
  PayloadAction,
  Reducer,
} from '@reduxjs/toolkit';
import {PayloadActionCreator} from '@reduxjs/toolkit/src/createAction';
import {EngageState} from '../DomainLayer';

export type FilterActionsType = PayloadAction<null> | PayloadAction<boolean>;

export interface FilterState {
  types: string[];
  weaknesses: string[];
  sort: 'asc' | 'desc' | 'a-z' | 'z-a';
  generation: string;
  height: number[];
  weight: number[];
  numberRange: number[];
}

export const FILTER_INITIAL_STATE: FilterState = {
  types: [],
  weaknesses: [],
  sort: 'asc',
  generation: 'i',
  height: [],
  weight: [],
  numberRange: [],
};

export const filterSelector = (state: EngageState): FilterState => state.filter;

export const handleFilterThunk: PayloadActionCreator<{
  [key: string]: string | string[] | number[];
}> = createAction('duck/filter/handleFilter');

function handleFilter(
  state: FilterState,
  action: PayloadAction<{[key: string]: string | string[] | number[]}>,
): FilterState {
  return {
    ...state,
    ...action.payload,
  };
}

export const filterReducer: Reducer<FilterState, FilterActionsType> =
  createReducer(FILTER_INITIAL_STATE, {
    [handleFilterThunk.type]: handleFilter,
  });
