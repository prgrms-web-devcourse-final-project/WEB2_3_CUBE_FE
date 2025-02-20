import React from 'react';
import sample from '@assets/cd/sample.svg';
import soundIcon from '@assets/cd/sound-icon.svg';
import prevSong from '@assets/cd/prev-song-icon.svg';
import nextSong from '@assets/cd/next-song-icon.svg';
import pauseSong from '@assets/cd/pause-icon.svg';
import sufflesong from '@assets/cd/shuffle-icon.svg';
import cdList from '@assets/cd/music-list-icon.svg';

export default function CdPlayer() {
  return (
    <div className='w-full h-[13vh] shrink-0  '>
      {/* 진행 시간 */}
      <div className='w-full h-[10px] bg-[#FFFFFF4D]  '>
        <div className='w-[600px] h-full bg-white '></div>
      </div>

      <div className='flex  items-center justify-between'>
        <div className='flex items-center gap-2'>
          <img
            src={sample}
            alt='CD 앨범 이미지'
          />

          <img
            src={soundIcon}
            alt='음량 아이콘'
          />
          <input
            type='range'
            min='0'
            max='100'
            // value={volume}
            // onChange={handleVolumeChange}
            className='w-[85px] h-[4px] rounded-[1.3px] bg-[#FFFFFF80]
             appearance-none focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>

        <div className='flex items-center gap-[14px]'>
          <img
            src={prevSong}
            alt='이전 노래 버튼'
          />
          <img
            src={pauseSong}
            alt='노래 일시정지 버튼'
          />

          <img
            src={nextSong}
            alt='다음 노래 버튼'
          />
        </div>

        <div className='flex items-center gap-2.5'>
          <img
            src={sufflesong}
            alt='cd 무한재생 버튼'
          />
          <img
            src={cdList}
            alt='cd 목록 리스트 보여주는 버튼'
          />
        </div>
      </div>
    </div>
  );
}
