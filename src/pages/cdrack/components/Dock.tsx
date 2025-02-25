import { forwardRef, useState } from 'react';
import show_next_cd from '@assets/cd/show-next-cd.svg';
import show_prev_cd from '@assets/cd/show-prev-cd.svg';
import show_cd_list from '@assets/cd/show-cd-list.svg';
import cd_add_icon from '@assets/cd/cd-add-icon.svg';
import { SearchModal } from '@components/search-modal/SearchModal';
import { SwiperRef } from 'swiper/react';

interface DockProps {
  isEmpty?: boolean;
  cdDatas?: { data: CDInfo[]; cursor: number };
  activeIndex?: number;
}

const Dock = forwardRef<SwiperRef, DockProps>(
  ({ isEmpty = true, cdDatas, activeIndex }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDockOpen, setIsDockOpen] = useState(false);

    console.log(cdDatas);

    // 슬라이드 위치 변경
    const handleSlideChange = (index: number) => {
      const swiper = (ref as React.RefObject<SwiperRef>).current?.swiper;
      console.log(swiper);

      if (swiper) {
        swiper.slideTo(index); // 슬라이드 이동
        swiper.update(); // 업데이트 호출하여 coverflow 효과 재적용
      }
    };

    return (
      <>
        {/* 보여줄 Dock 메뉴 */}
        <div
          className={`fixed bottom-10 left-30 z-[5] h-[122px] rounded-2xl border-2 border-[#fff] bg-[#FFFFFF33] backdrop-blur-[20px]  all-200-eio overflow-hidden
              ${
                isDockOpen
                  ? 'max-w-[calc(100vw-300px)] opacity-100 '
                  : 'max-w-0 opacity-0 py-0 px-0'
              }`}>
          {isEmpty ? (
            <div className='w-[calc(100vw-300px)] h-full flex items-center justify-center'>
              <span className='text-white text-[30px]'>｡°(っ°´o`°ｃ)°｡</span>
            </div>
          ) : (
            <div className='w-[calc(100vw-300px)]  h-full flex justify-center items-center  gap-2 '>
              {/* 이전 cd목록 버튼 */}
              <button
                className='h-full overflow-hidden hover:opacity-50 all-200-eio'
                disabled={true}>
                <img
                  className='w-13 h-13'
                  src={show_prev_cd}
                  alt='이전 cd 목록 보여주는 아이콘'
                />
              </button>

              <ul className='flex justify-center items-center gap-7 w-full h-full  '>
                {cdDatas.data.map((data: CDInfo, index: number) => (
                  <li
                    onClick={() => handleSlideChange(index)}
                    key={index}
                    className={`shadow-md cursor-pointer ${
                      activeIndex === index &&
                      'border-2 border-red-600 rounded-[6.4px]'
                    } `}>
                    <img
                      className='aspect-square rounded-[6.4px]'
                      src={data.coverUrl}
                      alt='CD 이미지'
                    />
                  </li>
                ))}
              </ul>
              {/* 이후 cd목록 버튼 */}
              <button
                className='h-full overflow-hidden hover:opacity-50 all-200-eio'
                disabled={true}>
                <img
                  className='w-13 h-13'
                  src={show_next_cd}
                  alt='이후 cd 목록 보여주는 아이콘'
                />
              </button>
            </div>
          )}
        </div>

        {/* 토글 버튼  */}
        <button
          onClick={() => setIsDockOpen((prev) => !prev)}
          className='fixed bottom-22 left-12 z-[5]'>
          <img
            src={show_cd_list}
            alt='cd 목록 보여주는 아이콘'
            className={` cursor-pointer w-8 h-8  all-200-eio  ${
              isDockOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        {/* cd 추가 버튼  */}
        <div
          onClick={() => setIsModalOpen((prev) => !prev)}
          className='fixed bottom-17 right-15 z-[5] bg-[#FFFFFF33] backdrop-blur-[35px] rounded-full w-16 h-16 cursor-pointer 
       item-middle border-2 border-[#FFFFFFB2]'>
          <img
            className='w-5 h-5'
            src={cd_add_icon}
            alt='cd 추가 아이콘'
          />
        </div>
        {/* 검색 모달 */}
        {isModalOpen && (
          <SearchModal
            title='CD 랙에 담을 음악 찾기'
            onClose={() => setIsModalOpen(false)}
            type='CD'
            onSelect={() => {}}
          />
        )}
      </>
    );
  },
);
export default Dock;
