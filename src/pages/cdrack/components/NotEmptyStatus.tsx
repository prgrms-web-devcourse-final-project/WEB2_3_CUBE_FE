import { useEffect, useRef, useState } from 'react';
import Dock from './Dock';
import CdSwiper from './CdSwiper';
import { SwiperRef } from 'swiper/react';
import SlidingTitle from './SlidingTitle';
import { SearchModal } from '@components/search-modal/SearchModal';
import cd_add_icon from '@assets/cd/cd-add-icon.svg';
import { useUserStore } from '@/store/useUserStore';
import { useParams } from 'react-router-dom';

interface NotEmptyStatusProps {
  cdRackInfo: { data: CDInfo[]; nextCursor: number };
  onPrevPage: () => void;
  onNextPage: () => void;
}

export default function NotEmptyStatus({
  cdRackInfo,
  onPrevPage,
  onNextPage,
}: NotEmptyStatusProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newItem, setNewItem] = useState(null);
  const [cdRackDatas, setcdRackDatas] = useState<CDInfo[]>(cdRackInfo.data);

  console.log(cdRackDatas);

  useEffect(() => {
    if (!newItem) return;
    const newCdDatas = {
      title: newItem.title,
      artist: newItem.artist,
      album: newItem.album_title,
      genres: newItem.genres,
      coverUrl: newItem.imageUrl,
      youtubeUrl: newItem.youtubeUrl,
      duration: newItem.duration,
      releaseDate: newItem.date,
    };
    setcdRackDatas((prev) => [...prev, newCdDatas]);
  }, [newItem]);

  const swiperRef = useRef<SwiperRef | null>(null);
  const myUserId = useUserStore().user.userId;
  const userId = Number(useParams().userId);

  const activeTrack = cdRackDatas.find(
    (track: CDInfo) => track.myCdId === cdRackDatas[activeIndex]?.myCdId,
  );

  return (
    <div className='flex h-full flex-col gap-19 items-center'>
      {/* 상단 정보 */}
      {activeTrack && (
        <div className='text-center mt-20 '>
          <span className='text-white  opacity-70   text-[14px] xl:text-[16px] 2xl:text-xl'>
            {activeTrack.artist} | {activeTrack.releaseDate.split('-')[0]}
          </span>
          <SlidingTitle text={activeTrack.title} />
        </div>
      )}
      {/* Swiper */}
      <CdSwiper
        ref={swiperRef}
        cdRackDatas={cdRackDatas}
        onActiveTrackId={(activeIndex: number) => setActiveIndex(activeIndex)}
      />

      {/* Dock  */}
      <Dock
        ref={swiperRef}
        isEmpty={false}
        cdRackInfo={cdRackInfo}
        activeIndex={activeIndex}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />

      {myUserId === userId && (
        <div
          onClick={() => setIsModalOpen((prev) => !prev)}
          className='hover:animate-spin fixed bottom-17 right-15 z-[5] bg-[#FFFFFF33] backdrop-blur-[35px] rounded-full w-16 h-16 cursor-pointer 
       item-middle border-2 border-[#FFFFFFB2]'>
          <img
            className='w-5 h-5'
            src={cd_add_icon}
            alt='cd 추가 아이콘'
          />
        </div>
      )}

      {/* 검색 모달 */}
      {isModalOpen && (
        <SearchModal
          title='CD 랙에 담을 음악 찾기'
          onClose={() => setIsModalOpen(false)}
          type='CD'
          onSelect={(cdItem) => setNewItem(cdItem)}
        />
      )}
    </div>
  );
}
