import { useState, useRef, useEffect } from 'react';
import DataList from '@/components/datalist/DataList';
import ModalBackground from '@/components/ModalBackground';
import { mockBooks } from '@/mocks/searchData';
import ToolBoxIcon from '@assets/book/bookcase-tool-icon.svg';
import AddBookIcon from './AddBookIcon';
import BookListIcon from './BookListIcon';

interface ToolBoxButtonProps {
  onAddBook: () => void;
}

const ToolBoxButton = ({ onAddBook }: ToolBoxButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [hasSelectedSetting, setHasSelectedSetting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const formattedBooks = mockBooks.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    released_year: book.publishedDate.split('.')[0],
    publisher: book.publisher,
    imageURL: book.imageURL,
    singer: undefined,
  }));

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
    if (!hasSelectedSetting) {
      return 'bg-white';
    }
    if (!isOpen && hasSelectedSetting) {
      return 'bg-white';
    }
    return 'bg-transparent hover:bg-white/50';
  };

  return (
    <>
      <div
        ref={menuRef}
        className={`bottom-menu bottom-20 right-21 drop-shadow-logo ${
          isOpen ? 'h-[202px]' : 'h-16'
        }`}>
        <div className='relative flex flex-col-reverse items-center w-full h-full gap-5'>
          {/* 메인 토글 버튼 */}
          <button
            className={`bottom-menu-icon group ${getMainButtonBackground()} w-16 h-16 p-4 flex items-center justify-center`}
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
              className={`bottom-menu-icon group absolute bottom-[138px] ${
                isListOpen ? 'bg-white' : 'bg-transparent hover:bg-white/50'
              }`}
              onClick={() => setIsListOpen(true)}>
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
              className={`bottom-menu-icon group absolute bottom-[68px] ${
                hasSelectedSetting
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
          </div>
        </div>
      </div>

      {isListOpen && (
        <ModalBackground onClose={() => setIsListOpen(false)}>
          <DataList
            datas={formattedBooks}
            type='book'
          />
        </ModalBackground>
      )}
    </>
  );
};

export default ToolBoxButton;
