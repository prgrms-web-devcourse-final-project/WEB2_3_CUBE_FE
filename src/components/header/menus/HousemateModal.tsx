import { useRef, useEffect, useState } from 'react';
import { SearchInput } from '@/components/search-modal/SearchInput';
import rightIcon from '@/assets/housemate-right-icon.svg';
import closeIcon from '@/assets/housemate-modal-close-icon.svg';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'followers' | 'following';

interface HousemateModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const HousemateModal = ({
  isOpen,
  onClose,
  buttonRef,
}: HousemateModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const [modalPosition, setModalPosition] = useState('0px');
  const [activeTab, setActiveTab] = useState<TabType>('followers');

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
    if (activeTab === 'followers') {
      // TODO: 팔로워 목록 API 호출
    } else {
      // TODO: 팔로잉 목록 API 호출
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
            top: '80px',
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

              <h2 className='text-2xl font-bold text-[#D8297B] mb-6'>
                하우스 메이트
              </h2>

              {/* 탭 메뉴 */}
              <div className='flex bg-[#F9E9F0] rounded-lg mb-4 h-10 p-1 relative'>
                {/* 배경 애니메이션 */}
                <motion.div
                  className='absolute w-1/2 h-8 bg-[#D8297B]/80 rounded-md'
                  animate={{
                    x: activeTab === 'following' ? '100%' : '0',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                  }}
                />
                <button
                  onClick={() => setActiveTab('followers')}
                  className={`flex-1 font-medium text-sm rounded-md relative z-10 transition-colors duration-300 ${
                    activeTab === 'followers'
                      ? 'text-white'
                      : 'text-[#AC2463]/70'
                  }`}>
                  나를 추가한
                </button>
                <button
                  onClick={() => setActiveTab('following')}
                  className={`flex-1 font-medium text-sm rounded-md relative z-10 transition-colors duration-300 ${
                    activeTab === 'following'
                      ? 'text-white'
                      : 'text-[#AC2463]/70'
                  }`}>
                  내가 추가한
                </button>
              </div>

              {/* 검색창 */}
              <SearchInput
                value={searchValue}
                onChange={setSearchValue}
                placeholder='누구를 찾고 계신가요?'
                mainColor='#E94C89'
                bgColor='bg-[#F1F1F1]/50'
              />

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
                      <div aria-label='닉네임 및 상태'>
                        <p className='flex items-center gap-2'>
                          <span className='font-bold text-[#503A44] text-sm'>
                            찰스엔터
                          </span>
                          {index === 0 && (
                            <i
                              aria-label='온라인 상태'
                              className='w-2 h-2 bg-[#61E509] rounded-full'></i>
                          )}
                          {index === 1 && (
                            <i
                              aria-label='오프라인 상태'
                              className='w-2 h-2 bg-gray-300 rounded-full'></i>
                          )}
                        </p>
                        <span
                          aria-label='소개'
                          className='text-xs text-[#503A44]/70 font-medium'>
                          제일 좋아하는 건 까만 해바라기 씨
                        </span>
                      </div>
                    </div>
                    <button className='flex items-center justify-center w-8 h-8'>
                      <img
                        src={rightIcon}
                        alt='하우스메이트 페이지 바로가기'
                        className='w-full h-full'
                      />
                    </button>
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

export default HousemateModal;
