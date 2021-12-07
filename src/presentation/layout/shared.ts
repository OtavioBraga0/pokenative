// @ts-ignore
import styled from 'styled-components/native';
import {StyleSheet} from 'react-native';

type GapType = {
  size: number;
  gapDirection: 'row' | 'column';
};

export const Gap = styled.View`
  ${(props: GapType) =>
    props.gapDirection === 'row'
      ? `
  margin-right: ${props.size};`
      : `
  margin-top: ${props.size};`}
`;

export const style = StyleSheet.create({
  capitilize: {
    textTransform: 'capitalize',
  },
});
