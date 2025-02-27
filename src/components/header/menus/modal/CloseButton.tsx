import closeIcon from '@/assets/notification-modal-close-icon.svg';

interface CloseButtonProps {
  onClose: () => void;
}

export const CloseButton = ({ onClose }: CloseButtonProps) => {
  return (
    <button
      onClick={onClose}
      className='absolute right-10 top-10'
      aria-label='닫기'>
      <img
        src={closeIcon}
        alt='닫기'
        className='w-6 h-6'
      />
    </button>
  );
};
