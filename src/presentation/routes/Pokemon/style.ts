import {SafeAreaViewProps} from 'react-native-safe-area-context';
// @ts-ignore
import styled from 'styled-components/native';

interface ContainerProp extends SafeAreaViewProps {
  background: string;
}

export const Container = styled.SafeAreaView`
  background-color: ${(props: ContainerProp) => props.background};
  height: 100%;
`;

export const BackButton = styled.TouchableOpacity`
  width: 100%;
`;
