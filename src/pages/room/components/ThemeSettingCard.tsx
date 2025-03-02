import lock from '@assets/room/lock.png';
import addCheck from "@assets/room/addFurniture-icon.svg";
import point from '@assets/room/point.png';
import { themeData } from '@constants/roomTheme';

export default function ThemeSettingCard({
  theme,
  isSelected,
  isLocked,
  onClick,
}:ThemeSettingCardProps) {
  return (
    <div
      onClick={!isLocked ? onClick : undefined}
      className={`theme-card border-2 border-[#FCF7FD]
    bg-[#FCF7FD]/20 backdrop-blur-2xl rounded-2xl relative @container
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
        className={`@container flex flex-col items-center justify-center relative w-full h-full rounded-xl bg-[#FCF7FD] p-9 2xl:p-11 transition-transform duration-300`}>
        {isSelected && (
          <img
            className='absolute top-[-10px] right-2.5 w-7 '
            src={addCheck}
            alt='선택 하기'
          />
        )}
        {/* 이미지 썸네일 */}
        <img
          className='w-44 2xl:w-40 mb-3'
          src={themeData[theme].thumbnail
          }
          alt={themeData[theme].title}
        />
        {/* 테마 소개 */}
        <div className='flex flex-col items-center gap-1 '>
          <h2 className='font-bold text-base 3xl:text-lg text-[#162C63]'>
            {themeData[theme].title}
          </h2>
          <p className='font-medium 3xl:font-semibold text-xs 3xl:text-sm text-[#3E507D]/70'>
            {themeData[theme].description}
          </p>
        </div>
      </div>
    </div>
  );
}
