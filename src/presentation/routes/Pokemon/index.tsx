import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {pokemonSelector} from '../../../domain/ducks/pokemonReducer';
import {BG_COLORS} from '../../layout/constants';
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
import {TypeCard} from '../../components/TypeCard';
import {AboutTab} from '../../components/AboutTab';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {TabNavigation} from '../../components/TabNavigation';

const Tab = createMaterialTopTabNavigator();

export const Pokemon: React.FC = () => {
  const {detailedPokemon} = useSelector(pokemonSelector);

  const navigation = useNavigation();

  return (
    detailedPokemon && (
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
          )}>
          <Tab.Screen name="About" component={AboutTab} />
          <Tab.Screen name="Stat" component={AboutTab} />
          <Tab.Screen name="Evolution" component={AboutTab} />
        </Tab.Navigator>
      </Container>
    )
  );
};
