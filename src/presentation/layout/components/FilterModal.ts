// @ts-ignore
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';
import {TEXT_COLOR} from '../constants';

export const Title = styled.Text`
  font-weight: bold;
  font-size: 26px;
  line-height: 31px;

  color: ${TEXT_COLOR.black};

  margin-bottom: 5px;
`;

export const Description = styled.Text`
  font-size: 16px;
  line-height: 19px;
  color: ${TEXT_COLOR.grey};

  margin-bottom: 45px;
`;

export const TitleFilter = styled.Text`
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: ${TEXT_COLOR.black};

  margin-bottom: 10px;
`;

export const HorizontalScroll = styled.FlatList`
  padding-bottom: 10px;
`;

export const Filter = styled.View`
  margin-bottom: 35px;
`;

export const styles = StyleSheet.create({
  scrollContent: {
    marginHorizontal: -30,
    paddingHorizontal: 30,
  },
});
