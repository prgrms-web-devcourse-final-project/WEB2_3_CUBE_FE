import RankMenuIcon from '../../../assets/RankMenu-icon.svg';

export default function RankMenu() {
  return (
    <button
      className='w-16 h-16 bg-white/20 rounded-full border border-white flex items-center justify-center fixed bottom-20 left-21 shadow-logo cursor-pointer'
      aria-label='도구 메뉴 열기'>
      <span className='bottom-menu-icon'>
        <img
          className='bottom-menu-img'
          src={RankMenuIcon}
          alt='도구 메뉴'
        />
      </span>
    </button>
  );
}
