import { SearchInput } from '@/components/search-modal/SearchInput';
import { BaseModal } from '../modal/BaseModal';
import { TabMenu } from '../modal/TabMenu';
import { EmptyState } from '../modal/EmptyState';
import { useInfiniteScroll } from '../../../../hooks/useInfiniteScroll';
import { useHousemates } from '../hooks/useHousemates';
import { HousemateItem } from './components/HousemateItem';
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
    handleTabChange,
    housemates,
    isLoading,
    error,
    hasMore,
    fetchHousemates,
    nextCursor,
    userStatuses,
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
        onTabChange={handleTabChange}
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
        className='flex flex-col gap-6 px-4 mt-4 overflow-y-auto h-[calc(80vh-280px)] scrollbar scrollbar-pink'>
        {isLoading ? (
          <div className='flex flex-col gap-6'>
            {Array.from({ length: 8 }).map((_, index) => (
              <HousemateSkeletonItem key={index} />
            ))}
          </div>
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
              <HousemateItem
                key={housemate.userId}
                {...housemate}
                onClose={onClose}
                status={userStatuses[housemate.userId] || 'OFFLINE'}
              />
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
