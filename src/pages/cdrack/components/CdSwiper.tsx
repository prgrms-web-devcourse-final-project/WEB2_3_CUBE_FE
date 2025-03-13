import { forwardRef, useEffect, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Mousewheel, EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useNavigate, useParams } from 'react-router-dom';

interface CdSwiperProps {
  cdRackDatas: CDInfo[];
  onActiveTrackId: (index: number) => void;
  setSlideWidth: (width: number) => void;
}

const CdSwiper = forwardRef<SwiperRef, CdSwiperProps>(
  ({ cdRackDatas, onActiveTrackId, setSlideWidth }, ref) => {
    const navigate = useNavigate();

    const rotateRefs = useRef<{ [key: number]: { x: number; y: number } }>({});

    const userId = useParams().userId;

    useEffect(() => {
      const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement>,
        index: number,
      ) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateXValue = (1 / 10) * y - 20;
        const rotateYValue = (1 / -10) * x + 20;

        rotateRefs.current[index] = { x: rotateXValue, y: rotateYValue };

        const element = e.currentTarget;
        element.style.transform = `rotateY(${rotateYValue}deg) rotateX(${rotateXValue}deg)`;
        element.style.filter = `drop-shadow(${rotateYValue}px ${rotateXValue}px 20px rgba(0, 0, 0, 0.2))`;
      };

      const handleMouseLeave = (index: number) => {
        rotateRefs.current[index] = { x: 0, y: 0 };

        const element = document.getElementById(`cdSlide-${index}`);
        element.style.transform = `rotateY(0deg) rotateX(0deg)`;
        element.style.filter = 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.2))';
      };

      cdRackDatas.forEach((_, index) => {
        const slide = document.getElementById(`cdSlide-${index}`);
        if (slide) {
          slide.addEventListener('mousemove', (e) => handleMouseMove(e, index));
          slide.addEventListener('mouseleave', () => handleMouseLeave(index));
        }
      });

      return () => {
        cdRackDatas.forEach((_, index) => {
          const slide = document.getElementById(`cdSlide-${index}`);
          if (slide) {
            slide.removeEventListener('mousemove', (e) =>
              handleMouseMove(e, index),
            );
            slide.removeEventListener('mouseleave', () =>
              handleMouseLeave(index),
            );
          }
        });
      };
    }, [cdRackDatas]);

    return (
      <Swiper
        ref={ref}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={4}
        coverflowEffect={{
          rotate: 10,
          stretch: 10,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        mousewheel={true}
        modules={[EffectCoverflow, Mousewheel]}
        onSlideChange={(swiper) => {
          const activeIndex = swiper.realIndex;
          onActiveTrackId(activeIndex);
        }}
        onSwiper={(swiper) =>
          setSlideWidth(swiper.slides[swiper.activeIndex].offsetWidth)
        }
        onResize={(swiper) => {
          setSlideWidth(swiper.slides[swiper.activeIndex].offsetWidth);
        }}
        className='mySwiper'>
        {cdRackDatas?.map((data: CDInfo, index: number) => (
          <SwiperSlide key={data.myCdId}>
            <div
              id={`cdSlide-${index}`}
              className='cursor-pointer transition-transform duration-500 ease-linear relative'
              onClick={() => navigate(`/cd/${data.myCdId}/user/${userId}`)}>
              <img
                className='poster rounded-[10px]'
                src={data.coverUrl}
                alt='앨범 이미지'
              />
              {/* 장르 */}
              <ul className='flex absolute bottom-9 left-1/2 transform -translate-x-1/2 justify-center items-center gap-5'>
                {data.genres.map((genre, index) => (
                  <li
                    className='w-17 py-2 rounded-full bg-[#FFFFFF1A] backdrop-blur-lg flex items-center justify-center'
                    key={index}>
                    <span
                      className={`${
                        genre.length > 5 ? 'text-xs' : 'text-sm'
                      } text-white w-full text-center`}>
                      {genre}
                    </span>
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
