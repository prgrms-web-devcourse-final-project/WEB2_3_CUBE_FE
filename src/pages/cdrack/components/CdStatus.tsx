import { useEffect, useRef, useState } from 'react';
import Dock from './Dock';
import CdSwiper from './CdSwiper';
import { SwiperRef } from 'swiper/react';
import SlidingTitle from './SlidingTitle';
import { SearchModal } from '@components/search-modal/SearchModal';
import cd from '@assets/cd/cd.png';
import cd_add_icon from '@assets/cd/cd-add-icon.svg';
import { useUserStore } from '@/store/useUserStore';
import { useParams } from 'react-router-dom';
import TypingText from '@components/TypingText';

interface CdStatusProps {
  cdRackInfo: CDRackInfo;
  onPrevPage: () => void;
  onNextPage: (cursor: number) => void;
}

export default function CdStatus({
  cdRackInfo,
  onPrevPage,
  onNextPage,
}: CdStatusProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearchModalOpen, setIsSerarchModalOpen] = useState(false);

  const [newItem, setNewItem] = useState(null);
  const [cdRackDatas, setcdRackDatas] = useState<CDRackInfo>(cdRackInfo);

  const [slideWidth, setSlideWidth] = useState<number>(0);
  const swiperRef = useRef<SwiperRef | null>(null);
  const myUserId = useUserStore().user.userId;
  const userId = Number(useParams().userId);

  const activeTrack = cdRackDatas?.data?.find(
    (track: CDInfo) => track.myCdId === cdRackDatas?.data[activeIndex]?.myCdId,
  );

  useEffect(() => {
    if (!newItem) return;
    const newCdDatas = {
      myCdId: newItem.id,
      title: newItem.title,
      artist: newItem.artist,
      album: newItem.album_title,
      genres: newItem.genres,
      coverUrl: newItem.imageUrl,
      youtubeUrl: newItem.youtubeUrl,
      duration: newItem.duration,
      releaseDate: newItem.date,
    };
    const pageLength = Array.isArray(cdRackDatas?.data)
      ? cdRackDatas.data.length
      : 0;

    setcdRackDatas((prev) => {
      const prevData = prev ?? {
        data: [],
        firstMyCdId: 0,
        lastMyCdId: 0,
        nextCursor: 0,
        totalCount: 0,
      };
      return pageLength >= 10
        ? {
            ...prevData,
            lastMyCdId: newCdDatas.myCdId,
            totalCount: prevData.totalCount + 1,
          }
        : {
            ...prevData,
            data: [...prevData.data, newCdDatas],
            nextCursor: newCdDatas.myCdId,
            firstMyCdId:
              pageLength === 0 ? newCdDatas.myCdId : prevData?.firstMyCdId,
            lastMyCdId: newCdDatas.myCdId,
            totalCount: prevData.totalCount + 1,
          };
    });
  }, [newItem]);

  return (
    <div className='flex h-full flex-col gap-10 2xl:gap-12 items-center relative w-full'>
      {/* 상단 정보 */}

      {cdRackDatas?.data?.length > 0 ? (
        <>
          <div className='text-center mt-20 '>
            <span className='text-white  opacity-70 text-sm xl:text-[16px] 2xl:text-xl'>
              {activeTrack?.artist} | {activeTrack?.releaseDate.split('-')[0]}
            </span>
            <SlidingTitle
              text={activeTrack?.title}
              width={slideWidth}
            />
          </div>
          {/* Swiper */}
          <CdSwiper
            ref={swiperRef}
            cdRackDatas={cdRackDatas?.data}
            onActiveTrackId={(activeIndex: number) =>
              setActiveIndex(activeIndex)
            }
            setSlideWidth={setSlideWidth}
          />
        </>
      ) : (
        <div className='relative w-full min-h-full'>
          <TypingText
            text='  꽂을 CD가 없네요...'
            className='absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[30px] font-bold text-white text-center'
          />
          <img
            className='absolute top-100 2xl:top-110 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-90 h-90 2xl:w-[472px] 2xl:h-[472px] shrink-0 drop-shadow-book aspect-square m-auto hover:animate-slowSpin '
            src={cd}
            alt='cd 실사 이미지'
          />
        </div>
      )}

      {/* Dock  */}
      <Dock
        ref={swiperRef}
        isEmpty={cdRackDatas?.data?.length > 0 ? false : true}
        cdRackInfo={cdRackDatas}
        setCdRackInfo={setcdRackDatas}
        activeIndex={activeIndex}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
      />

      {myUserId === userId && (
        <div
          onClick={() => setIsSerarchModalOpen((prev) => !prev)}
          className='hover:animate-pulse fixed bottom-21 right-21 z-[5] bg-[#FFFFFF33] backdrop-blur-[35px] rounded-full w-16 h-16 cursor-pointer 
       item-middle border-2 border-[#FFFFFFB2]'>
          <img
            className='w-5 h-5'
            src={cd_add_icon}
            alt='cd 추가 아이콘'
          />
        </div>
      )}

      {/* 검색 모달 */}
      {isSearchModalOpen && (
        <SearchModal
          title='CD 랙에 담을 음악 찾기'
          onClose={() => setIsSerarchModalOpen(false)}
          type='CD'
          onSelect={(cdItem) => setNewItem(cdItem)}
        />
      )}
    </div>
  );
}
