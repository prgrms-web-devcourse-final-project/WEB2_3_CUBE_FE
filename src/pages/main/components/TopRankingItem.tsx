import bronzeMedal from '@assets//rank//bronze-medal.svg';
import goldMedal from '@assets//rank//gold-medal.svg';
import silverMedal from '@assets//rank//silver-medal.svg';
import blueFoot from '@assets/rank/blue-footprint.svg';
import pinkFoot from '@assets/rank/pink-footprint.svg';

const medalImages = {
  1: goldMedal,
  2: silverMedal,
  3: bronzeMedal,
};

export default function TopRankingItem({ rank, nickname, visits, profileImg }) {
  return (
    <div
      className={`
        ${rank === 1 ? 'order-2 w-[80px] h-[110px] 2xl:w-24 2xl:h-32' : ''}
        ${rank === 2 ? 'order-1 w-[70px] h-[96px] 2xl:w-20 2xl:h-28' : ''}
        ${rank === 3 ? 'order-3 w-[70px] h-[96px] 2xl:w-20 2xl:h-28' : ''}
        drop-shadow-logo rounded-b-xl bg-white flex justify-center items-center relative 
    `}>
      {/* 메달 이미지 */}
      <img
        className='w-6 2xl:w-7 absolute top-[-10px] right-[-13px]'
        src={medalImages[rank]}
        alt={`${rank}위`}
      />

      {/* 사용자 정보 */}
      <div className='flex flex-col items-center gap-1'>
        <img
          className={`
            ${rank === 1 ? 'w-9 2xl:w-12' : 'w-7.5 2xl:w-10'} rounded-full`}
          src={profileImg}
          alt={nickname}
        />
        <p className='font-semibold 2xl:font-bold text-xs 2xl:text-sm text-[#162C63] mt-1'>
          {nickname}
        </p>

        {/* 방문자 수 */}
        <div className='flex flex-row items-center gap-0.5'>
          <img 
          className={`${rank === 1 ? 'w-2.5 2xl:w-3' : 'w-2 2xl:w-2.5'}`} 
          src={rank === 1 ? pinkFoot : blueFoot} />
          <p
            className={`
              font-${rank === 1 ? 'semibold' : 'medium'} 
              ${rank === 1 ? 'text-xs 2xl:text-sm' : 'text-[10px] 2xl:text-xs'}
              text-[#${rank === 1 ? 'BA4B87' : '4B6BBA'}]`}
            >
            {visits}
          </p>
        </div>
      </div>
    </div>
  );
}
