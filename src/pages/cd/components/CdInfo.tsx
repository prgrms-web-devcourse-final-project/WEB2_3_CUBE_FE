import playingCD from '@assets/cd/playing-cd.png';
import { truncateTitle } from '@utils/truncate';

export default function CdInfo({ cdInfo }: { cdInfo: CDInfo }) {
  return (
    <div className='w-[36%] h-full  flex flex-col gap-10'>
      <div className='text-white flex flex-col gap-1.5 text-center'>
        <span className='2xl:text-2xl  text-xl font-semibold opacity-70'>
          {cdInfo.artist}
        </span>
        <h1 className='2xl:text-[40px] text-2xl font-bold '>
          {truncateTitle(cdInfo.title, 40)}
        </h1>
      </div>

      <img
        className='w-full  2xl:h-[520px] min-w-[220px] block  '
        src={playingCD}
        alt='cd가 들어간 cd플레이어 이미지'
      />
    </div>
  );
}
