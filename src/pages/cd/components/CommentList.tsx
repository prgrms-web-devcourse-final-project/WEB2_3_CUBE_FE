import ModalBackground from '@components/ModalBackground';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import trashIcon from '@assets/cd/trash-icon.svg';
import { SearchInput } from '@components/search-modal/SearchInput';
import Pagination from '@components/Pagination';
import { useParams } from 'react-router-dom';
import { deleteCdComment, getCdComment } from '@apis/cd';
import { formatDate } from '@utils/dateFormat';
import { useDebounce } from '@hooks/useDebounce';
import SkeletonItem from '@components/SkeletonItem';
import { useUserStore } from '@/store/useUserStore';
import { motion } from 'framer-motion';
import { useToastStore } from '@/store/useToastStore';

const CommentList = React.memo(({ onClose }: { onClose: () => void }) => {
  const [currentInput, setCurrentInput] = useState('');
  const [cdComments, setCdComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = useRef<number>(1);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(currentInput, 500);
  const myCdId = Number(useParams().cdId);

  const myUserId = useUserStore((state) => state.user).userId;
  const userId = Number(useParams().userId);
  const { showToast } = useToastStore();

  // 작성자이거나 방주인일 경우에만 삭제 가능
  const isAccessible = useCallback(
    (commentUerId: number) => userId === myUserId || myUserId === commentUerId,
    [userId, myUserId],
  );

  useEffect(() => {
    const fetchCdComments = async () => {
      try {
        setIsSearching(true);
        const result =
          currentInput === ''
            ? await getCdComment(myCdId, currentPage, 5)
            : await getCdComment(myCdId, currentPage, 5, currentInput);
        totalPage.current = result.totalPages;

        setCdComments(result.data);
      } catch (error) {
        console.error(error);
        setCdComments([]);
      } finally {
        setIsSearching(false);
      }
    };
    fetchCdComments();
  }, [currentPage, debouncedQuery]);

  useEffect(() => {
    if (currentInput !== debouncedQuery) {
      setIsSearching(true);
    }
  }, [currentInput, debouncedQuery]);

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleDeleteComment = async (commentId: number) => {
    const previousComments = [...cdComments];

    try {
      setCdComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId),
      );
      await deleteCdComment(myCdId, commentId);
      showToast('댓글이 삭제되었어요!', 'success');
    } catch (error) {
      setCdComments(previousComments);
      console.error(error);
    }
  };

  return (
    <ModalBackground onClose={onClose}>
      <div className=''>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.95, x: 20 }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
          className='w-[662px] h-[690px] rounded-3xl border-2 border-[#FCF7FD] shadow-box  backdrop-blur-[15px] p-4  '>
          <div className='w-full  h-full bg-[#FCF7FD] rounded-[16px]  backdrop-blur-[15px] py-10 px-27'>
            <h1 className='text-[#7838AF]  text-2xl font-bold text-center mb-7'>
              댓글 목록
            </h1>

            {/*  입력 창 */}
            <SearchInput
              value={currentInput}
              onChange={setCurrentInput}
              placeholder='어떤 댓글을 삭제할까요?'
              mainColor='#7838AF'
            />

            {/* 댓글 목록 */}

            <ul className='flex flex-col  gap-3 mt-6 mb-5 overflow-auto h-[390px]  '>
              {isSearching ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <SkeletonItem
                      key={`skeleton-${index}`}
                      isBook={false}
                    />
                  ))
              ) : cdComments?.length > 0 ? (
                cdComments?.map((comment) => (
                  <li
                    key={comment.id}
                    className={`flex justify-between items-center bg-[#F7F1FA80] rounded-[12px]  `}>
                    <div className='flex flex-col gap-1 py-4 pl-7'>
                      <div className='flex gap-2 items-baseline'>
                        <span className='text-[#401D5F] text-[16px] font-bold line-clamp-1'>
                          {comment.nickname}
                        </span>
                        <span className='text-[#401D5F80] text-[10px] '>
                          {formatDate(new Date(comment.createdAt + 'Z'))}
                        </span>
                      </div>
                      <p className='text-[#401D5FB2] text-[14px] line-clamp-1'>
                        {comment.content}
                      </p>
                    </div>

                    {isAccessible(comment.userId) && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className='py-7 pr-8 hover:opacity-50'>
                        <img
                          src={trashIcon}
                          alt='댓글 삭제버튼'
                        />
                      </button>
                    )}
                  </li>
                ))
              ) : (
                <div className='flex flex-col justify-center items-center h-40 text-gray-500'>
                  <p>검색 결과가 없습니다.</p>
                </div>
              )}
            </ul>

            {/* 페이지네이션 */}
            {cdComments?.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPage={totalPage.current}
                onChangePage={handleChangePage}
                color='#7838AF'
              />
            )}
          </div>
        </motion.div>
      </div>
    </ModalBackground>
  );
});

export default CommentList;
