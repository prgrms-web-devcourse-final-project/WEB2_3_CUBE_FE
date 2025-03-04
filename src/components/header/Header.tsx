import { useState, useRef, useEffect } from 'react';
import logo from '@/assets/header/header-logo.svg';
import humburgerIcon from '@/assets/header/hamburger-icon.svg';
import notificationIcon from '@/assets/header/notification-icon.svg';
import housemateIcon from '@/assets/header/housemate-list-icon.svg';
import { Link } from 'react-router-dom';
import HiddenMenu from './menus/HiddenMenu';
import HousemateModal from './menus/housemate-modal/HousemateModal';
import NotificationModal from './menus/notification-modal/NotificationModal';
import { notificationAPI } from '../../apis/notification';
import { useUserStore } from '@/store/useUserStore';
import { useToastStore } from '@/store/useToastStore';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHousemateModalOpen, setIsHousemateModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const housemateButtonRef = useRef<HTMLButtonElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const showToast = useToastStore((state) => state.showToast);

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

  useEffect(() => {
    const handleNewNotification = (event: CustomEvent) => {
      console.log('Header: 알림 이벤트 수신:', event.detail);
      setHasUnreadNotifications(true);
      setIsNewNotification(true);

      // 토스트 알림 추가
      showToast('새로운 알림이 있습니다', 'success');

      setTimeout(() => {
        setIsNewNotification(false);
      }, 3000);
    };

    window.addEventListener(
      'newNotification',
      handleNewNotification as EventListener,
    );
    return () => {
      window.removeEventListener(
        'newNotification',
        handleNewNotification as EventListener,
      );
    };
  }, [showToast]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleHousemateModal = () => {
    setIsHousemateModalOpen(!isHousemateModalOpen);
  };

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  // 알림 읽음 상태 업데이트 함수
  const updateNotificationStatus = (hasUnread: boolean) => {
    setHasUnreadNotifications(hasUnread);
  };

  return (
    <>
      <header className='fixed top-0 z-50 items-start py-10 w-full pointer-events-none px-21 item-between'>
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
            ref={notificationButtonRef}
            type='button'
            aria-label='알림'
            onClick={toggleNotificationModal}
            className='relative cursor-pointer'>
            <img
              src={notificationIcon}
              alt='알림'
              className='w-8 h-8'
            />
            <div className='absolute top-[2.5px] right-[5.7px]'>
              {/* 기본 알림 점 */}
              <div
                className={`w-2 h-2 bg-orange-500 rounded-full z-50
                  ${isNewNotification ? 'animate-notification-ping' : ''}`}
              />
              {/* 네온 효과 */}
              {isNewNotification && (
                <div
                  className={`absolute top-[2.5px] right-[5.7px] w-8 h-8 rounded-full z-50
                    animate-notification-glow
                    before:content-[''] before:absolute before:-inset-4
                    before:bg-gradient-radial before:from-orange-500/40 before:via-orange-500/20 before:to-transparent
                    before:rounded-full before:blur-sm`}
                />
              )}
            </div>
            <div className='hidden'>
              hasUnread: {hasUnreadNotifications.toString()}, isNew:{' '}
              {isNewNotification.toString()}
            </div>
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
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        buttonRef={notificationButtonRef}
        onNotificationStatusChange={updateNotificationStatus}
      />
    </>
  );
};

export default Header;
