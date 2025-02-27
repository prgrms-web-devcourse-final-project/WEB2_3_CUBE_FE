import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import closeIcon from '@/assets/notification-modal-close-icon.svg';
import { useModalPosition } from './hooks/useModalPosition';
import { useClickOutside } from './hooks/useClickOutside';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const BaseModal = ({
  isOpen,
  onClose,
  buttonRef,
  title,
  children,
  className = '',
}: BaseModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { modalPosition } = useModalPosition({ buttonRef, isOpen });

  useClickOutside({
    modalRef,
    buttonRef,
    isOpen,
    onClose,
  });

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed z-50'
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, x: 20 }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
          style={{
            width: '440px',
            height: '80vh',
            right: modalPosition,
            top: '40px',
          }}>
          <motion.div
            ref={modalRef}
            className={`w-full h-full p-3 border-2 border-white bg-white/30 backdrop-blur-lg rounded-3xl ${className}`}
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(8px)' }}
            transition={{ duration: 0.3 }}>
            <div className='w-full h-full bg-[#FCF7FD] p-11 rounded-2xl'>
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
              <h2 className='text-2xl font-bold text-[#162C63] mb-6'>
                {title}
              </h2>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
