import { useState, useRef, useEffect } from 'react';
import logo from '@/assets/header/header-logo.svg';
import humburgerIcon from '@/assets/header/hamburger-icon.svg';
import notificationIcon from '@/assets/header/notification-icon.svg';
import housemateIcon from '@/assets/header/housemate-list-icon.svg';
import { Link } from 'react-router-dom';
import HiddenMenu from './menus/HiddenMenu';
import HousemateModal from './menus/HousemateModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHousemateModalOpen, setIsHousemateModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const housemateButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleHousemateModal = () => {
    setIsHousemateModalOpen(!isHousemateModalOpen);
  };

  return (
    <>
      <header className='fixed top-0 z-50 items-start w-full py-10 pointer-events-none px-21 item-between'>
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
              className='w-8 h-8'
            />
          </button>
          <button
            ref={housemateButtonRef}
            type='button'
            aria-label='하우스메이트'
            onClick={toggleHousemateModal}
            className='cursor-pointer'>
            <img
              src={housemateIcon}
              alt='하우스메이트'
              className='w-8 h-8'
            />
          </button>
          <div className='relative pointer-events-auto'>
            <button
              ref={buttonRef}
              type='button'
              aria-label='메뉴'
              aria-haspopup='true'
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
              className='cursor-pointer item-middle'>
              <img
                src={humburgerIcon}
                alt='메뉴'
                className='w-8 h-8'
              />
            </button>
            <HiddenMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
            />
          </div>
        </nav>
      </header>
      <HousemateModal
        isOpen={isHousemateModalOpen}
        onClose={() => setIsHousemateModalOpen(false)}
        buttonRef={housemateButtonRef}
      />
    </>
  );
};

export default Header;
