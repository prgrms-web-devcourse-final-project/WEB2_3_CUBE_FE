import React, { useState } from 'react';
import sample from '@assets/cd/sample.svg';
import soundIcon from '@assets/cd/sound-icon.svg';
import prevSong from '@assets/cd/prev-song-icon.svg';
import nextSong from '@assets/cd/next-song-icon.svg';
import pauseSong from '@assets/cd/pause-icon.svg';
import playSong from '@assets/cd/play-icon.svg';
import sufflesong from '@assets/cd/shuffle-icon.svg';
import cdList from '@assets/cd/music-list-icon.svg';
import ModalBackground from '@components/ModalBackground';
import DataList from '@components/datalist/DataList';
import { mockCD } from '@/mocks/mockCD';

export default function CdPlayer() {
  const [isCdStop, setIsCdStop] = useState(false);
  const [isCdListOpen, setIsCdListOpen] = useState(false);

  const formattedCds = mockCD.data.map((cd) => ({
    id: String(cd.myCdId),
    title: cd.title,
    artist: cd.artist,
    released_year: cd.releaseDate,
    album: cd.album,
  }));

  const handleControlCd = () => {
    setIsCdStop(!isCdStop);
  };

  return (
    <>
      <div className='w-full h-[13vh] shrink-0  '>
        {/* 진행 시간 */}
        {/* <div className='w-[600px] h-full bg-white '></div> */}
        <input
          type='range'
          min='0'
          max='100'
          // value={volume}
          // onChange={handleVolumeChange}
          className='  w-full h-[5px]  rounded-[1.3px] bg-[#FFFFFF80]
             appearance-none focus:outline-none focus:ring-2 '
        />

        <div className=' w-full h-full relative'>
          <div className='flex items-center absolute bottom-4 left-0'>
            {/* 앨범 이미지 */}
            <img
              className=' w-29 h-29'
              src={sample}
              alt='CD 앨범 이미지'
            />
            {/* 음량 */}
            <div className=' flex justify-center items-center gap-2 pl-13 '>
              <img
                className='w-8 h-8 cursor-pointer '
                src={soundIcon}
                alt='음량 아이콘'
              />
              <input
                type='range'
                min='0'
                max='100'
                // value={volume}
                // onChange={handleVolumeChange}
                className='w-[100px] h-[6px] rounded-[1.3px] bg-[#FFFFFF80]
             appearance-none focus:outline-none focus:ring-2'
              />
            </div>
          </div>

          {/* 음악 컨트롤 버튼 */}
          <div className='flex items-center gap-[14px] cursor-pointer absolute bottom-14 left-1/2 -translate-x-1/2 '>
            <img
              src={prevSong}
              alt='이전 노래 버튼'
            />
            <img
              onClick={handleControlCd}
              className='fill-black w-13 h-13 '
              src={isCdStop ? pauseSong : playSong}
              alt='노래 일시정지 버튼'
            />

            <img
              src={nextSong}
              alt='다음 노래 버튼'
            />
          </div>

          {/* 음악 부가기능 */}
          <div className='flex items-center gap-2.5 cursor-pointer absolute bottom-14 right-10'>
            <img
              src={sufflesong}
              alt='cd 무한재생 버튼'
            />
            <img
              onClick={() => setIsCdListOpen(true)}
              src={cdList}
              alt='cd 목록 리스트 보여주는 버튼'
            />
          </div>
        </div>
      </div>
      {isCdListOpen && (
        <ModalBackground onClose={() => setIsCdListOpen(false)}>
          <DataList
            datas={formattedCds}
            type='cd'
          />
        </ModalBackground>
      )}
    </>
  );
}
