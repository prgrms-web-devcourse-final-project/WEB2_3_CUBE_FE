import React from 'react';
import commentEdit from '@assets/cd/comment-edit.svg';
import commentSubmit from '@assets/cd/comment-submit.svg';

export default function CdComment() {
  return (
    <div className='w-[30%] h-full  rounded-3xl border-2 border-[#FCF7FD]  bg-[#3E507D40] shadow-box backdrop-blur-lg relative'>
      <img
        className='absolute  top-5 left-6'
        src={commentEdit}
        alt='댓글 목록 버튼'
      />
      <div className='w-full h-full py-6  px-7 flex flex-col justify-end items-end gap-6'>
        {/* 댓글 란 */}
        <div className='flex flex-col gap-4 '>
          {/* 댓글 */}
          <div className='max-w-[388px] flex flex-col gap-1 px-5 py-4 rounded-comment bg-[#EDE6EE4D] drop-shadow-logo border-2 border-white'>
            <div className='flex gap-1.5 items-center text-white'>
              <span className='text-[14px] font-bold'>지존보아</span>
              <span className='text-[10px] text-[#FFFFFFB2] '>2:12</span>
            </div>
            <p className='text-[12px] font-semibold text-[#FFFFFFE5] line-clamp-4'>
              와 이게 진짜야? 실화냐? 대박 개쩐다... 와 이게 진짜야? 실화냐?
              대박 개쩐.와 이게 진짜야? 실화냐? 대박 개쩐다... 와 이게 진짜야?
              실화냐? 대박 개쩐..와 이게 진짜야? 실화냐? 대박 개쩐다... 와 이게
              진짜야? 실화냐? 대박 개쩐..와 이게 진짜야? 실화냐? 대박 개쩐다...
              와 이게 진짜야? 실화냐? 대박......
            </p>
          </div>
          <div className='max-w-[388px] flex flex-col gap-1 px-5 py-4 rounded-comment bg-[#EDE6EE4D] drop-shadow-logo border-2 border-white'>
            <div className='flex gap-1.5 items-center text-white'>
              <span className='text-[14px] font-bold'>지존보아</span>
              <span className='text-[10px] text-[#FFFFFFB2] '>1:39</span>
            </div>
            <p className='text-[12px] font-semibold text-[#FFFFFFE5] line-clamp-4'>
              와 이게 진짜야? 실화냐? 대박 개쩐다... 와 이게 진짜야? 실화냐?
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
  );
}
