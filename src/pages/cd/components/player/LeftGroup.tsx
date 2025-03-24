import muteIcon from '@assets/cd/mute-icon.svg';
import soundIcon from '@assets/cd/sound-icon.svg';

export default function LeftGroup({
  volume,
  cdInfo,
  cdReady,
  cdStateChangeEvent,
  handleChangeCdVolume,
  handleMuteCdVolume,
}) {
  return (
    <article className='flex flex-1 gap-14 items-center h-full'>
      {/* 앨범 이미지 */}
      <img
        className='block h-full aspect-square'
        src={cdInfo?.coverUrl}
        alt='CD 앨범 이미지'
      />

      {/* 음량 */}
      <div className='flex gap-2 justify-center items-center'>
        {cdReady.isMuted ? (
          <button
            className='w-8 h-8'
            onClick={() =>
              handleChangeCdVolume(cdStateChangeEvent, `${volume}`)
            }>
            <img
              className='w-8 h-8 cursor-pointer'
              src={muteIcon}
              alt='음량 아이콘'
            />
          </button>
        ) : (
          <button
            className='w-6 h-6'
            onClick={() => handleMuteCdVolume(cdStateChangeEvent)}>
            <img
              className='w-6 h-6 cursor-pointer'
              src={soundIcon}
              alt='음량 아이콘'
            />
          </button>
        )}

        <input
          type='range'
          min='0'
          max='100'
          value={cdReady.volume}
          onChange={(e) =>
            handleChangeCdVolume(cdStateChangeEvent, e.target.value)
          }
          className=' volume-range'
        />
      </div>
    </article>
  );
}
