import { forwardRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Mousewheel, EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useNavigate, useParams } from 'react-router-dom';

interface CdSwiperProps {
  cdDatas: { data: CDInfo[]; nextCursor: number };
  onActiveTrackId: (index: number) => void;
}

const CdSwiper = forwardRef<SwiperRef, CdSwiperProps>(
  ({ cdDatas, onActiveTrackId }, ref) => {
    const cdData = cdDatas.data;
    const navigate = useNavigate();
    const [rotateX, setRotateX] = useState<{ [key: number]: number }>({});
    const [rotateY, setRotateY] = useState<{ [key: number]: number }>({});
    const userId = useParams().userId;
    const handleMouseMove = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number,
    ) => {
      const rect = e.currentTarget.getBoundingClientRect(); // 요소 위치 정보 가져오기
      const x = e.clientX - rect.left; // 요소 내부에서의 X 좌표
      const y = e.clientY - rect.top; // 요소 내부에서의 Y 좌표

      const rotateX = (1 / 10) * y - 20;
      const rotateY = (1 / -10) * x + 20;

      setRotateX((prev) => ({
        ...prev,
        [index]: rotateX, // 마우스를 움직일 때 X축 회전값 적용
      }));
      setRotateY((prev) => ({
        ...prev,
        [index]: rotateY, // 마우스를 움직일 때 Y축 회전값 적용
      }));
    };

    const handleMouseLeave = (index: number) => {
      setRotateX((prev) => ({
        ...prev,
        [index]: 0, // 마우스를 떼면 원래대로 복귀
      }));
      setRotateY((prev) => ({
        ...prev,
        [index]: 0, // 마우스를 떼면 원래대로 복귀
      }));
    };

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
        className='mySwiper'>
        {cdData.map((data: CDInfo, index: number) => (
          <SwiperSlide
            key={data.myCdId}
            className='relative '>
            <div
              className=' cursor-pointer  transition-transform duration-500 ease-linear '
              style={{
                transform: ` rotateY(${rotateY[index] || 0}deg) rotateX(${
                  rotateX[index] || 0
                }deg)`,
                filter: `drop-shadow(${rotateY[index] || 0}px ${
                  rotateX[index] || 0
                }px 20px rgba(0, 0, 0, 0.5))`, // 그림자 방향 조정
              }}
              onClick={() => navigate(`/cd/${data.myCdId}/user/${userId}`)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}>
              <img
                className='poster rounded-[10px]'
                src={data.coverUrl}
                alt='앨범 이미지'
              />
            </div>

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
          </SwiperSlide>
        ))}
      </Swiper>
    );
  },
);

export default CdSwiper;
