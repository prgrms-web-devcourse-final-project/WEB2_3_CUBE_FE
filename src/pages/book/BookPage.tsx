import { SearchModal } from '@components/search-modal/SearchModal';
import { useState } from 'react';
import addIcon from '@/assets/add-icon.svg';
import addBookIcon from '@/assets/book/add-book-icon.svg';

const BookPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='h-screen bg-blue-100'>
      BookPage
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
};

export default BookPage;
