import MyRoomIcon from '../../../assets/main/myroom-icon.svg';

export default function MyRoom() {
  return (
    <button
      className='group w-16 h-16 bg-white/20 rounded-full border border-white flex items-center justify-center fixed bottom-20 right-21 -shadow-logo cursor-pointer'
      aria-label='도구 메뉴 열기'>
      <span className='bottom-menu-icon bg-white relative'>
        <img
          className='bottom-menu-img'
          src={MyRoomIcon}
          alt='내 방으로 가기'
        />
      </span>
      {/* tooltip */}
      <span className='absolute bottom-18 w-max bg-white text-[#162C63] text-xs font-semibold rounded-full px-4 py-[10px] opacity-0 group-hover:opacity-100 transition-opacity'>
        마이룸
      </span>
    </button>
  );
}
