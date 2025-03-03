import RankMenuIcon from '@assets/RankMenu-icon.svg';

export default function RankMenu({onOpen}) {
  return (
    <button
      onClick={onOpen}
      className='group w-16 h-16 bg-white/20 rounded-full border border-white flex items-center justify-center fixed bottom-20 left-21 --drop-shadow-logo cursor-pointer hover:scale-105 transition-all duration-200'
      aria-label='랭킹 보기'>
      <span className='bottom-menu-icon bg-white relative'>
        <img
          className='w-6 @xl:ml-[1px] '
          src={RankMenuIcon}
          alt='랭킹 보기'
        />
      </span>
      {/* tooltip */}
      <span className='absolute bottom-18 w-max bg-white text-[#162C63] text-xs font-semibold rounded-full px-4 py-[9px] opacity-0 group-hover:opacity-100 @xl:text-sm transition-opacity'>
        랭킹
      </span>
    </button>
  );
}
