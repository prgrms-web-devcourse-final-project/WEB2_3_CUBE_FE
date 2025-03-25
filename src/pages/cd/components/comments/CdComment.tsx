import { useCallback, useState } from 'react';
import CommentListModal from './CommentListModal';
import VisibleCommentList from './VisibleCommentList';
import CommentListButton from './CommentListButton';

export default function CdComment({ currentTime }: { currentTime: number }) {
  const [isCommentListOpen, setIsCommentListOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    setIsCommentListOpen(false);
  }, []);

  return (
    <>
      <div className=' w-[32%] h-full  rounded-3xl border-2 border-[#FCF7FD]  bg-[#3E507D40] shadow-box backdrop-blur-lg relative'>
        {/* 댓글 목록 보기 버튼 */}
        <CommentListButton setCommentListOpen={setIsCommentListOpen} />
        <div className='flex flex-col gap-6 justify-end items-end px-7 pt-14 pb-6 w-full h-full'>
          {/* 댓글 목록 */}
          <VisibleCommentList currentTime={currentTime} />
        </div>
      </div>
      {isCommentListOpen && <CommentListModal onClose={handleCloseModal} />}
    </>
  );
}
