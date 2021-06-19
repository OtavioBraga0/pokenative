import React from 'react';
import {Pokemon, Type} from '../../domain/entities/pokemon';

import {pure} from 'recompose';

import {
  Bg,
  Card,
  Content,
  Id,
  Name,
  Sprite,
} from '../layout/components/PokemonCard';
import {BG_COLORS} from '../layout/constants';

// @ts-ignore
import bgDetails from '../assets/pokemonCard_bg.png';
import {TypeCard} from './TypeCard';
import {FlatList} from 'react-native';

const PurePokemonCard: React.FC<Pokemon> = ({name, types, id, sprites}) => {
  return (
    <Card background={BG_COLORS[types[0].type.name]}>
      <Bg source={bgDetails}>
        <Content>
          <Id>#{id.toString().padStart(3, '0')}</Id>
          <Name>{name}</Name>
          <FlatList
            horizontal={true}
            data={types}
            keyExtractor={(typeExtractor: Type) => typeExtractor.type.name}
            renderItem={(type: {item: Type}) => <TypeCard {...type.item} />}
          />
        </Content>
        <Sprite
          width={50}
          height={50}
          source={{uri: sprites.other['official-artwork'].front_default}}
        />
      </Bg>
    </Card>
  );
};

export const PokemonCard = pure(PurePokemonCard);
