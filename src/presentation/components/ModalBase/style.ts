// @ts-ignore
import styled from 'styled-components/native';
import {BACKGROUND_COLOR} from '../../layout/constants';

export const ModalBody = styled.View`
  position: absolute;
  bottom: -20px;
  left: -20px;
  right: -20px;

  height: auto;

  background-color: ${BACKGROUND_COLOR.white};

  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

  padding: 30px 40px;

  overflow: visible;
`;

export const Marker = styled.View`
  border-radius: 50px;
  width: 80px;
  height: 6px;

  position: absolute;
  background-color: ${BACKGROUND_COLOR.white};

  top: -12px;
  left: 50%;
`;
