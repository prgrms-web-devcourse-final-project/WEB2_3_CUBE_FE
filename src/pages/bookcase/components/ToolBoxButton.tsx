import addBookIcon from '@/assets/book/add-book-icon.svg';
import toolIcon from '@/assets/book/bookcase-tool-icon.svg';
import bookListIcon from '@/assets/book/booklist-icon.svg';
import { useState } from 'react';
import { SearchModal } from '@components/search-modal/SearchModal';

interface ToolBoxButtonProps {
  onAddBook: () => void;
}

const ToolBoxButton = ({ onAddBook }: ToolBoxButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='fixed bottom-10 right-10 bg-white/30 backdrop-blur-s rounded-full'>
      {/* 메뉴 아이템 컨테이너 */}
      <div className='relative'>
        <div
          className={`transition-[height] duration-300 ease-in-out ${
            isOpen ? 'overflow-visible' : 'overflow-hidden'
          }`}
          style={{ height: isOpen ? '11.5rem' : '0' }}>
          <ul className='flex flex-col gap-2 mb-2 z-[1]'>
            <li className='relative group'>
              <button className='p-7 bg-white rounded-full shadow-md hover:bg-white/80'>
                <img
                  src={bookListIcon}
                  alt='목록 보러가기'
                />
              </button>
              {/* 툴팁 */}
              <div
                className='absolute right-full top-1/2 -translate-y-1/2 mr-2 px-6 py-3
                        bg-white shadow-md rounded-full text-[#2656CD] font-semibold
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
                목록 보러가기
              </div>
            </li>
            <li className='relative group'>
              <button
                className='p-7 bg-white rounded-full shadow-md hover:bg-white/80'
                onClick={onAddBook}>
                <img
                  src={addBookIcon}
                  alt='도서 추가하기'
                />
              </button>
              {/* 툴팁 */}
              <div
                className='absolute right-full top-1/2 -translate-y-1/2 mr-2 px-6 py-3
              bg-white shadow-md rounded-full text-[#2656CD] font-semibold
              opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
                도서 추가하기
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* 메인 토글 버튼 */}
      <div className='relative group'>
        <button
          className='p-7 bg-white rounded-full shadow-lg hover:bg-white/80 relative z-[2]'
          aria-label='도구 메뉴 열기'
          onClick={() => setIsOpen(!isOpen)}>
          <img
            src={toolIcon}
            alt='도구 모음 버튼'
          />
        </button>
        {/* 툴팁 */}
        <div
          className='absolute right-full top-1/2 -translate-y-1/2 mr-2 px-6 py-3
                bg-white shadow-md rounded-full text-[#2656CD] font-semibold
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
          도구 모음 보기
        </div>
      </div>
    </nav>
  );
};

export default ToolBoxButton;
