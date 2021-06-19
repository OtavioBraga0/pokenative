import React, {useCallback, useEffect, useState} from 'react';
import {ModalBase, ModalBaseProps} from './ModalBase';
import {
  Title,
  Description,
  TitleFilter,
  HorizontalScroll,
  Filter,
  styles,
} from '../layout/components/FilterModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  filterSelector,
  handleFilterThunk,
} from '../../domain/ducks/filterReducer';
import {TypeBadge, HeightBadge, WeightBadge} from './FilterBadge';
import {ScrollView} from 'react-native';

const TYPES = [
  'bug',
  'dark',
  'dragon',
  'electric',
  'fairy',
  'fighting',
  'fire',
  'flying',
  'ghost',
  'grass',
  'ground',
  'ice',
  'normal',
  'poison',
  'psychic',
  'rock',
  'steel',
  'water',
];

const WEIGHT = ['light', 'normal', 'heavy'];
const HEIGHT = ['short', 'medium', 'tall'];

type FilterProps = {
  [key: string]: (number | string)[];
};

export const FilterModal: React.FC<ModalBaseProps> = ({...modalProps}) => {
  const {height, numberRange, types, weaknesses, weight} =
    useSelector(filterSelector);

  const [selectedFilters, setSelectedFilters] = useState<FilterProps>({
    height: [],
    numberRange: [],
    types: [],
    weaknesses: [],
    weight: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedFilters({
      height,
      numberRange,
      types,
      weaknesses,
      weight,
    });
  }, [types, weaknesses, weight, height, numberRange]);

  const handleSelect = useCallback(
    (selectedFilter: string | number, filter: string) => {
      setSelectedFilters(prev => {
        const checkFilter = prev[filter].indexOf(selectedFilter);

        if (checkFilter === -1) {
          return {...prev, [filter]: [...prev[filter], selectedFilter]};
        } else {
          return {
            ...prev,
            [filter]: prev[filter].filter(
              prevFilter => prevFilter !== selectedFilter,
            ),
          };
        }
      });
    },
    [],
  );

  return (
    <ModalBase {...modalProps}>
      <ScrollView style={styles.scrollContent}>
        <Title>Filter</Title>
        <Description>
          Use advanced search to explore Pokémon by type, weakness, height and
          more!
        </Description>
        <Filter>
          <TitleFilter>Types</TitleFilter>
          <HorizontalScroll
            horizontal
            data={TYPES}
            keyExtractor={(type: string) => type}
            renderItem={({item}: {item: string}) => (
              <TypeBadge
                onPress={() => handleSelect(item, 'types')}
                name={item}
                active={selectedFilters.types.indexOf(item) !== -1}
              />
            )}
          />
        </Filter>
        <Filter>
          <TitleFilter>Weakenesses</TitleFilter>
          <HorizontalScroll
            horizontal
            data={TYPES}
            keyExtractor={(type: string) => type}
            renderItem={({item}: {item: string}) => (
              <TypeBadge
                onPress={() => handleSelect(item, 'weaknesses')}
                name={item}
                active={selectedFilters.weaknesses.indexOf(item) !== -1}
              />
            )}
          />
        </Filter>
        <Filter>
          <TitleFilter>Heights</TitleFilter>
          <HorizontalScroll
            horizontal
            data={HEIGHT}
            keyExtractor={(type: number) => type}
            renderItem={({item}: {item: number}) => (
              <HeightBadge
                onPress={() => handleSelect(item, 'height')}
                name={item.toString()}
                active={selectedFilters.height.indexOf(item) !== -1}
              />
            )}
          />
        </Filter>
        <Filter>
          <TitleFilter>Weight</TitleFilter>
          <HorizontalScroll
            horizontal
            data={WEIGHT}
            keyExtractor={(type: number) => type}
            renderItem={({item}: {item: number}) => (
              <WeightBadge
                onPress={() => handleSelect(item, 'weight')}
                name={item.toString()}
                active={selectedFilters.weight.indexOf(item) !== -1}
              />
            )}
          />
        </Filter>
      </ScrollView>
    </ModalBase>
  );
};
