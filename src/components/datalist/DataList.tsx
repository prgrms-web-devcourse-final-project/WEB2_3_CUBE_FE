import { useEffect, useState } from 'react';
import NoEditStatusItem from './NoEditStatusItem';
import EditStatusItem from './EditStatusItem';
import classNames from 'classnames';
import { SearchInput } from '@components/search-modal/SearchInput';
import { useDebounce } from '@hooks/useDebounce';
import SkeletonItem from '@components/SkeletonItem';
import { bookAPI } from '@/apis/book';
import { deleteCdsFromMyRack } from '@/apis/cd';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useUserStore } from '@/store/useUserStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useToastStore } from '@/store/useToastStore';
import { AnimatePresence, motion } from 'framer-motion';

interface DataListProps {
  datas: DataListInfo[];
  type: string;
  onDelete?: (deletedIds: string[]) => void;
  hasMore: boolean;
  isLoading: boolean;
  fetchMore: () => void;
  userId: number;
  totalCount?: number;
  setSearchInput?: (value: string) => void;
  count?: number;
}

export default function DataList({
  datas,
  type,
  onDelete,
  hasMore,
  isLoading: isLoadingMore,
  fetchMore,
  userId,
  totalCount,
  setSearchInput,
  count,
}: DataListProps) {
  const isBook = type === 'book' ? true : false;
  const mainColor = isBook ? '#2656CD' : '#7838AF';
  const subColor = isBook ? 'text-[#3E507D]' : 'text-[#60308C]';
  const completeColor = isBook ? 'text-[#3E507D80]' : 'text-[#60308C]/70';
  const inputBgColor = isBook ? 'bg-[#C3D7FF26]' : 'bg-[#DDC3FF26]';

  const navigate = useNavigate();
  const myCdId = Number(useParams().cdId);
  const [isEdit, setIsEdit] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filteredDatas, setFilteredDatas] = useState<DataListInfo[]>(datas);
  const { showToast } = useToastStore();
  const myUserId = useUserStore().user.userId;

  const { listRef, observerRef } = useInfiniteScroll({
    fetchMore,
    isLoading: isLoadingMore,
    hasMore,
  });

  const debouncedQuery = useDebounce(currentInput, 800);

  // 검색어가 변경될 때마다 로컬에서 필터링
  useEffect(() => {
    if (currentInput !== debouncedQuery) {
      setIsSearching(true);
    }

    if (type === 'book') {
      if (debouncedQuery) {
        const filtered = datas.filter(
          (item) =>
            item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            item.author.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            item.publisher.toLowerCase().includes(debouncedQuery.toLowerCase()),
        );
        setFilteredDatas(filtered);
      } else {
        setFilteredDatas(datas);
      }
    } else {
      setSearchInput?.(debouncedQuery);
    }

    setIsSearching(false);
  }, [debouncedQuery, datas, type, setSearchInput]);

  // datas가 변경될 때 필터링된 데이터도 업데이트
  useEffect(() => {
    if (type === 'book') {
      if (!currentInput) {
        setFilteredDatas(datas);
      } else {
        const filtered = datas.filter(
          (item) =>
            item.title.toLowerCase().includes(currentInput.toLowerCase()) ||
            item.author.toLowerCase().includes(currentInput.toLowerCase()) ||
            item.publisher.toLowerCase().includes(currentInput.toLowerCase()),
        );
        setFilteredDatas(filtered);
      }
    } else {
      setFilteredDatas(datas);
    }
  }, [datas, currentInput, type]);

  const handleDelete = async () => {
    try {
      if (selectedIds.length === 0) {
        showToast('삭제할 항목을 선택해주세요.', 'error');
        return;
      }

      if (isBook) {
        // 도서 삭제 로직
        const myBookIds = selectedIds.join(',');
        await bookAPI.deleteBookFromMyBook(String(userId), myBookIds);
      } else {
        // CD 삭제 로직
        const myCdIds = selectedIds.map((item) => Number(item));
        await deleteCdsFromMyRack(myCdIds);
        if (myCdIds.includes(myCdId)) navigate(`/cdrack/${userId}`);
      }

      // UI 업데이트
      const updatedDatas = datas.filter(
        (data) => !selectedIds.includes(data.id),
      );
      setFilteredDatas(updatedDatas);
      onDelete?.(selectedIds);
      setSelectedIds([]);
      setIsEdit(false); // 편집 모드 종료

      // 성공 메시지
      showToast(`선택한 ${isBook ? '책' : 'CD'}이 삭제되었습니다.`, 'success');
    } catch (error: any) {
      console.error('삭제 중 오류가 발생했습니다:', error);
      showToast(
        error.response?.data?.message || '삭제 중 오류가 발생했습니다.',
        'error',
      );
    }
  };

  const handleItemSelect = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleEdit = () => {
    setIsEdit(true);
    setCurrentInput('');
  };

  const handleComplete = () => {
    setIsEdit(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{
          x: 0,
          transition: { shiffness: 100, damping: 15 },
        }}
        exit={{ x: '100%', transition: { duration: 0.3 } }}
        className='absolute top-0 right-0 w-[444px] h-screen bg-[#FFFAFA] overflow-hidden rounded-tl-3xl rounded-bl-3xl z-10'>
        <div className='pr-10 pl-11 h-full rounded-tl-3xl rounded-bl-3xl pt-15'>
          <span
            className={classNames(
              `text-4xl font-bold leading-normal text-center`,
              `text-[${mainColor}]`,
            )}>
            PlayList
          </span>

          {/* 총 갯수, 편집 버튼 */}
          <div className='flex gap-4 justify-between items-center mb-7 font-semibold mt-15'>
            <span
              className={classNames(
                `text-[18px]`,
                `${subColor}`,
                'font-semibold',
              )}>
              {`총 ${isBook ? count : totalCount}개`}
            </span>

            {isEdit ? (
              <div className='flex items-center gap-4.5'>
                <button
                  className={`cursor-pointer text-[${mainColor}]`}
                  onClick={handleDelete}>
                  삭제
                </button>
                <button
                  className={classNames(`cursor-pointer`, `${completeColor}`)}
                  onClick={handleComplete}>
                  완료
                </button>
              </div>
            ) : (
              userId === myUserId && (
                <button
                  className={classNames(
                    `font-semibold cursor-pointer text-[16px]`,
                    `text-[${mainColor}]`,
                  )}
                  onClick={handleEdit}>
                  편집
                </button>
              )
            )}
          </div>

          {/* 검색창 */}
          <SearchInput
            value={currentInput}
            onChange={setCurrentInput}
            placeholder='어떤 것이든 검색해보세요!'
            mainColor={mainColor}
            bgColor={inputBgColor}
          />

          {/* 리스트 */}
          <ul
            ref={listRef}
            className='flex flex-col max-h-[calc(100vh-350px)] gap-6 pr-2 overflow-y-auto scrollbar'>
            {isSearching ? (
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <SkeletonItem
                    key={`skeleton-${index}`}
                    isBook={isBook}
                  />
                ))
            ) : filteredDatas.length > 0 ? (
              <>
                {filteredDatas.map((data, index) => {
                  return isEdit ? (
                    <EditStatusItem
                      key={index}
                      data={data}
                      isBook={isBook}
                      isSelected={selectedIds.includes(data.id)}
                      onSelect={() => handleItemSelect(data.id)}
                    />
                  ) : (
                    <NoEditStatusItem
                      key={index}
                      data={data}
                      isBook={isBook}
                      userId={userId}
                    />
                  );
                })}
                {hasMore && (
                  <div
                    ref={observerRef}
                    className='py-2'>
                    {isLoadingMore && (
                      <div className='flex flex-col gap-6'>
                        {Array(3)
                          .fill(0)
                          .map((_, index) => (
                            <SkeletonItem
                              key={`loading-more-${index}`}
                              isBook={isBook}
                            />
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className='flex flex-col justify-center items-center h-40 text-gray-500'>
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
