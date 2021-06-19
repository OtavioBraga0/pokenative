import React from 'react';
import {Type} from '../../domain/entities/pokemon';

import {Card, Name} from '../layout/components/TypeCard';
import {BACKGROUND_COLOR, TYPE_COLORS} from '../layout/constants';
import {TypeIcon} from './Icons';

export const TypeCard: React.FC<Type> = ({type}) => {
  return (
    <Card background={TYPE_COLORS[type.name]}>
      <TypeIcon name={type.name} color={BACKGROUND_COLOR.white} size={15} />
      <Name>{type.name}</Name>
    </Card>
  );
};
