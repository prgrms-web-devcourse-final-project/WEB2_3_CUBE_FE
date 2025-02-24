import { useState } from 'react';
import logo from '@/assets/header/header-logo.svg';
import humburgerIcon from '@/assets/header/hamburger-icon.svg';
import notificationIcon from '@/assets/header/notification-icon.svg';
import housemateIcon from '@/assets/header/housemate-list-icon.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='fixed top-0 z-50 items-start w-full p-6 pointer-events-none item-between'>
      {/* 로고 */}
      <h1 className='pointer-events-auto'>
        <Link to='/'>
          <img
            src={logo}
            alt='logo'
          />
        </Link>
      </h1>
      {/* 네비게이션 */}
      <nav className='gap-4 pointer-events-auto item-row'>
        <button
          type='button'
          aria-label='알림'
          className='cursor-pointer'>
          <img
            src={notificationIcon}
            alt='알림'
            className='w-10 h-10'
          />
        </button>
        <button
          type='button'
          aria-label='하우스메이트'
          className='cursor-pointer'>
          <img
            src={housemateIcon}
            alt='하우스메이트'
            className='w-10 h-10'
          />
        </button>
        <div className='relative pointer-events-auto'>
          <button
            type='button'
            aria-label='메뉴'
            aria-haspopup='true'
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            className='cursor-pointer item-middle'>
            <img
              src={humburgerIcon}
              alt='메뉴'
              className='w-10 h-10'
            />
          </button>
          {/* 숨김 메뉴 */}
          <div className={`absolute w-38 right-[130%] top-0 p-2 border-2 border-white bg-white/30 backdrop-blur-lg rounded-xl font-semibold  ${
                isMenuOpen ? 'block' : 'hidden'
              }`}>
            <ul
              className='px-4 py-2 overflow-hidden bg-white rounded-lg shadow-lg '>
              <li>
                <Link
                  to='/'
                  className='inline-block w-full px-4 py-2 text-center border-b border-gray-100 text-[#2E4D99]/50 hover:text-[#2E4D99] transition-colors'>
                  나의 룸
                </Link>
              </li>
              <li>
                <button
                  type='button'
                  className='w-full px-4 py-2 text-center border-b border-gray-100  text-[#2E4D99]/50 hover:text-[#2E4D99] transition-colors'>
                  내 프로필
                </button>
              </li>
              <li>
                <button
                  type='button'
                  className='w-full px-4 py-2 text-center text-[#2E4D99]/50 hover:text-[#2E4D99] transition-colors'>
                  로그아웃
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
