import React from 'react';
import playingCD from '@assets/cd/playing-cd.png';

export default function CdInfo() {
  return (
    <div className='w-[40%] h-full   text-center flex flex-col items-center justify-between '>
      <div className='text-white flex flex-col gap-1.5'>
        <span className='text-2xl font-semibold opacity-70'>지드래곤</span>
        <h1 className='2xl:text-[40px] text-2xl font-bold '>
          무제(無題) (Untitled, 2014)
        </h1>
      </div>

      <div>
        <img
          className='min-w-[220px]  w-[585px]'
          src={playingCD}
          alt='cd가 들어간 cd플레이어 이미지'
        />
      </div>
    </div>
  );
}
