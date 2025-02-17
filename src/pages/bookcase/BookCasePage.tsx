import { SearchModal } from '@components/search-modal/SearchModal';
import { useState } from 'react';
import addBookIcon from '@/assets/book/add-book-icon.svg';

const BookCasePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='h-screen bg-blue-100'>
      BookCasePage
      <button
        className='p-5 bg-white rounded-full cursor-pointer'
        onClick={() => setIsModalOpen(true)}>
        <img
          src={addBookIcon}
          alt='도서 추가하기'
        />
      </button>
      {isModalOpen && (
        <SearchModal
          title='책장에 담을 책 찾기'
          type='BOOK'
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default BookCasePage