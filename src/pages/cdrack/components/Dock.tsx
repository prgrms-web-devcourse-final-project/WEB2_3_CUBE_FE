import React, { forwardRef, useMemo, useState } from 'react';
import show_next_cd from '@assets/cd/show-next-cd.svg';
import show_prev_cd from '@assets/cd/show-prev-cd.svg';
import show_cd_list from '@assets/cd/show-cd-list.svg';
import deleteIcon from '@assets/cd/trash-icon.svg';
import { SwiperRef } from 'swiper/react';
import { AnimatePresence, motion } from 'framer-motion';
import { deleteCdsFromMyRack } from '@apis/cd';
import ConfirmModal from '@components/ConfirmModal';
import { useToastStore } from '@/store/useToastStore';
import { useUserStore } from '@/store/useUserStore';
import { useParams } from 'react-router-dom';

interface DockProps {
  isEmpty?: boolean;
  cdRackInfo?: CDRackInfo;
  activeIndex?: number;
  setCdRackInfo: (cd: CDRackInfo) => void;
  onPrevPage?: () => void;
  onNextPage?: (cursor: number) => void;
}

const Dock = React.memo(
  forwardRef<SwiperRef, DockProps>(
    (
      {
        isEmpty = true,
        cdRackInfo,
        activeIndex,
        onPrevPage,
        onNextPage,
        setCdRackInfo,
      },
      ref,
    ) => {
      const [isDockOpen, setIsDockOpen] = useState(true);
      const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
      const { showToast } = useToastStore();

      const isNoPrev = useMemo(
        () =>
          cdRackInfo?.data?.length
            ? cdRackInfo.data[0]?.myCdId === cdRackInfo.firstMyCdId
            : false,
        [cdRackInfo],
      );

      const isNoNext = useMemo(
        () =>
          cdRackInfo?.data?.length
            ? cdRackInfo.data[cdRackInfo.data.length - 1]?.myCdId ===
              cdRackInfo.lastMyCdId
            : false,
        [cdRackInfo],
      );
      const { userId: myUserId } = useUserStore().user; // `useMemo` 필요 없음
      const { userId: parsedUserId } = useParams();
      const userId = useMemo(() => Number(parsedUserId), [parsedUserId]);

      // DOCK 반응형 너비 지정
      const dockWidth = useMemo(() => {
        if (!isDockOpen) return 0;
        const itemWidth =
          window.innerWidth >= 1536 ? 68 : window.innerWidth >= 1280 ? 60 : 40;
        const gap =
          window.innerWidth >= 1536 ? 24 : window.innerWidth >= 1280 ? 16 : 8;
        const buttonWidth = 104;
        const minDockWidth = 200;
        if (!cdRackInfo?.data?.length) {
          return minDockWidth;
        }
        const totalItemsWidth =
          cdRackInfo?.data?.length * itemWidth +
          (cdRackInfo?.data?.length - 1) * gap;

        const totalWidth = totalItemsWidth + buttonWidth + 16;

        return Math.min(totalWidth, window.innerWidth * 0.8);
      }, [cdRackInfo, isDockOpen]);

      const handleSlideChange = (index: number) => {
        const swiper = (ref as React.RefObject<SwiperRef>)?.current?.swiper;
        if (!swiper) return;
        swiper.slideTo(index);
        swiper.update();
      };

      const handleDeleteCd = async (cdId: number) => {
        const previousCdDatas = cdRackInfo;
        try {
          const updatedData = cdRackInfo?.data?.filter(
            (item) => item.myCdId !== cdId,
          );

          const newFirstMyCdId =
            cdId === cdRackInfo?.firstMyCdId
              ? updatedData.length > 0
                ? updatedData[0].myCdId
                : null
              : cdRackInfo?.firstMyCdId;

          const newLastMyCdId =
            cdId === cdRackInfo?.lastMyCdId
              ? updatedData.length > 0
                ? updatedData[updatedData.length - 1].myCdId
                : null
              : cdRackInfo?.lastMyCdId;

          setCdRackInfo({
            ...cdRackInfo,
            data: updatedData,
            firstMyCdId: newFirstMyCdId,
            lastMyCdId: newLastMyCdId,
            totalCount: cdRackInfo?.totalCount - 1,
          });

          await deleteCdsFromMyRack([cdId]);
          setIsConfirmModalOpen(false);
          showToast(`선택한 CD가 삭제되었어요!`, 'success');
        } catch (error) {
          showToast(`CD를 삭제하는데 실패했어요.`, 'error');
          setCdRackInfo(previousCdDatas);
        }
      };

      console.log(dockWidth);

      return (
        <>
          <AnimatePresence>
            <motion.div
              className='fixed bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[5] rounded-2xl border-2 border-[#fff] bg-[#FFFFFF33] backdrop-blur-[20px] h-[110px]'
              animate={{
                // width: isDockOpen ? 'auto' : 0,
                width: isDockOpen ? dockWidth : 0,
                maxWidth: isDockOpen ? '80vw' : '0vw',
                opacity: isDockOpen ? 1 : 0,
              }}>
              {isEmpty ? (
                <div className='h-full flex items-center justify-center p-8 '>
                  <span className='text-white text-lg'>｡°(っ°´o`°ｃ)°｡</span>
                </div>
              ) : (
                <div className=' h-full flex justify-center items-center gap-2  '>
                  {/* 이전 cd목록 버튼 */}
                  <motion.button
                    whileHover={{ translateX: -5 }}
                    onClick={() => onPrevPage()}
                    className='h-full overflow-hidden '
                    animate={{
                      opacity: isNoPrev ? 0.15 : 1,
                      pointerEvents: isNoPrev ? 'none' : 'auto',
                    }}
                    disabled={isNoPrev}>
                    <img
                      className='w-13 h-13'
                      src={show_prev_cd}
                      alt='이전 cd 목록 보여주는 아이콘'
                    />
                  </motion.button>

                  <ul className='flex justify-center items-center gap-2 xl:gap-4 2xl:gap-6 h-full w-full'>
                    {cdRackInfo?.data?.map((data: CDInfo, index: number) => (
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
                        className='cursor-pointer relative  group'
                        style={
                          activeIndex === index && {
                            border: '2px solid white',
                            borderRadius: '6.4px',
                            boxShadow: '0 4px 10px rgba(255, 255, 255, 0.2)', // 기본 아이템에 흰색 그림자
                          }
                        }>
                        <img
                          className='rounded-[6.4px] aspect-square  w-10 h-10 xl:w-15 xl:h-15 2xl:w-17 2xl:h-17'
                          src={data.coverUrl}
                          alt='CD 이미지'
                        />
                        {/* 휴지통 */}
                        {myUserId === userId && (
                          <div
                            onClick={() => setIsConfirmModalOpen(true)}
                            className='absolute top-[-10px] right-[-10px] w-6 h-6 bg-white rounded-full
                         flex items-center justify-center  opacity-0  group-hover:opacity-100 all-200-eio '>
                            <img
                              src={deleteIcon}
                              alt=''
                              className='w-5 h-5'
                            />
                          </div>
                        )}
                      </motion.li>
                    ))}
                  </ul>

                  {/* 이후 cd목록 버튼 */}
                  <motion.button
                    onClick={() => onNextPage(cdRackInfo?.nextCursor)}
                    className=' overflow-hidden'
                    whileHover={{ translateX: 5 }}
                    animate={{
                      opacity: isNoNext ? 0.15 : 1,
                      pointerEvents: isNoNext ? 'none' : 'auto',
                    }}
                    disabled={isNoNext}>
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
            className='fixed bottom-22 left-18 z-[5]'
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
          {isConfirmModalOpen && (
            <ConfirmModal
              onClose={() => setIsConfirmModalOpen(false)}
              onConfirm={() =>
                handleDeleteCd(cdRackInfo?.data[activeIndex]?.myCdId)
              }
              title='cd를 삭제하실건가요?'
              subTitle='템플릿과 댓글도 전부 사라집니다.'
            />
          )}
        </>
      );
    },
  ),
);

export default Dock;
