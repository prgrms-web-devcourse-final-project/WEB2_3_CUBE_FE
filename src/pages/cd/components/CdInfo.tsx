import { truncateTitle } from '@utils/truncate';
import cdEmptyPlayer from '@assets/cd/cd-player.png';
import cd from '@assets/cd/cd.png';
import React from 'react';
import SlidingTitle from '@pages/cdrack/components/SlidingTitle';

export const CdInfo = React.memo(
  ({ cdInfo, cdPlaying }: { cdInfo: CDInfo; cdPlaying: boolean }) => {
    const textLength = cdInfo.title.length;
    return (
      <section className='w-[36%] h-full  flex flex-col gap-10 items-center '>
        <article className='text-white flex flex-col gap-1.5 text-center '>
          <span className='2xl:text-2xl  text-xl font-semibold opacity-70'>
            {cdInfo.artist}
          </span>
          <h1
            className={` ${
              textLength > 14 ? '2xl:text-[30px]' : '2xl:text-[40px]'
            }  text-2xl font-bold `}>
            {cdInfo.title}
          </h1>
        </article>

        <article className='w-full  relative'>
          <div className='relative w-full max-w-[550px] aspect-square mx-auto'>
            <img
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[5] w-[70%] ${
                cdPlaying && 'animate-spin'
              } `}
              src={cd}
              alt='cd 이미지'
            />
            <img
              className='w-full h-full object-contain'
              src={cdEmptyPlayer}
              alt='빈 cd플레이어 이미지'
            />
          </div>
        </article>
      </section>
    );
  },
);

export default CdInfo;
