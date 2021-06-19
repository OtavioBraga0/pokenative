import React, {useCallback} from 'react';
import {ModalBase, ModalBaseProps} from './ModalBase';
import {
  Title,
  Description,
  ButtonAction,
  ButtonActionText,
  Content,
} from '../layout/components/SortFilterModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  filterSelector,
  handleFilterThunk,
} from '../../domain/ducks/filterReducer';
import {TouchableOpacityProps} from 'react-native';

export const SortFilterModal: React.FC<ModalBaseProps> = ({...modalProps}) => {
  const {sort} = useSelector(filterSelector);

  const dispatch = useDispatch();

  const handleSelectSort = useCallback(
    (selectedSort: string) => {
      dispatch(handleFilterThunk({sort: selectedSort}));
    },
    [dispatch],
  );

  return (
    <ModalBase {...modalProps}>
      <Content>
        <Title>Sort</Title>
        <Description>
          Sort Pokémons alphabetically or by National Pokédex number!
        </Description>
        <Button
          activated={sort === 'asc'}
          onPress={() => handleSelectSort('asc')}>
          Smallest number first
        </Button>
        <Button
          activated={sort === 'desc'}
          onPress={() => handleSelectSort('desc')}>
          Highest number first
        </Button>
        <Button
          activated={sort === 'a-z'}
          onPress={() => handleSelectSort('a-z')}>
          A - Z
        </Button>
        <Button
          activated={sort === 'z-a'}
          onPress={() => handleSelectSort('z-a')}>
          Z - A
        </Button>
      </Content>
    </ModalBase>
  );
};

interface ButtonProps extends TouchableOpacityProps {
  activated: boolean;
}

const Button: React.FC<ButtonProps> = ({children, activated, ...rest}) => {
  return (
    <ButtonAction activated={activated} {...rest}>
      <ButtonActionText activated={activated}>{children}</ButtonActionText>
    </ButtonAction>
  );
};
