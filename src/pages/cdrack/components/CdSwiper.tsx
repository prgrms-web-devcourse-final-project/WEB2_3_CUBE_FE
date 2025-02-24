import { forwardRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Mousewheel, EffectCoverflow, Virtual } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

interface CdSwiperProps {
  datas: CDInfo[];
  onActiveTrackId: (index: number) => void;
}

const CdSwiper = forwardRef<SwiperRef, CdSwiperProps>(
  ({ datas, onActiveTrackId }, ref) => {
    return (
      <Swiper
        ref={ref}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={4}
        virtual
        coverflowEffect={{
          rotate: 10,
          stretch: 10,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        mousewheel={true}
        modules={[EffectCoverflow, Mousewheel, Virtual]}
        onSlideChange={(swiper) => {
          const activeIndex = swiper.realIndex;
          onActiveTrackId(activeIndex);
        }}
        className='mySwiper'>
        {datas.map((data: CDInfo) => (
          <SwiperSlide key={data.trackId}>
            <div className='relative'>
              <img
                className='poster'
                src={data.imgUrl}
                alt='앨범 이미지'
              />
              {/* 장르 */}
              <ul className='flex absolute bottom-8 left-1/2 transform -translate-x-1/2 justify-center items-center gap-5'>
                {data.genres.map((genre, index) => (
                  <li
                    className='w-16 h-7 rounded-[80px] bg-[#FFFFFF1A] backdrop-blur-[20px] flex items-center justify-center'
                    key={index}>
                    <span className='text-[14px] text-white'>{genre}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  },
);

export default CdSwiper;
