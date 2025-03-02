import { useNavigate, useParams } from 'react-router-dom';
import { useUserStore } from '../../../store/useUserStore';
import { BookCaseListType } from '@/types/book';
import { truncateTitle } from '@/utils/truncate';

interface BookCaseListProps {
  page: number;
  books: BookCaseListType[];
  showEmptyMessage?: boolean;
}

// 책장 목록에서 사용되는 텍스트 길이 제한 상수
const BOOK_TITLE_MAX_LENGTH = 15;
const BOOK_AUTHOR_MAX_LENGTH = 20;
const BOOK_TITLE_COLUMN_MAX_LENGTH = 6;
const BOOK_AUTHOR_COLUMN_MAX_LENGTH = 8;

const BookCaseList = ({ page, books, showEmptyMessage }: BookCaseListProps) => {
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

  return (
    <ul className='w-[5300px] h-[420px] bg-[#D1E5F1] shadow-[inset_0px_4px_20px_5px_rgba(30,146,215,0.20)] flex items-end gap-14 px-20'>
      {showEmptyMessage ? (
        <div className='relative flex items-center justify-center w-full'>
          <div className='text-center'>
            <li className='text-2xl text-white cursor-pointer rounded-2xl w-50 h-70 book-gradient drop-shadow-book item-middle'>
              ｡°(っ°´o`°ｃ)°｡
              <div className='absolute bottom-0 w-full bg-white rounded-b-2xl h-13'></div>
            </li>
            <span className='text-xl text-[#2656CD]/70 block mt-4'>
              책장이 텅 비어있습니다.
            </span>
          </div>
        </div>
      ) : (
        books.map((book) =>
          book.imageURL ? (
            // 이미지가 있는 경우
            <li
              key={book.id}
              onClick={() => handleBookClick(book.id)}
              className='relative text-white transition-transform duration-300 transform cursor-pointer rounded-2xl w-50 h-70 book-gradient drop-shadow-book hover:-rotate-6 hover:scale-105 hover:-translate-y-4'>
              <img
                src={book.imageURL}
                alt={book.title}
                className='object-cover w-full h-full rounded-2xl'
              />
              <div className='absolute bottom-0 w-full p-2.5 pl-4 bg-white rounded-b-2xl h-15'>
                <p className=' text-[#2656CD] font-medium truncate'>
                  {truncateTitle(book.title, BOOK_TITLE_MAX_LENGTH)}
                </p>
                <p className='text-xs text-[#2656CD]/70 font-medium'>
                  {truncateTitle(book.author, BOOK_AUTHOR_MAX_LENGTH)}
                </p>
              </div>
            </li>
          ) : (
            // 이미지가 없는 경우 - 세로 텍스트 레이아웃
            <li
              key={book.id}
              onClick={() => handleBookClick(book.id)}
              className='relative text-white transition-transform duration-300 transform bg-white cursor-pointer rounded-2xl w-18 h-70 drop-shadow-book hover:-rotate-6 hover:scale-105 hover:-translate-y-4'>
              <div className='flex flex-col items-center justify-between w-full h-full pt-4 text-center pb-14'>
                <h3 className='text-lg vertical-text font-medium mb-2 text-[#2656CD]'>
                  {truncateTitle(book.title, BOOK_TITLE_COLUMN_MAX_LENGTH)}
                </h3>
                <p className='text-sm text-[#2656CD]/70 normal-case'>
                  {truncateTitle(book.author, BOOK_AUTHOR_COLUMN_MAX_LENGTH)}
                </p>
              </div>
              <div className='absolute bottom-0 w-full p-2.5 text-center rounded-b-2xl book-gradient h-15'>
                <p className='text-xs text-[#2656CD]'>
                  {book.publishedDate.split('.')[0]}
                </p>
                <p className='font-bold text-[#2656CD]'>{book.publisher}</p>
              </div>
            </li>
          ),
        )
      )}
    </ul>
  );
};

export default BookCaseList;
