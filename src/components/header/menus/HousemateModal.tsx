import { useRef, useEffect, useState } from 'react';
import { SearchInput } from '@/components/search-modal/SearchInput';
import rightIcon from '@/assets/housemate-right-icon.svg';
import closeIcon from '@/assets/housemate-modal-close-icon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { housemateAPI } from '@/apis/housemate';
import HousemateSkeletonItem from './HousemateSkeletonItem';
import { useInView } from 'react-intersection-observer';

type TabType = 'followers' | 'following';

// 하우스메이트 정보 타입 정의
interface Housemate {
  userId: number;
  nickname: string;
  profileImage?: string;
  bio?: string;
  status: 'ONLINE' | 'OFFLINE';
}

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

  // 하우스메이트 목록 상태 추가
  const [housemates, setHousemates] = useState<Housemate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { ref: observerRef, inView } = useInView();

  // API 호출 함수
  const fetchHousemates = async (cursor?: string) => {
    if (!cursor) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      const response = await (activeTab === 'followers'
        ? housemateAPI.getFollowers(
            cursor ? Number(cursor) : undefined,
            20,
            searchValue,
          )
        : housemateAPI.getFollowing(
            cursor ? Number(cursor) : undefined,
            20,
            searchValue,
          ));

      if (!cursor) {
        setHousemates(response.housemates || []);
      } else {
        setHousemates((prev) => [...prev, ...(response.housemates || [])]);
      }

      setNextCursor(response.nextCursor);
      setHasNext(response.hasNext);
    } catch (err) {
      setError('하우스메이트 목록을 불러오는데 실패했습니다.');
      console.error('하우스메이트 조회 에러:', err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  // 무한 스크롤 효과
  useEffect(() => {
    if (inView && hasNext && !isLoading && !isLoadingMore && nextCursor) {
      fetchHousemates(nextCursor);
    }
  }, [inView, hasNext, isLoading, isLoadingMore, nextCursor]);

  // 탭 변경 시 초기화
  useEffect(() => {
    if (isOpen) {
      setHousemates([]);
      setNextCursor(null);
      setHasNext(true);
      fetchHousemates();
    }
  }, [activeTab, isOpen]);

  // 검색어 변경 시 초기화 및 API 호출
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen) {
        setHousemates([]);
        setNextCursor(null);
        setHasNext(true);
        fetchHousemates();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, isOpen]);

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
            <div className='w-full h-full bg-[#FCF7FD] p-11 rounded-2xl flex flex-col'>
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
              <ul className='flex flex-col flex-1 gap-6 overflow-y-auto mt-4'>
                {isLoading ? (
                  // 초기 로딩 시 스켈레톤 UI
                  Array.from({ length: 5 }).map((_, index) => (
                    <HousemateSkeletonItem key={index} />
                  ))
                ) : error ? (
                  <div className='flex items-center justify-center flex-1'>
                    <p className='text-[#503A44]/50'>{error}</p>
                  </div>
                ) : housemates.length === 0 ? (
                  <div className='flex items-center justify-center flex-1'>
                    <p className='text-[#503A44]/50'>
                      {activeTab === 'followers'
                        ? '나를 추가한 메이트'
                        : '내가 추가한 메이트'}
                      가 없습니다.
                    </p>
                  </div>
                ) : (
                  <>
                    {housemates.map((housemate) => (
                      <li
                        key={housemate.userId}
                        className='gap-3 item-between'>
                        <div
                          aria-label='프로필 정보'
                          className='gap-2 item-middle'>
                          <img
                            src={
                              housemate.profileImage ||
                              'https://i.pinimg.com/736x/cc/5d/07/cc5d07daf1f1872eeebbfc1998b3adad.jpg'
                            }
                            alt='profile'
                            className='object-cover w-10 h-10 rounded-full'
                          />
                          <div aria-label='닉네임 및 상태'>
                            <p className='flex items-center gap-2'>
                              <span className='font-bold text-[#503A44] text-sm'>
                                {housemate.nickname}
                              </span>
                              <i
                                aria-label={`${
                                  housemate.status === 'ONLINE'
                                    ? '온라인'
                                    : '오프라인'
                                } 상태`}
                                className={`w-2 h-2 rounded-full ${
                                  housemate.status === 'ONLINE'
                                    ? 'bg-[#61E509]'
                                    : 'bg-gray-300'
                                }`}
                              />
                            </p>
                            {housemate.bio && (
                              <span
                                aria-label='소개'
                                className='text-xs text-[#503A44]/70 font-medium'>
                                {housemate.bio}
                              </span>
                            )}
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

                    {/* 무한 스크롤 옵저버 */}
                    {hasNext && (
                      <div
                        ref={observerRef}
                        className='py-2'>
                        {isLoadingMore && (
                          <div className='flex flex-col gap-6'>
                            {Array.from({ length: 3 }).map((_, index) => (
                              <HousemateSkeletonItem key={index} />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HousemateModal;
