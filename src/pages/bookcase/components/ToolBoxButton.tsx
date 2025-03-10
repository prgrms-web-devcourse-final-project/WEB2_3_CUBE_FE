import { useState, useRef, useEffect } from 'react';
import ToolBoxIcon from '@assets/book/bookcase-tool-icon.svg';
import AddBookIcon from './AddBookIcon';
import BookListIcon from './BookListIcon';

interface ToolBoxButtonProps {
  onAddBook: () => void;
  onOpenList: () => void;
  isDisabled?: boolean;
}

const ToolBoxButton = ({
  onAddBook,
  onOpenList,
  isDisabled,
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
      className={`bottom-menu bottom-20 right-21 drop-shadow-logo ${
        isOpen ? 'h-[202px]' : 'h-16'
      }`}>
      <div className='flex relative flex-col-reverse gap-5 items-center w-full h-full'>
        {/* 메인 토글 버튼 */}
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

        {/* 메뉴 아이템 컨테이너 */}
        <div
          className={`bottom-menu-content transition-all duration-100 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
          <button
            className='bottom-menu-icon group absolute bottom-[138px] bg-transparent hover:bg-white/50'
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

          <button
            className={`bottom-menu-icon group absolute bottom-[74px] ${
              hasSelectedSetting.current
                ? 'bg-white'
                : isDisabled
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-transparent hover:bg-white/50'
            }`}
            onClick={onAddBook}
            disabled={isDisabled}>
            <AddBookIcon
              fill={isDisabled ? 'lightgray' : 'white'}
              className={`${
                !isDisabled && 'group-hover:fill-[#73A1F7]'
              } transition-colors`}
            />
            {/* 툴팁 */}
            <span className='absolute right-full mr-4 w-max bg-white text-[#162C63] text-xs font-semibold rounded-full px-4 py-[10px] opacity-0 group-hover:opacity-100 transition-opacity'>
              {isDisabled ? '다른 사용자의 책장입니다' : '도서 추가하기'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolBoxButton;
