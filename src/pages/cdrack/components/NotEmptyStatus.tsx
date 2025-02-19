import { useRef, useState } from 'react';
import Dock from './Dock';
import CdSwiper from './CdSwiper';
import { SwiperRef } from 'swiper/react';
import SlidingTitle from './SlidingTitle';

export default function NotEmptyStatus({ datas }) {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(
    datas[0]?.trackId || null,
  );

  const activeTrack = datas.find(
    (track: CDInfo) => track.trackId === activeTrackId,
  );
  const swiperRef = useRef<SwiperRef | null>(null);

  return (
    <div className='flex h-full flex-col gap-19 items-center'>
      {/* 상단 정보 */}
      {activeTrack && (
        <div className='text-center mt-20'>
          <span className='text-white text-2xl opacity-70'>
            {activeTrack.artist} | {activeTrack.release_date.split('-')[0]}
          </span>
          {/* <h1 className='text-white text-[40px] font-bold'>
            {activeTrack.title}
          </h1> */}
          <SlidingTitle text={activeTrack.title} />
        </div>
      )}

      {/* Swiper */}
      <CdSwiper
        ref={swiperRef}
        datas={datas}
        onActiveTrackId={(activeIndex: number) =>
          setActiveTrackId(datas[activeIndex]?.trackId || null)
        }
      />

      {/* Dock  */}
      <Dock
        ref={swiperRef}
        isEmpty={false}
        datas={datas}
      />
    </div>
  );
}
