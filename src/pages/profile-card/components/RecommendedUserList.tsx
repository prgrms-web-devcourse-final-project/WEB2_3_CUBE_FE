import { Swiper, SwiperSlide } from 'swiper/react';
import { RecommendedUser } from './types';
import 'swiper/css';

interface RecommendedUserListProps {
  users: RecommendedUser[];
}

const RecommendedUserList = ({ users }: RecommendedUserListProps) => {
  return (
    <div className='item-row gap-2 bg-[#B5B5B5]/10 rounded-2xl px-8 py-4 w-full'>
      <h3 className='font-bold text-[#224DBA]'>비슷한 취향의 유저</h3>

      <Swiper
        spaceBetween={8}
        slidesPerView={5}
        className='w-full'>
        {users.map((user) => (
          <SwiperSlide key={user.userId}>
            <li className='gap-2 bg-[#FCF7FD] rounded-xl p-4 item-row drop-shadow-logo'>
              <img
                src={user.profileImage}
                alt={`${user.nickname}님의 프로필`}
                className='object-cover w-10 h-10 rounded-full'
              />
              <strong className='text-[#3E507D] font-semibold'>
                {user.nickname}
              </strong>
            </li>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecommendedUserList;
