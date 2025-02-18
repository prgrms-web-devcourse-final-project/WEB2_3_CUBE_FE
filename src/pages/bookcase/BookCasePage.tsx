import { useState } from 'react';
import ToolBoxButton from './components/ToolBoxButton';
import { SearchModal } from '@components/search-modal/SearchModal';
import BookCaseList from './components/BookCaseList';

const BookCasePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='w-full h-screen bg-white'>
      {/* 책장 리스트 -> 아이템이 15개 이상일 때마다 추가하기 */}
      <BookCaseList />
      <BookCaseList />
      <BookCaseList />

      <ToolBoxButton onAddBook={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <SearchModal
          title='책장에 담을 책 찾기'
          type='BOOK'
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BookCasePage;
