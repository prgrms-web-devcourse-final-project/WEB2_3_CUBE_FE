import { useState, useRef, useEffect } from 'react';
import ToolBoxIcon from '@assets/book/bookcase-tool-icon.svg';
import AddBookIcon from './AddBookIcon';
import BookListIcon from './BookListIcon';

interface ToolBoxButtonProps {
  onAddBook: () => void;
  onOpenList: () => void;
  isOtherUserBookcase?: boolean;
}

const ToolBoxButton = ({
  onAddBook,
  onOpenList,
  isOtherUserBookcase = false,
}: ToolBoxButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSelectedSetting = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getMainButtonBackground = () => {
    if (!hasSelectedSetting.current) {
      return 'bg-white';
    }
    if (!isOpen && hasSelectedSetting.current) {
      return 'bg-white';
    }
    return 'bg-transparent hover:bg-white/50';
  };

  return (
    <div
      ref={menuRef}
      className={`bottom-menu ${
        isOtherUserBookcase ? 'bottom-20' : 'bottom-20'
      } right-21 drop-shadow-logo ${
        isOpen && !isOtherUserBookcase ? 'h-[202px]' : 'h-16'
      }`}>
      <div className='flex relative flex-col-reverse gap-5 items-center w-full h-full'>
        {/* 메인 토글 버튼 - 다른 사람의 책장이 아닐 때만 표시 */}
        {!isOtherUserBookcase && (
          <button
            className={`flex justify-center items-center p-4 w-16 h-16 bottom-menu-icon group ${getMainButtonBackground()}`}
            aria-label='도구 메뉴 열기'
            onClick={() => setIsOpen(!isOpen)}>
            <img
              className='w-7 h-7'
              src={ToolBoxIcon}
              alt='도구 모음 버튼'
            />
            {/* 툴팁 */}
            <span className='absolute right-full mr-4 w-max bg-white text-[#162C63] text-xs font-semibold rounded-full px-4 py-[10px] opacity-0 group-hover:opacity-100 transition-opacity'>
              도구 모음 보기
            </span>
          </button>
        )}

        {/* 메뉴 아이템 컨테이너 */}
        <div
          className={`bottom-menu-content transition-all duration-100 ${
            isOpen || isOtherUserBookcase
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}>
          {/* 목록 보러가기 버튼 */}
          <button
            className={`bottom-menu-icon group ${
              isOtherUserBookcase
                ? 'absolute bottom-0'
                : 'absolute bottom-[138px]'
            } bg-transparent hover:bg-white/50`}
            onClick={onOpenList}>
            <BookListIcon
              fill='white'
              className='group-hover:fill-[#73A1F7] transition-colors'
            />
            {/* 툴팁 */}
            <span className='absolute right-full mr-4 w-max bg-white text-[#162C63] text-xs font-semibold rounded-full px-4 py-[10px] opacity-0 group-hover:opacity-100 transition-opacity'>
              목록 보러가기
            </span>
          </button>

          {/* 도서 추가 버튼 - 다른 사람의 책장이 아닐 때만 표시 */}
          {!isOtherUserBookcase && (
            <button
              className={`bottom-menu-icon group absolute bottom-[74px] ${
                hasSelectedSetting.current
                  ? 'bg-white'
                  : 'bg-transparent hover:bg-white/50'
              }`}
              onClick={onAddBook}>
              <AddBookIcon
                fill='white'
                className='group-hover:fill-[#73A1F7] transition-colors'
              />
              {/* 툴팁 */}
              <span className='absolute right-full mr-4 w-max bg-white text-[#162C63] text-xs font-semibold rounded-full px-4 py-[10px] opacity-0 group-hover:opacity-100 transition-opacity'>
                도서 추가하기
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolBoxButton;
