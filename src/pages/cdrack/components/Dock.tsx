import React from 'react';
import show_next_cd from '@assets/cd/show-next-cd.svg';
import show_prev_cd from '@assets/cd/show-prev-cd.svg';
import show_cd_list from '@assets/cd/show-cd-list.svg';

export default function Dock({ showDock, onToggleDock, isEmpty = false }) {
  return (
    <div>
      <img
        src={show_cd_list}
        alt='cd 목록 보여주는 아이콘'
        onClick={onToggleDock}
        className={`fixed bottom-22 left-12 z-[5] cursor-pointer w-8 h-8  all-200-eio  ${
          showDock ? 'rotate-180' : 'rotate-0'
        }`}
      />
      <div
        className={`fixed bottom-12 left-29 z-[5] rounded-2xl border-2 border-[#fff] bg-[#FFFFFF33] backdrop-blur-[20px]
flex items-center justify-center transition-all duration-300 ease-in-out overflow-hidden
${
  showDock
    ? 'max-w-[1733px] opacity-100 py-4 px-6'
    : 'max-w-0 opacity-0 py-0 px-0'
}`}
        style={{
          width: 'calc(100vw - 71px)',
          height: '122px',
        }}>
        <span className='text-white text-[30px]'>｡°(っ°´o`°ｃ)°｡</span>
        {!isEmpty && (
          <img
            className='w-11 h-11 cursor-pointer absolute right-6'
            src={show_next_cd}
            alt='다음 cd 목록 보여주는 아이콘 '
          />
        )}
      </div>
    </div>
  );
}
