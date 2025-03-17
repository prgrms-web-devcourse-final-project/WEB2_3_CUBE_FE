import { useToastStore } from '@/store/useToastStore';
import { useUserStore } from '@/store/useUserStore';
import { deleteCdComment } from '@apis/cd';
import SkeletonItem from '@components/SkeletonItem';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '@utils/dateFormat';

import trashIcon from '@assets/cd/trash-icon.svg';

export default function CommentList({
  isSearching,
  cdComments,
  setCdComments,
}: {
  isSearching: boolean;
  cdComments: CdComment[];
  setCdComments: React.Dispatch<React.SetStateAction<CdComment[]>>;
}) {
  const { showToast } = useToastStore();

  const myUserId = useUserStore((state) => state.user).userId;
  const userId = Number(useParams().userId);
  const myCdId = Number(useParams().cdId);

  // 작성자이거나 방주인일 경우에만 삭제 가능
  const isAccessible = useCallback(
    (commentUerId: number) => userId === myUserId || myUserId === commentUerId,
    [userId, myUserId],
  );

  const handleDeleteComment = async (commentId: number) => {
    const previousComments = [...cdComments];

    try {
      setCdComments((prevComments: CdComment[]) =>
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
  );
}
