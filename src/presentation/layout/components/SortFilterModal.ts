// @ts-ignore
import styled from 'styled-components/native';
import {BACKGROUND_COLOR, TEXT_COLOR} from '../constants';

type ButtonProps = {
  activated: boolean;
};

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

  margin-bottom: 15px;
`;

export const ButtonAction = styled.TouchableOpacity`
  padding: 20px 0;
  align-items: center;
  justify-content: center;

  background-color: ${(props: ButtonProps) =>
    props.activated ? BACKGROUND_COLOR.button : BACKGROUND_COLOR.default_input};

  border-radius: 10px;

  margin-top: 20px;
`;

export const ButtonActionText = styled.Text`
  color: ${(props: ButtonProps) =>
    props.activated ? TEXT_COLOR.white : TEXT_COLOR.grey};

  font-size: 16px;
  line-height: 19px;
`;

export const Content = styled.ScrollView`
  margin: 0 -40px;
  padding: 0 40px;
`;
