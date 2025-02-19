import RankMenuIcon from '@assets/RankMenu-icon.svg';

export default function RankMenu() {
  return (
    <button
      className='group w-16 h-16 bg-white/20 rounded-full border border-white flex items-center justify-center fixed bottom-20 left-21 --drop-shadow-logo cursor-pointer'
      aria-label='도구 메뉴 열기'>
      <span className='bottom-menu-icon bg-white relative'>
        <img
          className='bottom-menu-img'
          src={RankMenuIcon}
          alt='도구 메뉴'
        />
      </span>
      {/* tooltip */}
      <span className='absolute bottom-18 w-max bg-white text-[#162C63] text-xs font-semibold rounded-full px-4 py-[10px] opacity-0 group-hover:opacity-100 transition-opacity'>
        랭킹
      </span>
    </button>
  );
}
