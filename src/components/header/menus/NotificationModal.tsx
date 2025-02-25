import { useRef, useEffect, useState } from 'react';
import { SearchInput } from '@/components/search-modal/SearchInput';
import rightIcon from '@/assets/housemate-right-icon.svg';
import closeIcon from '@/assets/housemate-modal-close-icon.svg';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'pendingRead' | 'viewed';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const NotificationModal = ({
  isOpen,
  onClose,
  buttonRef,
}: NotificationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [modalPosition, setModalPosition] = useState('0px');
  const [activeTab, setActiveTab] = useState<TabType>('pendingRead');

  // 모달 위치 계산 함수
  const updateModalPosition = () => {
    if (buttonRef.current) {
      const position = `calc(100% - ${
        buttonRef.current.getBoundingClientRect().left
      }px + 16px)`;
      setModalPosition(position);
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateModalPosition();
      window.addEventListener('resize', updateModalPosition);
    }

    return () => {
      window.removeEventListener('resize', updateModalPosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
  }, [isOpen, onClose, buttonRef]);

  // 탭 변경 시 API 호출 등의 처리
  useEffect(() => {
    if (activeTab === 'pendingRead') {
      // TODO: 읽지 않음 목록 API 호출
    } else {
      // TODO: 읽음 목록 API 호출
    }
  }, [activeTab]);

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
            className='w-full h-full p-3 border-2 border-white bg-white/30 backdrop-blur-lg rounded-3xl'
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(8px)' }}
            transition={{ duration: 0.3 }}>
            <div className='w-full h-full bg-[#FCF7FD] p-11 rounded-2xl'>
              {/* 닫기 버튼 */}
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

              <h2 className='text-2xl font-bold text-[#162C63] mb-6'>알림</h2>

              {/* 탭 메뉴 */}
              <div className='flex bg-[#EBEFFB] rounded-lg mb-4 h-10 p-1 relative'>
                {/* 배경 애니메이션 */}
                <motion.div
                  className='absolute w-1/2 h-8 bg-[#2C5FBD]/80 rounded-md'
                  animate={{
                    x: activeTab === 'viewed' ? '100%' : '0',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                  }}
                />
                <button
                  onClick={() => setActiveTab('pendingRead')}
                  className={`flex-1 font-medium text-sm rounded-md relative z-10 transition-colors duration-300 ${
                    activeTab === 'pendingRead'
                      ? 'text-white'
                      : 'text-[#3E507D]'
                  }`}>
                  읽지 않음
                </button>
                <button
                  onClick={() => setActiveTab('viewed')}
                  className={`flex-1 font-medium text-sm rounded-md relative z-10 transition-colors duration-300 ${
                    activeTab === 'viewed' ? 'text-white' : 'text-[#3E507D]'
                  }`}>
                  읽음
                </button>
              </div>

              {/* 메이트 리스트 */}
              <ul className='overflow-y-auto max-h-[calc(100vh-400px)] flex flex-col gap-6'>
                {[1, 2, 3, 4].map((_, index) => (
                  <li
                    key={index}
                    className='gap-3 item-between'>
                    {/* 프로필 이미지 + 이름 + 온라인 상태 */}
                    <div
                      aria-label='프로필 정보'
                      className='gap-2 item-middle'>
                      <img
                        src='https://i.pinimg.com/736x/cc/5d/07/cc5d07daf1f1872eeebbfc1998b3adad.jpg'
                        alt='profile'
                        className='object-cover w-10 h-10 rounded-full'
                      />
                      <div aria-label='알림 내용'>
                        <p className='flex items-center'>
                          <span
                            aria-label='닉네임'
                            className='font-bold text-[#162C63] text-sm'>
                            찰스엔터
                          </span>
                          <span
                            aria-label='알림 내용'
                            className=' text-[#162C63] text-sm font-medium'>
                            님이 하우스 메이트로 추가했어요!
                          </span>
                        </p>
                        <span
                          aria-label='소개'
                          className='text-xs text-[#3E507D]/70'>
                          2024년 12월 12일
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
