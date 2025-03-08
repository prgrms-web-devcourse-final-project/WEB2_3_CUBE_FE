import gameOver from '@assets/event/game-over.svg';

export default function FailScreen() {
  return (
    <div className='absolute  top-44  left-49 flex flex-col items-center gap-4.5'>
      <div className='flex flex-col items-center'>
        <img
          src={gameOver}
          alt='게임 실패 이미지'
        />
      </div>

      <p className='text-white   text-center text-[18px] font-semibold '>
        다음 이벤트에 참여해주세요
      </p>
    </div>
  );
}
