import React, { useState } from 'react';
import commentEdit from '@assets/cd/comment-edit.svg';
import commentSubmit from '@assets/cd/comment-submit.svg';
import CommentList from './CommentList';

export default function CdComment() {
  const [isCommentListOpen, setIsCommentListOpen] = useState(false);

  return (
    <>
      <div className=' w-[30%] h-full  rounded-3xl border-2 border-[#FCF7FD]  bg-[#3E507D40] shadow-box backdrop-blur-lg relative'>
        <button
          className='absolute top-5 left-6'
          type='button'
          onClick={() => setIsCommentListOpen(true)}>
          <img
            className=' hover:opacity-50 '
            src={commentEdit}
            alt='댓글 목록 버튼'
          />
        </button>

        <div className='w-full h-full py-6  px-7 flex flex-col justify-end items-end gap-6'>
          {/* 댓글 란 */}
          <div className='flex flex-col items-end gap-4  max-w-[488px]'>
            {/* 댓글 */}
            <div className=' flex flex-col gap-1 px-5 py-4 w-fit rounded-comment bg-[#EDE6EE4D] drop-shadow-logo border-2 border-white'>
              <div className='flex gap-1.5 items-center text-white'>
                <span className='text-[22px] font-bold'>지존보아</span>
                <span className='text-[18px] text-[#FFFFFFB2] '>2:12</span>
              </div>
              <p className='text-[18px] font-semibold text-[#FFFFFFE5] line-clamp-4 max-w-fit'>
                와 이게 진짜야? 실화냐? 대박 개쩐다... 와 이게 진짜야? 실화냐?
                대박 개쩐.와 이게 진짜야? 실화냐? 대박 개쩐다... 와 이게 진짜야?
                실화냐? 대박 개쩐..와 이게 진짜야? 실화냐? 대박 개쩐다... 와
                이게 진짜야? 실화냐? 대박 개쩐..와 이게 진짜야? 실화냐? 대박
                개쩐다... 와 이게 진짜야? 실화냐? 대박......
              </p>
            </div>
            <div className=' flex flex-col j  gap-1 px-5 py-4 w-fit rounded-comment bg-[#EDE6EE4D] drop-shadow-logo border-2 border-white'>
              <div className='flex gap-1.5 items-center text-white'>
                <span className='text-[22px] font-bold'>지존보아</span>
                <span className='text-[18px] text-[#FFFFFFB2] '>2:12</span>
              </div>
              <p className='text-[18px] font-semibold text-[#FFFFFFE5] line-clamp-4 max-w-fit'>
                와 이게 진짜야? 실화냐? 대박 개쩐다...
              </p>
            </div>
            <div className=' flex flex-col gap-1 px-5 py-4 w-fit rounded-comment bg-[#EDE6EE4D] drop-shadow-logo border-2 border-white'>
              <div className='flex gap-1.5 items-center text-white'>
                <span className='text-[22px] font-bold'>지존보아</span>
                <span className='text-[18px] text-[#FFFFFFB2] '>2:12</span>
              </div>
              <p className='text-[18px] font-semibold text-[#FFFFFFE5] line-clamp-4 max-w-fit'>
                와 이게 진짜야? 실화냐? 대박 개쩐다...dwdwdwdw
              </p>
            </div>
          </div>

          {/* 댓글 입력 란 */}
          <form className='w-full h-[104px] bg-[#FFFFFF33] border-2 border-[#FFFFFF80] rounded-[14px] relative '>
            <textarea
              className='w-full h-full p-5  resize-none rounded-[14px] outline-none text-white'
              name=''
              id=''
              placeholder='댓글을 입력해주세요 φ(゜▽゜*)♪'></textarea>

            <button
              type='submit'
              className='absolute bottom-5 right-4'>
              <img
                src={commentSubmit}
                alt='댓글 제출 버튼'
              />
            </button>
          </form>
        </div>
      </div>
      {isCommentListOpen && (
        <CommentList onClose={() => setIsCommentListOpen(false)} />
      )}
    </>
  );
}
