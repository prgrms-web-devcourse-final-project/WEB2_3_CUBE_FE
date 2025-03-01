import { truncateTitle } from '@utils/truncate';
import cdEmptyPlayer from '@assets/cd/cd-player.png';
import cd from '@assets/cd/cd.png';
import React from 'react';

export const CdInfo = React.memo(
  ({ cdInfo, cdPlaying }: { cdInfo: CDInfo; cdPlaying: boolean }) => {
    return (
      <div className='w-[36%] h-full  flex flex-col gap-10'>
        <div className='text-white flex flex-col gap-1.5 text-center'>
          <span className='2xl:text-2xl  text-xl font-semibold opacity-70'>
            {cdInfo.artist}
          </span>
          <h1 className='2xl:text-[40px] text-2xl font-bold '>
            {truncateTitle(cdInfo.title, 40)}
          </h1>
        </div>

        <div className='relative'>
          <img
            className={`absolute top-17 left-17  z-[5]  w-fit  min-w-[220px] block ${
              cdPlaying && 'animate-spin'
            } `}
            src={cd}
            alt='cd 이미지'
          />
          <img
            className='absolute top-0 left-0 w-full  min-w-[220px] block  '
            src={cdEmptyPlayer}
            alt='빈 cd플레이어 이미지'
          />
        </div>
      </div>
    );
  },
);

export default CdInfo;
