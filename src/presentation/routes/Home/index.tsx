import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {pokemonSelector} from '../../../domain/ducks/pokemonReducer';
import {getPokemonsThunk} from '../../../domain/thunks/pokemonThunk';
import {PokemonCard} from '../../components/PokemonCard';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import {
  Description,
  Header,
  Search,
  Title,
  Content,
  SearchInput,
  FilterButton,
  styles,
  Main,
} from './style';
import {BACKGROUND_COLOR, TEXT_COLOR} from '../../layout/constants';
import {SafeAreaView} from 'react-native-safe-area-context';

import {SortFilterModal} from '../../components/SortModal';
import {filterSelector} from '../../../domain/ducks/filterReducer';
import {Pokemon} from '../../../domain/entities/pokemon';
import {GenerationFilterModal} from '../../components/GenerationFilterModal';
import {Loading} from '../../components/Loading';
import {FilterModal} from '../../components/FilterModal';

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const {pokemons, isLoading} = useSelector(pokemonSelector);
  const {sort, generation, types, height, weight} = useSelector(filterSelector);

  const [search, setSearch] = useState<string>('');

  const [sortModalOpen, setSortModalOpen] = useState<boolean>(false);
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
  const [generationModalOpen, setGenerationModalOpen] =
    useState<boolean>(false);

  const fetchPokemons = useCallback(() => {
    dispatch(getPokemonsThunk());
  }, [dispatch]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons, generation]);

  const handleSort = useCallback(
    (currentPokemon: Pokemon, nextPokemon: Pokemon) => {
      switch (sort) {
        case 'desc':
          return currentPokemon.id < nextPokemon.id
            ? 1
            : currentPokemon.id === nextPokemon.id
            ? 0
            : -1;
        case 'a-z':
          return currentPokemon.name < nextPokemon.name
            ? -1
            : currentPokemon.name === nextPokemon.name
            ? 0
            : 1;
        case 'z-a':
          return currentPokemon.name < nextPokemon.name
            ? 1
            : currentPokemon.name === nextPokemon.name
            ? 0
            : -1;
        default:
          return currentPokemon.id < nextPokemon.id
            ? -1
            : currentPokemon.id === nextPokemon.id
            ? 0
            : 1;
      }
    },
    [sort],
  );

  const handleFilterByName = useCallback(
    (pokemon: Pokemon) =>
      pokemon && pokemon.name.indexOf(search.toLowerCase()) !== -1,
    [search],
  );

  const handleFilterByType = useCallback(
    (pokemon: Pokemon) => {
      const haveType = pokemon.types.map(type =>
        types.includes(type.type.name),
      );

      return haveType.includes(true);
    },
    [types],
  );

  const handleFilterByHeight = useCallback(
    (pokemon: Pokemon) => {
      let listOfHeight = [];

      if (height.includes('short')) {
        listOfHeight.push(pokemon.height < 22);
      }
      if (height.includes('medium')) {
        listOfHeight.push(pokemon.height >= 22 && pokemon.height < 44);
      }
      if (height.includes('tall')) {
        listOfHeight.push(pokemon.height >= 44 && pokemon.height < 66);
      }

      return listOfHeight.includes(true);
    },
    [height],
  );

  const handleFilterByWeight = useCallback(
    (pokemon: Pokemon) => {
      let listOfHeight = [];

      if (height.includes('light')) {
        listOfHeight.push(pokemon.height < 3166);
      }
      if (height.includes('normal')) {
        listOfHeight.push(pokemon.height >= 3166 && pokemon.height < 6332);
      }
      if (height.includes('heavy')) {
        listOfHeight.push(pokemon.height >= 6332 && pokemon.height < 9600);
      }

      return listOfHeight.includes(true);
    },
    [height],
  );

  return (
    <SafeAreaView style={{backgroundColor: BACKGROUND_COLOR.white}}>
      <Header>
        <FilterButton onPress={() => setGenerationModalOpen(true)}>
          <FontistoIcon
            name="nav-icon-grid-a"
            color={TEXT_COLOR.black}
            size={20}
          />
        </FilterButton>
        <FilterButton
          style={styles.rotate90}
          onPress={() => setSortModalOpen(true)}>
          <FontistoIcon name="arrow-swap" color={TEXT_COLOR.black} size={20} />
        </FilterButton>
        <FilterButton onPress={() => setFilterModalOpen(true)}>
          <FontistoIcon name="filter" color={TEXT_COLOR.black} size={20} />
        </FilterButton>
      </Header>
      <Main>
        <Content
          ListEmptyComponent={<Loading isLoading={isLoading} />}
          ListHeaderComponent={
            <>
              <Title>Pokédex</Title>
              <Description>
                Search for Pokémon by name or using the National Pokédex number.
              </Description>
              <Search>
                <FontAwesomeIcon
                  name="search"
                  color={TEXT_COLOR.grey}
                  size={16}
                />
                <SearchInput
                  placeholder="What Pokémon are you looking for?"
                  value={search}
                  onChangeText={(value: string) => setSearch(value)}
                />
              </Search>
            </>
          }
          data={
            isLoading
              ? []
              : pokemons
                  .slice()
                  .sort(handleSort)
                  .filter(handleFilterByName)
                  .filter((pokemon: Pokemon) =>
                    types.length > 0 ? handleFilterByType(pokemon) : true,
                  )
                  .filter((pokemon: Pokemon) =>
                    height.length > 0 ? handleFilterByHeight(pokemon) : true,
                  )
                  .filter((pokemon: Pokemon) =>
                    weight.length > 0 ? handleFilterByWeight(pokemon) : true,
                  )
          }
          renderItem={({item}: {item: Pokemon}) => <PokemonCard {...item} />}
          keyExtractor={(pokemon: Pokemon) => pokemon.name}
        />
      </Main>
      <SortFilterModal open={sortModalOpen} setOpen={setSortModalOpen} />
      <FilterModal open={filterModalOpen} setOpen={setFilterModalOpen} />
      <GenerationFilterModal
        open={generationModalOpen}
        setOpen={setGenerationModalOpen}
      />
    </SafeAreaView>
  );
};
