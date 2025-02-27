import { SearchInput } from '@/components/search-modal/SearchInput';
import rightIcon from '@/assets/housemate-right-icon.svg';
import { BaseModal } from '../modal/BaseModal';
import { TabMenu } from '../modal/TabMenu';
import { LoadingState } from '../modal/LoadingState';
import { EmptyState } from '../modal/EmptyState';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useHousemates } from '../hooks/useHousemates';
import HousemateSkeletonItem from './components/HousemateSkeletonItem';

type TabType = 'followers' | 'following';

interface HousemateModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const TABS = [
  { id: 'followers' as const, label: '나를 추가한' },
  { id: 'following' as const, label: '내가 추가한' },
];

const HousemateModal = ({
  isOpen,
  onClose,
  buttonRef,
}: HousemateModalProps) => {
  const {
    searchValue,
    setSearchValue,
    activeTab,
    setActiveTab,
    housemates,
    isLoading,
    error,
    hasMore,
    fetchHousemates,
    nextCursor,
  } = useHousemates(isOpen);

  const { listRef, observerRef } = useInfiniteScroll({
    fetchMore: () => fetchHousemates(nextCursor || undefined),
    isLoading,
    hasMore,
  });

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      buttonRef={buttonRef}
      title='하우스 메이트'
      modalType='housemate'>
      <TabMenu<TabType>
        activeTab={activeTab}
        tabs={TABS}
        onTabChange={setActiveTab}
        modalType='housemate'
      />

      <SearchInput
        value={searchValue}
        onChange={setSearchValue}
        placeholder='누구를 찾고 계신가요?'
        mainColor='#E94C89'
        bgColor='bg-[#F1F1F1]/50'
      />

      <ul
        ref={listRef}
        className='flex flex-col gap-6 px-4 mt-4 overflow-y-auto h-[calc(80vh-280px)]'>
        {isLoading && !housemates.length ? (
          Array.from({ length: 5 }).map((_, index) => (
            <HousemateSkeletonItem key={index} />
          ))
        ) : error ? (
          <EmptyState message={error} />
        ) : housemates.length === 0 ? (
          <EmptyState
            message={`${
              activeTab === 'followers'
                ? '나를 추가한 메이트'
                : '내가 추가한 메이트'
            }가 없습니다.`}
          />
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
                          housemate.status === 'ONLINE' ? '온라인' : '오프라인'
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

            {hasMore && (
              <div
                ref={observerRef}
                className='py-2'>
                {isLoading && (
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
    </BaseModal>
  );
};

export default HousemateModal;
