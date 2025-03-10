import { Link } from 'react-router-dom';
import exProfile from '@assets/rank/exProfile.png';
interface RecommendedUsersProps {
  users: RecommendedUser[];
}

export const RecommendedUsers = ({ users }: RecommendedUsersProps) => {
  if (!users.length) return null;

  return (
    <div className='mt-8'>
      <h2 className='text-lg font-bold text-[#3E507D] mb-4'>
        이런 유저는 어떠세요?
      </h2>
      <div className='grid grid-cols-2 gap-4'>
        {users.map((user) => (
          <Link
            key={user.userId}
            to={`/profile/${user.userId}`}
            className='flex items-center gap-3 p-4 bg-[#4E7ACF]/5 rounded-lg hover:bg-[#4E7ACF]/10 transition-colors'>
            <img
              src={user.profileImage || exProfile}
              alt={`${user.nickname}님의 프로필`}
              className='w-12 h-12 rounded-full object-cover'
            />
            <div>
              <p className='font-medium text-[#3E507D]'>{user.nickname}</p>
              <p className='text-sm text-[#3E507D]/60'>
                취향이 비슷한 유저예요!
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
