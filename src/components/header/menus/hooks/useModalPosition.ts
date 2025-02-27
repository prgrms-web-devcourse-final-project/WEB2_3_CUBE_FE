import { useState, useEffect, useCallback } from 'react';

interface UseModalPositionProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
}

export const useModalPosition = ({
  buttonRef,
  isOpen,
}: UseModalPositionProps) => {
  const [modalPosition, setModalPosition] = useState('0px');

  const updateModalPosition = useCallback(() => {
    if (buttonRef.current) {
      const position = `calc(100% - ${
        buttonRef.current.getBoundingClientRect().left
      }px + 16px)`;
      setModalPosition(position);
    }
  }, [buttonRef]);

  useEffect(() => {
    if (isOpen) {
      updateModalPosition();
      window.addEventListener('resize', updateModalPosition);
    }

    return () => {
      window.removeEventListener('resize', updateModalPosition);
    };
  }, [isOpen, updateModalPosition]);

  return { modalPosition };
};
