import { useEffect } from 'react';

interface UseClickOutsideProps {
  modalRef: React.RefObject<HTMLDivElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
  excludeSelectors?: string[];
}

export const useClickOutside = ({
  modalRef,
  buttonRef,
  isOpen,
  onClose,
  excludeSelectors=[]
}: UseClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const isExcluded = excludeSelectors.some(selector => {
        const elements = document.querySelectorAll(selector);
        return Array.from(elements).some(element => element.contains(target));
      });

      if (isExcluded) {
        return;
      }

      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, modalRef, buttonRef, excludeSelectors]);
};
