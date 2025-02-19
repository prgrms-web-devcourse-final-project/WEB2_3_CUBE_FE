import { forwardRef, useState } from 'react';
import show_next_cd from '@assets/cd/show-next-cd.svg';
import show_prev_cd from '@assets/cd/show-prev-cd.svg';
import show_cd_list from '@assets/cd/show-cd-list.svg';
import cd_add_icon from '@assets/cd/cd-add-icon.svg';
import { SearchModal } from '@components/search-modal/SearchModal';
import { SwiperRef } from 'swiper/react';

const Dock = forwardRef<SwiperRef, { isEmpty?: boolean; datas?: CDInfo[] }>(
  ({ isEmpty = true, datas }, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDockOpen, setIsDockOpen] = useState(false);

    // 슬라이드 위치 변경
    const handleSlideChange = (index: number) => {
      const swiper = (ref as React.RefObject<SwiperRef>).current?.swiper;
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
                  ? 'max-w-[calc(100vw-300px)] opacity-100 py-4 px-7'
                  : 'max-w-0 opacity-0 py-0 px-0'
              }`}>
          {isEmpty ? (
            <span className='text-white text-[30px]'>｡°(っ°´o`°ｃ)°｡</span>
          ) : (
            <div className='flex justify-center items-center h-full gap-2 '>
              <img
                className='w-11 h-11 cursor-pointer'
                src={show_prev_cd}
                alt='이전 cd 목록 보여주는 아이콘 '
              />
              <ul className='flex justify-center items-center gap-7 w-full  '>
                {datas.map((data: CDInfo, index: number) => (
                  <li
                    onClick={() => handleSlideChange(index)}
                    key={data.trackId}
                    className='shadow-md cursor-pointer '>
                    <img
                      className='aspect-square rounded-[6.4px]'
                      src={data.imgUrl}
                      alt='CD 이미지'
                    />
                  </li>
                ))}
              </ul>
              <img
                className='w-11 h-11 cursor-pointer'
                src={show_next_cd}
                alt='다음 cd 목록 보여주는 아이콘 '
              />
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
          className='fixed bottom-17 right-20 z-[5] bg-[#FFFFFF33] backdrop-blur-[35px] rounded-full w-16 h-16 cursor-pointer 
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
          />
        )}
      </>
    );
  },
);
export default Dock;
