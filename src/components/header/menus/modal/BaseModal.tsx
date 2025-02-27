import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalPosition } from '../hooks/useModalPosition';
import { useClickOutside } from '../hooks/useClickOutside';
import { CloseButton } from './CloseButton';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  title: string;
  children: React.ReactNode;
  className?: string;
  modalType?: 'notification' | 'housemate';
}

const getModalTheme = (type: 'notification' | 'housemate') => {
  switch (type) {
    case 'housemate':
      return {
        titleColor: 'text-[#D8297B]',
        bgColor: 'bg-[#FCF7FD]',
      };
    case 'notification':
    default:
      return {
        titleColor: 'text-[#162C63]',
        bgColor: 'bg-[#FCF7FD]',
      };
  }
};

export const BaseModal = ({
  isOpen,
  onClose,
  buttonRef,
  title,
  children,
  className = '',
  modalType = 'notification',
}: BaseModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { modalPosition } = useModalPosition({ buttonRef, isOpen });
  const theme = getModalTheme(modalType);

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
            top: modalType === 'housemate' ? '80px' : '40px',
          }}>
          <motion.div
            ref={modalRef}
            className={`w-full h-full p-3 border-2 border-white bg-white/30 backdrop-blur-lg rounded-3xl overflow-hidden ${className}`}
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(8px)' }}
            transition={{ duration: 0.3 }}>
            <div
              className={`w-full h-full ${theme.bgColor} p-11 rounded-2xl overflow-hidden`}>
              <CloseButton onClose={onClose} />
              <h2 className={`text-2xl font-bold ${theme.titleColor} mb-6`}>
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
