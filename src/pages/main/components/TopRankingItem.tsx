import bronzeMedal from '@assets//rank//bronze-medal.svg';
import goldMedal from '@assets//rank//gold-medal.svg';
import silverMedal from '@assets//rank//silver-medal.svg';
import blueFoot from '@assets/rank/blue-footprint.svg';
import pinkFoot from '@assets/rank/pink-footprint.svg';
import { Link } from 'react-router-dom';
import exProfile from '@assets/rank/exProfile.png';

const medalImages = {
  1: goldMedal,
  2: silverMedal,
  3: bronzeMedal,
};

export default function TopRankingItem({ user }) {
  return (
    <div
      className={`
        ${
          user.rank === 1
            ? 'order-2 w-[80px] h-[110px] @2xl:w-[100px] @2xl:h-32'
            : ''
        }
        ${
          user.rank === 2
            ? 'order-1 w-[70px] h-[96px] @2xl:w-[85px] @2xl:h-28'
            : ''
        }
        ${
          user.rank === 3
            ? 'order-3 w-[70px] h-[96px] @2xl:w-[85px] @2xl:h-28'
            : ''
        }
        drop-shadow-logo rounded-b-xl bg-white flex justify-center items-center relative @container
    `}>
      {/* 메달 이미지 */}
      <img
        className={`
          ${user.rank === 1 ? 'w-8 @2xl:w-9' : 'w-7 @2xl:w-8'}
          absolute top-[-8px] right-[-9px] @2xl:top-[-12px] @2xl:right-[-12px]
          `}
        src={medalImages[user.rank]}
        alt={`${user.rank}위`}
      />

      {/* 사용자 정보 */}
      <Link to={`/profile/${user.userId}`}>
        <div className='flex flex-col items-center gap-1'>
          <img
            className={`
            ${
              user.rank === 1 ? 'w-9 h-9 @2xl:w-12 @2xl:h-12' : 'w-7.5 h-7.5 @2xl:w-10  @2xl:h-10'
            } rounded-full`}
            src={user.profileImage || exProfile}
            alt={user.nickname}
          />
          <p
            className={`font-semibold text-xs @2xl:text-sm text-[#162C63] mt-1 max-w-[60px] truncate
          ${
            user.nickname.length > 5
              ? 'text-[10px] @2xl:text-xs'
              : 'text-xs @2xl:text-sm'
          }
          `}>
            {user.nickname}
          </p>

          {/* 방문자 수 */}
          <div className='flex flex-row items-center gap-0.5'>
            <img
              className={`${
                user.rank === 1 ? 'w-2.5 @2xl:w-3' : 'w-2 @2xl:w-2.5'
              }`}
              src={user.rank === 1 ? pinkFoot : blueFoot}
            />
            <p
              className={`
              ${
                user.rank === 1
                  ? 'font-semibold text-xs @2xl:text-sm text-[#BA4B87]'
                  : 'font-medium text-[10px] @2xl:text-xs text-[#4B6BBA]'
              }
              `}>
              {user.score}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
