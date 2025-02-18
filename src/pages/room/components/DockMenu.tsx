import { useState, useRef, useEffect } from 'react';
import dockMenuIcon from '../../../assets/dockmenu-icon.svg';
import preferenceNoselectIcon from '../../../assets/preference-noselect-Icon.svg';
import preferenceIcon from '../../../assets/preferenceIcon.svg';
import themeNoselectIcon from '../../../assets/theme-noselect-Icon.svg';
import themeIcon from '../../../assets/themeIcon.svg';

export default function DockMenu({activeSettings, onSettingsChange}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const hanldeClickOutside = (event) => {
      if(menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', hanldeClickOutside);

    return () => {
      document.removeEventListener('mousedown', hanldeClickOutside);
    }
  }, [])

  const getCurrentIcon = () => {
    if (activeSettings === 'preference' && !isOpen) return preferenceIcon;
    if (activeSettings === 'theme' && !isOpen) return themeIcon;
    return dockMenuIcon;
  };

  const handleSettingClick = (setting) => {
    setIsOpen(false);
    onSettingsChange(setting);
  }

  const handleMainButtonClick = () => {
    if (activeSettings && !isOpen) {
      onSettingsChange(null);
    }
    setIsOpen(!isOpen);
  }

  const getMainButtonBackground = () => {
    if (isOpen && activeSettings) {
      return 'bg-transparent hover:bg-white/50';
    }
    return 'bg-white';
  };

  return (
    <div
      ref={menuRef}
      className={`bottom-menu bottom-20 right-21 drop-shadow-logo relative ${
        isOpen ? 'h-[202px]' : 'h-16'
      }`}>
        <div className='relative h-full w-full flex flex-col-reverse gap-5 items-center'>

      {/* 도구 메뉴 버튼 */}
      <button
        className={`bottom-menu-icon group absolute ${getMainButtonBackground()}`}
        onClick={handleMainButtonClick}
        aria-label='도구 메뉴 열기'>
        <img
          className='bottom-menu-img'
          src={getCurrentIcon()}
          alt='도구 메뉴'
        />

        {/* tooltip */}
        <span className='absolute right-full mr-4 w-max bg-white text-[#162C63] text-xs font-semibold rounded-full px-4 py-[10px] opacity-0 group-hover:opacity-100 transition-opacity'>
          내방 설정하기
        </span>
      </button>

      {/* 취향 설정 */}
      <div
        className={`bottom-menu-content transition-all duration-100 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        <button 
          onClick={() => handleSettingClick('preference')}
          className={`bottom-menu-icon group absolute bottom-[72px] ${
              activeSettings === 'preference' ? 'bg-white' : 'bg-transparent hover:bg-white/50'
            }`}>
          <img
            className={`bottom-menu-img absolute transition-opacity ${
                activeSettings === 'preference' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            src={preferenceIcon}
            alt='취향 설정'
          />
          <img
            className={`bottom-menu-img absolute transition-opacity ${
              activeSettings === 'preference' ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
            }`}
            src={preferenceNoselectIcon}
            alt='취향 설정'
          />

          {/* tooltip */}
          <span className='absolute right-full mr-4 w-max bg-white text-[#162C63] text-xs font-semibold rounded-full px-4 py-[10px] opacity-0 group-hover:opacity-100 transition-opacity'>
            취향 설정하기
          </span>
        </button>

      {/* 테마 설정 */}
        <button 
          onClick={() => handleSettingClick('theme')}
          className={`bottom-menu-icon group absolute bottom-[138px] ${
            activeSettings === 'theme' ? 'bg-white' : 'bg-transparent hover:bg-white/50'
          }`}>
          <img
            className={`bottom-menu-img absolute transition-opacity ${
              activeSettings === 'theme' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            src={themeIcon}
            alt='테마 설정'
          />
          <img
            className={`bottom-menu-img absolute transition-opacity ${
              activeSettings === 'theme' ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
            }`}
            src={themeNoselectIcon}
            alt='테마 설정'
          />

          {/* tooltip */}
          <span className='absolute right-full mr-4 w-max bg-white text-[#162C63] text-xs font-semibold rounded-full px-4 py-[10px] opacity-0 group-hover:opacity-100 transition-opacity'>
            테마 설정하기
          </span>
        </button>
      </div>
    </div>
    </div>

  );
}
