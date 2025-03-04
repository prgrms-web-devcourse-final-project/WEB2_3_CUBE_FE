import blueFoot from '@assets/rank/blue-footprint.svg';
import { Link } from 'react-router-dom';

export default function RankingItem({ user }) {
  return (
      <Link to={`/profile/${user.userId}`}>
    <div className='@container bg-[#73A1F7]/5 w-full @2xl:py-3 px-6 py-2 rounded-lg @2xl:rounded-xl'>
        <div className='grid grid-cols-[30px_1fr_auto] gap-x-8 items-center text-[#4B6BBA]'>
          {/* 랭킹 번호 */}
          <p className='font-black text-base @2xl:text-xl text-center'>
            {user.rank}
          </p>

          {/* 닉네임 */}
          <p className='font-bold @2xl:text-sm text-xs text-center truncate max-w-[120px] whitespace-nowrap'>
            {user.nickname}
          </p>

          {/* 방문자 수 */}
          <div className='flex flex-row items-center gap-0.5'>
            <img
              src={blueFoot}
              className='w-2 @2xl:w-3'
            />
            <p className='font-medium text-xs @2xl:text-sm'>{user.score}</p>
          </div>
        </div>
    </div>
      </Link>
  );
}
