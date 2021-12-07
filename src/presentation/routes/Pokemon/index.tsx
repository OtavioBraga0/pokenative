import React, {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {pokemonSelector} from '../../../domain/ducks/pokemonReducer';
import {BG_COLORS, TYPE_COLORS} from '../../layout/constants';
import {
  BackButton,
  Container,
  Content,
  Id,
  MainContainer,
  Name,
  Sprite,
  style,
  TypeList,
} from './style';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
import {Type} from '../../../domain/entities/pokemon';
import {TypeCard} from '../../components/Type';
import {AboutTab} from '../../components/AboutTab';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {TabNavigation} from '../../components/TabNavigation';
import {
  getPokemonSpecieDetailThunk,
  getPokemonTypeDetailThunk,
} from '../../../domain/thunks/pokemonThunk';
import {ThemeProvider} from 'styled-components';

const Tab = createMaterialTopTabNavigator();

export type PokemonTheme = {
  theme: {
    color: string;
  };
};

export const Pokemon: React.FC = () => {
  const {detailedPokemon} = useSelector(pokemonSelector);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonSpecieDetailThunk(detailedPokemon?.name as string));
    dispatch(getPokemonTypeDetailThunk(detailedPokemon?.types as Type[]));
  }, [detailedPokemon?.name, detailedPokemon?.types, dispatch]);

  const theme = useMemo(
    () => ({color: TYPE_COLORS[detailedPokemon?.types[0].type.name as string]}),
    [detailedPokemon?.types],
  );

  return (
    detailedPokemon && (
      <ThemeProvider theme={theme}>
        <Container background={BG_COLORS[detailedPokemon.types[0].type.name]}>
          <View>
            <BackButton onPress={navigation.goBack}>
              <Ionicons name="arrow-back" color="#FFF" size={20} />
            </BackButton>
          </View>
          <MainContainer>
            <Sprite
              width={50}
              height={50}
              source={{
                uri: detailedPokemon.sprites.other['official-artwork']
                  .front_default,
              }}
            />
            <Content>
              <Id>#{detailedPokemon.id.toString().padStart(3, '0')}</Id>
              <Name>{detailedPokemon.name}</Name>
              <TypeList
                horizontal={true}
                data={detailedPokemon.types}
                keyExtractor={(typeExtractor: Type) => typeExtractor.type.name}
                renderItem={(type: {item: Type}) => <TypeCard {...type.item} />}
              />
            </Content>
          </MainContainer>
          <Tab.Navigator
            style={style.tabNavigation}
            tabBar={(props: MaterialTopTabBarProps) => (
              <TabNavigation {...props} />
            )}
            sceneContainerStyle={style.tabScreen}>
            <Tab.Screen name="About" component={AboutTab} />
            <Tab.Screen name="Stats" component={AboutTab} />
            <Tab.Screen name="Evolution" component={AboutTab} />
          </Tab.Navigator>
        </Container>
      </ThemeProvider>
    )
  );
};
