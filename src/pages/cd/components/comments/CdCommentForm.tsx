import { useMutateCdComments } from '@hooks/cd/useMutateCdComments';
import React, { useRef } from 'react';
import commentSubmit from '@assets/cd/comment-submit.svg';

const CdCommentForm = React.memo(({ currentTime }: { currentTime: number }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

  const { mutate, error, isPending, isError } = useMutateCdComments(
    currentTime,
    commentInputRef,
  );

  // 댓글 작성
  const handleSubmitComment = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    const commentValue = commentInputRef.current?.value.trim() || '';

    if (commentValue === '' || isPending) return;

    mutate({
      timestamp: currentTime,
      content: commentValue,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmitComment}
      className='w-full  h-[104px] bg-[#FFFFFF33] border-2 border-[#FFFFFF80] rounded-[14px] relative '>
      <label
        htmlFor='commentMessage'
        className='sr-only'>
        방명록 메시지
      </label>
      <textarea
        id='commentMessage'
        name='commentMessage'
        className='w-full h-full p-5  resize-none rounded-[14px] outline-none text-white'
        aria-required='true'
        maxLength={50}
        ref={commentInputRef}
        placeholder='댓글을 입력해주세요 φ(゜▽゜*)♪'
        onKeyDown={handleKeyDown}></textarea>

      <button
        type='submit'
        disabled={isPending}
        aria-label='댓글 작성 완료'
        className='absolute right-4 bottom-5 hover:opacity-50'>
        <img
          src={commentSubmit}
          alt='댓글 제출 버튼'
        />
      </button>
      {isError && <p>에러 발생: {error.message}</p>}
    </form>
  );
});

export default CdCommentForm;
