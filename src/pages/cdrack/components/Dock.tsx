import React, { forwardRef, useRef, useState } from 'react';
import show_next_cd from '@assets/cd/show-next-cd.svg';
import show_prev_cd from '@assets/cd/show-prev-cd.svg';
import show_cd_list from '@assets/cd/show-cd-list.svg';
import { SwiperRef } from 'swiper/react';
import { AnimatePresence, motion } from 'framer-motion';

interface DockProps {
  isEmpty?: boolean;
  cdRackInfo?: CDRackInfo;
  activeIndex?: number;
  onPrevPage?: () => void;
  onNextPage?: (cursor: number) => void;
}

const Dock = React.memo(
  forwardRef<SwiperRef, DockProps>(
    (
      { isEmpty = true, cdRackInfo, activeIndex, onPrevPage, onNextPage },
      ref,
    ) => {
      const [isDockOpen, setIsDockOpen] = useState(false);

      const isNoPrev = useRef(
        cdRackInfo?.data[0]?.myCdId === cdRackInfo?.firstMyCdId,
      );
      const isNoNext = useRef(
        cdRackInfo?.data[cdRackInfo?.data.length - 1]?.myCdId ===
          cdRackInfo?.lastMyCdId,
      );

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
          <AnimatePresence>
            <motion.div
              className='fixed bottom-10 left-30 z-[5] h-[122px] rounded-2xl border-2 border-[#fff] bg-[#FFFFFF33] backdrop-blur-[20px] overflow-hidden'
              animate={{
                width: isDockOpen ? 'auto' : 0,
                maxWidth: isDockOpen ? '85vw' : 0,
                opacity: isDockOpen ? 1 : 0,
              }}>
              {isEmpty ? (
                <div className='h-full flex items-center justify-center px-8'>
                  <span className='text-white text-[30px]'>
                    ｡°(っ°´o`°ｃ)°｡
                  </span>
                </div>
              ) : (
                <div className='h-full flex justify-center items-center gap-2 px-2'>
                  {/* 이전 cd목록 버튼 */}
                  <motion.button
                    whileHover={{ translateX: -5 }}
                    onClick={() => onPrevPage()}
                    className='h-full overflow-hidden'
                    animate={{
                      opacity: isNoPrev.current ? 0.15 : 1,
                      pointerEvents: isNoPrev.current ? 'none' : 'auto',
                    }}
                    disabled={isNoPrev.current}>
                    <img
                      className='w-13 h-13'
                      src={show_prev_cd}
                      alt='이전 cd 목록 보여주는 아이콘'
                    />
                  </motion.button>

                  <ul className='flex justify-center items-center gap-2  xl:gap-4  2xl:gap-6  w-full h-full'>
                    {cdRackInfo.data.map((data: CDInfo, index: number) => (
                      <motion.li
                        onClick={() => handleSlideChange(index)}
                        key={index}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          transition: {
                            type: 'spring',
                            stiffness: 300,
                            damping: 20,
                          },
                        }}
                        whileHover={{ scale: 1.1 }}
                        className='cursor-pointer'
                        style={
                          activeIndex === index && {
                            border: '2px solid white',
                            borderRadius: '6.4px',
                            boxShadow: '0 4px 10px rgba(255, 255, 255, 0.2)', // 기본 아이템에 흰색 그림자
                            // boxShadow: '0 4px 10px rgba(255, 0, 0, 0.3)', // 활성화된 아이템에 빨간색 그림자
                          }
                        }>
                        <img
                          className='rounded-[6.4px] aspect-square  w-10 h-10 xl:w-15 xl:h-15  2xl:w-17 2xl:h-17'
                          src={data.coverUrl}
                          alt='CD 이미지'
                        />
                      </motion.li>
                    ))}
                  </ul>

                  {/* 이후 cd목록 버튼 */}
                  <motion.button
                    onClick={() => onNextPage(cdRackInfo.nextCursor)}
                    className='h-full overflow-hidden'
                    whileHover={{ translateX: 5 }}
                    animate={{
                      opacity: isNoNext.current ? 0.15 : 1,
                      pointerEvents: isNoNext.current ? 'none' : 'auto',
                    }}
                    disabled={isNoNext.current}>
                    <img
                      className='w-13 h-13'
                      src={show_next_cd}
                      alt='이후 cd 목록 보여주는 아이콘'
                    />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* 토글 버튼 */}
          <motion.button
            onClick={() => setIsDockOpen((prev) => !prev)}
            className='fixed bottom-22 left-12 z-[5]'
            whileTap={{ scale: 0.9 }}>
            <motion.img
              src={show_cd_list}
              alt='cd 목록 보여주는 아이콘'
              className='cursor-pointer w-8 h-8'
              animate={{
                rotate: isDockOpen ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </>
      );
    },
  ),
);

export default Dock;
