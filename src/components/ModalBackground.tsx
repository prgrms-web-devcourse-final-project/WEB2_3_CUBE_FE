import React from 'react';

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
    return (
      <div
        className='fixed inset-0 z-[99] w-full h-full flex justify-center items-center bg-[#1E3675CC] backdrop-blur-xs'
        onClick={handlecloseModal}>
        <div onClick={(e) => e.stopPropagation()}>
          {/* children:  들어갈 모달 */}
          {children}
        </div>
      </div>
    );
  },
);

export default ModalBackground;
