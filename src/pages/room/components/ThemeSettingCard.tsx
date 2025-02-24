import ExImg from '@assets/main/exRoomtheme.png';
import checkIcon from '@assets/room/checkIcon.svg';
import lock from '@assets/room/lock.png';
import point from '@assets/room/point.png';

const themeData = {
  basic: {
    title: '베이직',
    description: '심플하고 깔끔한 스타일',
  },
  modernCentury: {
    title: '모던 센추리',
    description: '클래식한 세련된 스타일',
  },
  retro: {
    title: '레트로',
    description: '복고풍 개성 있는 스타일',
  },
};

export default function ThemeSettingCard({
  theme,
  isSelected,
  isLocked,
  onClick,
}) {
  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={`theme-card border-2 border-[#FCF7FD]
    bg-[#FCF7FD]/20 backdrop-blur-2xl rounded-2xl relative
      drop-shadow-modal items-center justify-center p-1.5 transition-all duration-300 ease-in-out
    ${
      isSelected
        ? 'scale-100 opacity-100'
        : isLocked
        ? 'scale-90 hover:scale-98 hover:opacity-90'
        : 'scale-90 opacity-70 hover:scale-98 hover:opacity-90'
    }
  `}>
      {/* 잠김 스타일 */}
      {isLocked && (
        <div
          className={`absolute z-10 flex flex-col items-center justify-center 2xl:gap-6 gap-4 w-full h-full 
          bg-[#D8E5FF]/50 backdrop-blur-lg rounded-2xl drop-shadow-modal p-1.5
          transition-all duration-300 ease-in-out
          `}>
          <img
            src={lock}
            className='drop-shadow-logo'
          />
          <div className='flex flex-row items-center gap-1 bg-white/30 rounded-full px-2 py-1'>
            <img
              src={point}
              className='w-4'
            />
            <p className='font-medium text-xs 2xl:text-sm text-[#162C63]'>400P</p>
          </div>
        </div>
      )}
      {/* 테마 컨텐츠 */}
      <div
        className={`flex flex-col items-center justify-center relative w-full h-full rounded-xl bg-[#FCF7FD] p-11 transition-transform duration-300`}>
        {isSelected && (
          <img
            className='absolute top-2.5 right-2.5 w-5 h-5 2xl:w-7 2xl:h-7'
            src={checkIcon}
            alt='선택 하기'
          />
        )}
        {/* 이미지 썸네일 */}
        <img
          className='2xl:w-28'
          src={ExImg}
          alt={themeData[theme].title}
        />
        {/* 테마 소개 */}
        <div className='flex flex-col items-center gap-1'>
          <h2 className='font-bold text-base 2xl:text-lg text-[#162C63]'>
            {themeData[theme].title}
          </h2>
          <p className='font-medium 2xl:font-semibold text-[10px] 2xl:text-sm text-[#3E507D]/70'>
            {themeData[theme].description}
          </p>
        </div>
      </div>
    </div>
  );
}
