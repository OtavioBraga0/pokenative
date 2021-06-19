export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: DefaultPokemonType[];
  game_indices: GameIndice[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: [];
  species: DefaultPokemonType;
  sprites: Sprite;
  stats: Stat[];
  types: Type[];
  weight: number;
}

export interface DefaultPokemonType {
  name: string;
  url: string;
}

export interface Ability {
  ability: DefaultPokemonType;
  is_hidden: boolean;
  slot: number;
}

export interface GameIndice {
  game_index: number;
  version: DefaultPokemonType;
}

export interface Move {
  move: DefaultPokemonType;
  version_group_details: VersionGroup[];
}

export interface VersionGroup {
  level_learned_at: number;
  move_learn_method: DefaultPokemonType;
  version_group: DefaultPokemonType;
}

export interface Sprite {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
  other: {
    [key: string]: {
      front_default: string;
      front_female?: string;
    };
  };
  versions: {
    [key: string]: {
      [key: string]: {
        back_default?: string;
        back_gray?: string;
        front_default: string;
        front_gray?: string;
        front_female?: string;
      };
    };
  };
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: DefaultPokemonType;
}

export interface Type {
  slot: number;
  type: DefaultPokemonType;
}
