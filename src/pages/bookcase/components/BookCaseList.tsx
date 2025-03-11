import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '../../../store/useUserStore';
import { BookCaseListType } from '@/types/book';
import { truncateTitle } from '@/utils/truncate';

interface BookCaseListProps {
  books: BookCaseListType[];
  showEmptyMessage?: boolean;
}

// 책장 목록에서 사용되는 텍스트 길이 제한 상수
const BOOK_TITLE_MAX_LENGTH = 15;
const BOOK_AUTHOR_MAX_LENGTH = 20;
const BOOK_TITLE_COLUMN_MAX_LENGTH = 6;
const BOOK_AUTHOR_COLUMN_MAX_LENGTH = 5;

const BookCaseList = ({ books, showEmptyMessage }: BookCaseListProps) => {
  const navigate = useNavigate();
  const { userId: pageUserId } = useParams<{ userId: string }>();
  const { user } = useUserStore();

  const handleBookClick = (bookId: number | string) => {
    if (pageUserId === String(user?.userId)) {
      navigate(`/book/${bookId}`);
    } else {
      navigate(`/book/${bookId}/user/${pageUserId}`);
    }
  };

  if (showEmptyMessage) {
    return (
      <ul className='w-[5300px] h-[400px] bg-[#D1E5F1] shadow-[inset_0px_4px_20px_5px_rgba(30,146,215,0.20)] flex items-end gap-14 px-20 justify-center'>
        <div className='flex relative justify-center items-center w-full'>
          <div className='text-center'>
            <li className='text-2xl text-white rounded-2xl w-50 h-70 book-gradient drop-shadow-book item-middle select-none cursor-default'>
              ｡°(っ°´o`°ｃ)°｡
              <div className='absolute bottom-0 w-full bg-white rounded-b-2xl h-13'></div>
            </li>
            <span className='text-xl text-[#2656CD]/70 block mt-4'>
              책장이 텅 비어있습니다.
            </span>
          </div>
        </div>
      </ul>
    );
  }

  return (
    <ul className='w-[5300px] h-[400px] bg-[#D1E5F1] shadow-[inset_0px_4px_20px_5px_rgba(30,146,215,0.20)] flex items-end gap-14 px-20 justify-center'>
      {books.map((book) =>
        // 이미지 있을 때 (가로 책)
        book.imageUrl ? (
          <li
            key={book.id}
            onClick={() => handleBookClick(book.id)}
            className='relative text-white rounded-2xl transition-transform duration-300 transform cursor-pointer w-50 h-70 book-gradient drop-shadow-book hover:-rotate-6 hover:scale-105 hover:-translate-y-4'>
            <img
              src={book.imageUrl}
              alt={book.title}
              className='object-cover w-full h-full rounded-2xl select-none pointer-events-none'
            />
            <div className='absolute bottom-0 w-full p-2.5 pl-4 bg-white rounded-b-2xl h-15 select-none'>
              <p className='text-[#2656CD] font-medium truncate pointer-events-none'>
                {truncateTitle(book.title, BOOK_TITLE_MAX_LENGTH)}
              </p>
              <p className='text-xs text-[#2656CD]/70 font-medium pointer-events-none'>
                {truncateTitle(book.author, BOOK_AUTHOR_MAX_LENGTH)}
              </p>
            </div>
          </li>
        ) : (
          // 이미지 없을 때 (세로 책)
          <li
            key={book.id}
            onClick={() => handleBookClick(book.id)}
            className='relative text-white bg-white rounded-2xl transition-transform duration-300 transform cursor-pointer w-18 h-70 drop-shadow-book hover:-rotate-6 hover:scale-105 hover:-translate-y-4'>
            <div className='flex flex-col justify-between items-center pt-4 pb-14 w-full h-full text-center select-none'>
              <h3 className='text-lg font-medium mb-2 text-[#2656CD] writing-vertical pointer-events-none'>
                {truncateTitle(book.title, BOOK_TITLE_COLUMN_MAX_LENGTH)}
              </h3>
              <p className='text-sm text-[#2656CD]/70 writing-vertical pointer-events-none'>
                {truncateTitle(book.author, BOOK_AUTHOR_COLUMN_MAX_LENGTH)}
              </p>
            </div>
            <div className='absolute bottom-0 w-full p-2.5 text-center rounded-b-2xl book-gradient h-15 select-none'>
              <p className='text-xs text-[#2656CD] pointer-events-none'>
                {book.publishedDate.split('.')[0]}
              </p>
              <p className='font-bold text-[#2656CD] pointer-events-none'>
                {book.publisher}
              </p>
            </div>
          </li>
        ),
      )}
    </ul>
  );
};

export default BookCaseList;
