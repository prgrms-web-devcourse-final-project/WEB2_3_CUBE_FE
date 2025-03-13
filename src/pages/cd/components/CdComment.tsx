import { useEffect, useRef, useState } from 'react';
import commentEdit from '@assets/cd/comment-edit.svg';
import commentSubmit from '@assets/cd/comment-submit.svg';
import CommentList from './CommentList';
import { addCdComment, getCdCommentAll } from '@apis/cd';
import { useUserStore } from '@/store/useUserStore';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRelativeTimeString } from '@utils/dateFormat';
import { motion } from 'framer-motion';

export default function CdComment({ commentTime }: { commentTime: number }) {
  const [isCommentListOpen, setIsCommentListOpen] = useState(false);
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const queryClient = useQueryClient();

  const [currentComments, setCurrentComments] = useState<CdComment[]>([]); // 현재 보여지는 댓글목록(상태로 관리안해도된다는 조언?)

  const user = useUserStore((state) => state.user);
  const myCdId = Number(useParams().cdId);

  // 전체 댓글 목록 캐싱
  const { data: cdComments } = useQuery<CdComment[]>({
    queryKey: [`cdComments ${myCdId}`],
    queryFn: async () => {
      const result = await getCdCommentAll(myCdId);
      return result || [];
    },
    staleTime: 1000 * 10 * 5,
    gcTime: 1000 * 10 * 5,
    structuralSharing: true,
  });

  // 새 댓글 낙관적 업데이트 적용
  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: async (newComment: CdCommentPost) => {
      const result = await addCdComment(myCdId, newComment);
      return result;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [`cdComments ${myCdId}`] });

      const previousComments = queryClient.getQueryData<CdComment[]>([
        `cdComments ${myCdId}`,
      ]);
      const tempId = Date.now();

      const newComment = {
        id: tempId,
        myCdId: myCdId,
        userId: user.userId,
        nickname: user.nickname,
        timestamp: commentTime,
        content: commentInputRef.current.value,
        createdAt: new Date().toISOString(),
      };

      // 낙관적 업데이트
      if (previousComments) {
        queryClient.setQueryData<CdComment[]>(
          [`cdComments ${myCdId}`],
          [...previousComments, newComment],
        );
      }
      // 현재 보여지는 댓글 목록에도 즉시 추가 (중요!)
      setCurrentComments((prevComments) => [...prevComments, newComment]);

      return { previousComments };
    },
    onError: (error, newComment, context) => {
      // console.error('onError', error, newComment, context);
      if (context) {
        queryClient.setQueryData(
          [`cdComments ${myCdId}`],
          context.previousComments,
        );
      }
    },
    onSettled(data, error, variables, context) {
      if (commentInputRef.current) {
        commentInputRef.current.value = '';
      }
    },
  });

  // 특정 시간대에 작성된 댓글 불러오기
  useEffect(() => {
    if (commentTime <= 1) {
      setCurrentComments([]);
      return;
    }
    // 현재 시간대에 해당하는 댓글들 필터링
    const exactTimeComments = Array.isArray(cdComments)
      ? cdComments.filter((comment) => comment.timestamp === commentTime)
      : [];

    if (exactTimeComments.length > 0) {
      // 이미 표시된 댓글은 중복 표시하지 않도록 처리
      setCurrentComments((prev) => {
        // 이미 보여지고 있는 댓글 ID 목록
        const existingIds = new Set(prev.map((comment) => comment.id));
        // 새로 추가할 댓글만 필터링
        const newComments = exactTimeComments.filter(
          (comment) => !existingIds.has(comment.id),
        );
        // 새 댓글만 추가
        return [...prev, ...newComments];
      });
    }
  }, [cdComments, commentTime]);

  // 댓글 작성
  const handleSubmitComment = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (commentInputRef.current.value.trim() === '' || isPending) return;
    mutate({
      timestamp: commentTime,
      content: commentInputRef.current.value,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  return (
    <>
      <div className=' w-[32%] h-full  rounded-3xl border-2 border-[#FCF7FD]  bg-[#3E507D40] shadow-box backdrop-blur-lg relative'>
        {/* 댓글 목록 보기 버튼 */}
        <button
          className='absolute top-5 left-6'
          type='button'
          onClick={() => setIsCommentListOpen(true)}>
          <img
            className='hover:opacity-50'
            src={commentEdit}
            alt='댓글 목록 버튼'
          />
        </button>

        <div className='flex flex-col gap-6 justify-end items-end px-7 pt-14 pb-6 w-full h-full'>
          {/* 댓글 목록 */}
          <ul className='flex overflow-hidden flex-col gap-4 justify-end items-end'>
            {/* 댓글  */}
            {currentComments.map((comment, index) => (
              <motion.li
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className=' animate-pulse flex flex-col gap-1 px-5 py-4 w-fit rounded-comment bg-[#EDE6EE4D]
              drop-shadow-logo border-2 border-white   max-w-[488px]'>
                <div className='flex gap-1.5 items-center text-white'>
                  <span className='text-[14px] font-bold'>
                    {comment.nickname}
                  </span>
                  <span className='text-[10px] text-[#FFFFFFB2] '>
                    {getRelativeTimeString(comment.createdAt)}
                  </span>
                </div>
                <p className='text-[12px] font-semibold text-[#FFFFFFE5] line-clamp-4 max-w-fit'>
                  {comment.content}
                </p>
              </motion.li>
            ))}
          </ul>

          {/* 댓글 입력 창 */}
          <form
            ref={formRef}
            onSubmit={handleSubmitComment}
            className='w-full  h-[104px] bg-[#FFFFFF33] border-2 border-[#FFFFFF80] rounded-[14px] relative '>
            <textarea
              ref={commentInputRef}
              className='w-full h-full p-5  resize-none rounded-[14px] outline-none text-white'
              placeholder='댓글을 입력해주세요 φ(゜▽゜*)♪'
              onKeyDown={handleKeyDown}></textarea>

            <button
              type='submit'
              disabled={isPending}
              onClick={() => handleSubmitComment()}
              className='absolute right-4 bottom-5 hover:opacity-50'>
              <img
                src={commentSubmit}
                alt='댓글 제출 버튼'
              />
            </button>
            {isError && <p>에러 발생: {error.message}</p>}
          </form>
        </div>
      </div>
      {isCommentListOpen && (
        <CommentList onClose={() => setIsCommentListOpen(false)} />
      )}
    </>
  );
}
