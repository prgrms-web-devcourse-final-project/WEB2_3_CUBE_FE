import pauseSong from '@assets/cd/pause-icon.svg';
import playSong from '@assets/cd/play-icon.svg';
export default function MiddleGroup({
  handleOnOffCd,
  cdStateChangeEvent,
  cdReady,
}) {
  return (
    <article className='flex flex-col items-center  pl-11 '>
      <button onClick={() => handleOnOffCd(cdStateChangeEvent)}>
        <img
          className='w-11 h-11'
          src={cdReady.isPlaying ? pauseSong : playSong}
          alt='노래 일시정지 버튼'
        />
      </button>
    </article>
  );
}
