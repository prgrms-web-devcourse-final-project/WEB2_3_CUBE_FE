import React, { useState } from 'react';
import Dock from './Dock';
import cd_add_icon from '@assets/cd/cd-add-icon.svg';
import { SearchModal } from '@components/search-modal/SearchModal';
import CdSwiper from './CdSwiper';

export default function NotEmptyStatus({ datas }) {
  const [showDock, setShowDock] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(
    datas[0]?.trackId || null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeTrack = datas.find(
    (track: CDInfo) => track.trackId === activeTrackId,
  );

  const handleToggleDock = () => {
    setShowDock((prev) => !prev);
  };

  const handleAddCD = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className='flex h-full flex-col gap-19 items-center'>
        {/* 상단 정보 */}
        {activeTrack && (
          <div className='text-center mt-20'>
            <span className='text-white text-2xl opacity-70'>
              {activeTrack.artist} | {activeTrack.release_date.split('-')[0]}
            </span>
            <h1 className='text-white text-[40px] font-bold'>
              {activeTrack.title}
            </h1>
          </div>
        )}

        {/* Swiper */}
        <CdSwiper
          datas={datas}
          onActiveTrackId={(activeIndex: number) =>
            setActiveTrackId(datas[activeIndex]?.trackId || null)
          }
        />

        {/* cd 추가  */}
        <div
          onClick={handleAddCD}
          className='fixed bottom-49 right-19 z-[5] bg-[#FFFFFF33] backdrop-blur-[35px] rounded-full w-16 h-16 cursor-pointer 
      flex justify-center items-center border-2 border-[#FFFFFFB2]'>
          <img
            className='w-5 h-5'
            src={cd_add_icon}
            alt='cd 추가 아이콘'
          />
        </div>

        {/* Dock  */}
        <Dock
          showDock={showDock}
          onToggleDock={handleToggleDock}
        />
      </div>
      {isModalOpen && (
        <SearchModal
          title='CD 랙에 담을 음악 찾기'
          onClose={() => setIsModalOpen(false)}
          type='CD'
        />
      )}
    </>
  );
}
