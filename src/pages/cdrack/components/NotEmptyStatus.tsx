import { useRef, useState } from 'react';
import Dock from './Dock';
import CdSwiper from './CdSwiper';
import { SwiperRef } from 'swiper/react';
import SlidingTitle from './SlidingTitle';

interface NotEmptyStatusProps {
  cdDatas: { data: CDInfo[]; nextCursor: number };
  onPrevPage: () => void;
  onNextPage: () => void;
}

export default function NotEmptyStatus({
  cdDatas,
  onPrevPage,
  onNextPage,
}: NotEmptyStatusProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // cdDatas는 {data: {}[], nextCursor} 형태
  const activeTrack = cdDatas.data.find(
    (track: CDInfo) => track.myCdId === cdDatas.data[activeIndex]?.myCdId,
  );

  const swiperRef = useRef<SwiperRef | null>(null);

  return (
    <div className='flex h-full flex-col gap-19 items-center'>
      {/* 상단 정보 */}
      {activeTrack && (
        <div className='text-center mt-20'>
          <span className='text-white text-xl opacity-70'>
            {activeTrack.artist} | {activeTrack.releaseDate.split('-')[0]}
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
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />
    </div>
  );
}
