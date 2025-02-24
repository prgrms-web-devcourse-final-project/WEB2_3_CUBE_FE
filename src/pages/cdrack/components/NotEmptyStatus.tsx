import { useRef, useState } from 'react';
import Dock from './Dock';
import CdSwiper from './CdSwiper';
import { SwiperRef } from 'swiper/react';
import SlidingTitle from './SlidingTitle';

export default function NotEmptyStatus({ cdDatas }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // cdDatas는 {data: {}[], nextCursor} 형태
  const activeTrack = cdDatas.data.find(
    (track: CDInfo) => track.cdId === cdDatas.data[activeIndex]?.cdId,
  );

  const swiperRef = useRef<SwiperRef | null>(null);

  return (
    <div className='flex h-full flex-col gap-19 items-center'>
      {/* 상단 정보 */}
      {activeTrack && (
        <div className='text-center mt-20'>
          <span className='text-white text-xl opacity-70'>
            {/* {activeTrack.release_date.split('-')[0] */}
            {activeTrack.artist | 2025}
          </span>
          <SlidingTitle text={activeTrack.title} />
        </div>
      )}
      {/* Swiper */}
      <CdSwiper
        ref={swiperRef}
        cdDatas={cdDatas}
        onActiveTrackId={(activeIndex: number) => setActiveIndex(activeIndex)}
      />

      {/* Dock  */}
      <Dock
        ref={swiperRef}
        isEmpty={false}
        cdDatas={cdDatas}
        activeIndex={activeIndex}
      />
    </div>
  );
}
