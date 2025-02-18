import { useState, useRef, useEffect } from 'react';
import dockMenuIcon from '../../../assets/dockmenu-icon.svg';
import preferenceNoselectIcon from '../../../assets/preference-noselect-Icon.svg';
import preferenceIcon from '../../../assets/preferenceIcon.svg';
import themeNoselectIcon from '../../../assets/theme-noselect-Icon.svg';
import themeIcon from '../../../assets/themeIcon.svg';

export default function DockMenu() {
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
  })

  return (
    <div
      ref={menuRef}
      className={`bottom-menu bottom-20 right-21 --shadow-logo relative ${
        isOpen ? 'h-[202px]' : 'h-16'
      }`}>
        <div className='relative h-full w-full flex flex-col-reverse gap-5 items-center'>

      {/* 도구 메뉴 버튼 */}
      <button
        className='bottom-menu-icon group absolute'
        onClick={() => setIsOpen(!isOpen)}
        aria-label='도구 메뉴 열기'>
        <img
          className='bottom-menu-img'
          src={dockMenuIcon}
          alt='도구 메뉴'
        />

        {/* tooltip */}
        <span className='absolute right-full mr-4 w-max bg-white text-[#162C63] text-xs font-semibold rounded-full px-4 py-[10px] opacity-0 group-hover:opacity-100 transition-opacity'>
          내방 설정하기
        </span>
      </button>

      {/* 취향 설정 & 테마 설정 */}
      <div
        className={`bottom-menu-content transition-all duration-100 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        <button className='bottom-menu-icon group absolute bottom-[68px]'>
          <img
            className='bottom-menu-img absolute opacity-0 group-hover:opacity-100 transition-opacity'
            src={preferenceIcon}
            alt='취향 설정'
          />
          <img
            className='bottom-menu-img absolute opacity-100 group-hover:opacity-0 transition-opacity'
            src={preferenceNoselectIcon}
            alt='취향 설정'
          />

          {/* tooltip */}
          <span className='absolute right-full mr-4 w-max bg-white text-[#162C63] text-xs font-semibold rounded-full px-4 py-[10px] opacity-0 group-hover:opacity-100 transition-opacity'>
            취향 설정하기
          </span>
        </button>

        <button className='bottom-menu-icon group absolute bottom-[138px]'>
          <img
            className='bottom-menu-img absolute opacity-0 group-hover:opacity-100 transition-opacity'
            src={themeIcon}
            alt='테마 설정'
          />
          <img
            className='bottom-menu-img absolute opacity-100 group-hover:opacity-0 transition-opacity'
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
