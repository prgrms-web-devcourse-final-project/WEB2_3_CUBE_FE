import commentEdit from '@assets/cd/comment-edit.svg';
import React from 'react';

const CommentListButton = React.memo(
  ({
    setCommentListOpen,
  }: {
    setCommentListOpen: (value: boolean) => void;
  }) => {
    return (
      <button
        className='absolute top-5 left-6'
        type='button'
        onClick={() => setCommentListOpen(true)}>
        <img
          className='hover:opacity-50'
          src={commentEdit}
          alt='댓글 목록 버튼'
        />
      </button>
    );
  },
);

export default CommentListButton;
