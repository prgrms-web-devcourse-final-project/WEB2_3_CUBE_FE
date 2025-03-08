import React from 'react';
import gameSuccess from '@assets/event/game-success.svg';

export default function SuccessScreen({ eventInfo }) {
  return (
    <div className='absolute  top-54  left-42 flex flex-col items-center gap-4.5'>
      <div className='flex flex-col items-center'>
        <img
          src={gameSuccess}
          alt='게임 성공 이미지'
        />
      </div>

      <div className='font-semibold'>
        <p className='text-white   text-center text-[18px]  '>
          {`선착순 ${eventInfo?.maxParticipants}명`}
        </p>
        <p className='text-white   text-center text-[18px] '>
          {` ${eventInfo?.rewardPoints} 포인트 지급 이벤트`}
        </p>
      </div>
    </div>
  );
}
