import { useRef, useState } from 'react';
import Dock from './Dock';
import CdSwiper from './CdSwiper';
import { SwiperRef } from 'swiper/react';
import SlidingTitle from './SlidingTitle';

export default function NotEmptyStatus({ datas }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTrack = datas.find(
    (track: CDInfo) => track.trackId === datas[activeIndex]?.trackId,
  );

  const swiperRef = useRef<SwiperRef | null>(null);

  return (
    <div className='flex h-full flex-col gap-19 items-center'>
      {/* 상단 정보 */}
      {activeTrack && (
        <div className='text-center mt-20'>
          <span className='text-white text-xl opacity-70'>
            {activeTrack.artist} | {activeTrack.release_date.split('-')[0]}
          </span>
          <SlidingTitle text={activeTrack.title} />
        </div>
      )}
      {/* Swiper */}
      <CdSwiper
        ref={swiperRef}
        datas={datas}
        onActiveTrackId={(activeIndex: number) => setActiveIndex(activeIndex)}
      />

      {/* Dock  */}
      <Dock
        ref={swiperRef}
        isEmpty={false}
        datas={datas}
        activeIndex={activeIndex}
      />
    </div>
  );
}
