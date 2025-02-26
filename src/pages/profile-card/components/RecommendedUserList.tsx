import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface RecommendedUserListProps {
  users: RecommendedUser[];
}

const RecommendedUserList = ({ users }: RecommendedUserListProps) => {
  return (
    <div className='flex flex-col w-full gap-4 bg-[#B5B5B5]/10 rounded-2xl px-8 py-4'>
      <h3 className='text-[#224DBA] text-lg font-bold text-center'>
        나와 취향이 비슷한 유저
      </h3>

      <div className='relative w-full overflow-hidden'>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={5}
          navigation
          loop={true}
          className='w-full'>
          {users.map((user) => (
            <SwiperSlide key={user.userId}>
              <div className='flex flex-col items-center w-[80px] h-[100px] py-4 bg-white shadow-md rounded-[10px] mb-1 cursor-pointer'>
                <div className='w-10 h-10 mb-2 shrink-0'>
                  <img
                    src={user.profileImage}
                    alt={`${user.nickname}님의 프로필`}
                    className='w-full h-full rounded-full bg-[#E8F0FE] object-cover'
                  />
                </div>
                <span className='text-sm text-[#3E507D] text-center w-full px-2 truncate font-semibold'>
                  {user.nickname}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecommendedUserList;
