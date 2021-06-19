import React, {Dispatch, SetStateAction, useCallback, useState} from 'react';
import {Marker, ModalBody} from '../layout/components/ModalBase';

import Modal from 'react-native-modal';
import {ViewProps} from 'react-native';

export interface ModalBaseProps extends ViewProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalBase: React.FC<ModalBaseProps> = ({
  open,
  setOpen,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
    setExpanded(false);
  }, [setOpen]);
  const handleSwipe = useCallback(
    ({swipingDirection}: {swipingDirection: string}) => {
      if (swipingDirection === 'down') {
        if (expanded) {
          setExpanded(false);
        } else {
          handleClose();
        }
      } else {
        if (!expanded) {
          setExpanded(true);
        }
      }
    },
    [handleClose, expanded],
  );

  return (
    <Modal
      isVisible={open}
      backdropOpacity={0.25}
      statusBarTranslucent={false}
      onBackdropPress={handleClose}
      onSwipeComplete={handleSwipe}
      swipeDirection={['down', 'up']}
      swipeThreshold={300}
      useNativeDriver
      propagateSwipe>
      <ModalBody expanded={expanded}>
        <Marker />
        {children}
      </ModalBody>
    </Modal>
  );
};
