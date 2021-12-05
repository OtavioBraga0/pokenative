import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {pokemonSelector} from '../../../domain/ducks/pokemonReducer';
import {BG_COLORS} from '../../layout/constants';
import {BackButton, Container} from './style';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';

export const Pokemon: React.FC = () => {
  const {detailedPokemon} = useSelector(pokemonSelector);

  const navigation = useNavigation();

  return (
    detailedPokemon && (
      <Container background={BG_COLORS[detailedPokemon.types[0].type.name]}>
        <View>
          <BackButton onPress={navigation.goBack}>
            <Ionicons name="arrow-back" />
          </BackButton>
        </View>
        <Text>{detailedPokemon.name}</Text>
      </Container>
    )
  );
};
