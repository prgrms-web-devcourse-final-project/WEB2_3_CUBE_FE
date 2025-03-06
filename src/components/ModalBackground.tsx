import React from 'react';
import { createPortal } from 'react-dom';

const ModalBackground = React.memo(
  ({
    children,
    onClose,
  }: {
    children?: React.ReactNode;
    onClose?: () => void;
  }) => {
    const handlecloseModal = (
      event: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>,
    ) => {
      event.stopPropagation();
      onClose();
    };
    const modalContent = (
      <div
        className={`fixed inset-0 z-[99] w-full h-full flex justify-center items-center bg-[#1E3675CC] backdrop-blur-xs`}
        onClick={handlecloseModal}>
        <div onClick={(e) => e.stopPropagation()}>
          {/* children:  들어갈 모달 */}
          {children}
        </div>
      </div>
    );
    return createPortal(
      modalContent,
      document.body,
    );
  },
);

export default ModalBackground;
