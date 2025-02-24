import { mockBooks } from '@/mocks/searchData';
import { useNavigate, useParams } from 'react-router-dom';
import { tokenService } from '@/utils/token';

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '⋯';
  }
  return text;
};

const BookCaseList = () => {
  const navigate = useNavigate();
  const { userId: pageUserId } = useParams<{ userId: string }>();
  const myUserId = tokenService.getUser()?.id;

  const handleBookClick = (bookId: string) => {
    // 현재 페이지의 userId와 로그인한 사용자의 userId가 같으면 내 서평으로 이동
    if (pageUserId === myUserId) {
      navigate(`/book/${bookId}`);
    } else {
      // 다른 사용자의 서평이면 user/:userId 포함하여 이동
      navigate(`/book/${bookId}/user/${pageUserId}`);
    }
  };

  return (
    <ul className='w-[5300px] h-[420px] bg-[#D1E5F1] shadow-[inset_0px_4px_20px_5px_rgba(30,146,215,0.20)] flex items-end gap-14 px-20'>
      {mockBooks.length === 0 ? (
        // 책장이 비어있을 때
        <div className='relative item-row'>
          <li className='text-2xl text-white cursor-pointer w-50 h-70 rounded-2xl book-gradient drop-shadow-book item-middle'>
            ｡°(っ°´o`°ｃ)°｡
            <div className='absolute bottom-0 w-full bg-white h-13 rounded-b-2xl'></div>
          </li>
          <span className='text-xl text-[#2656CD]/70 absolute -bottom-10'>
            책장이 텅 비어있습니다.
          </span>
        </div>
      ) : (
        // 책 목록 표시
        mockBooks.map((book) =>
          book.imageURL ? (
            // 이미지가 있는 경우
            <li
              key={book.id}
              onClick={() => handleBookClick(book.id)}
              className='relative text-white transition-transform duration-300 transform cursor-pointer w-50 h-70 rounded-2xl book-gradient drop-shadow-book hover:-rotate-6 hover:scale-105 hover:-translate-y-4'>
              <img
                src={book.imageURL}
                alt={book.title}
                className='object-cover w-full h-full rounded-2xl'
              />
              <div className='absolute bottom-0 w-full p-2 bg-white h-13 rounded-b-2xl'>
                <p className='text-sm text-[#2656CD] font-medium truncate'>
                  {book.title}
                </p>
                <p className='text-xs text-[#2656CD]/70'>{book.author}</p>
              </div>
            </li>
          ) : (
            // 이미지가 없는 경우 - 세로 텍스트 레이아웃
            <li
              key={book.id}
              onClick={() => handleBookClick(book.id)}
              className='relative text-white transition-transform duration-300 transform bg-white cursor-pointer w-18 h-70 rounded-2xl drop-shadow-book hover:-rotate-6 hover:scale-105 hover:-translate-y-4'>
              <div className='flex flex-col items-center justify-between w-full h-full pt-4 text-center pb-14'>
                <h3 className='text-lg vertical-text font-medium mb-2 text-[#2656CD]'>
                  {truncateText(book.title, 6)}
                </h3>
                <p className='text-sm text-[#2656CD]/70 normal-case'>
                  {truncateText(book.author, 8)}
                </p>
              </div>
              <div className='absolute bottom-0 w-full p-2 text-center book-gradient h-13 rounded-b-2xl'>
                <p className='text-xs text-[#2656CD]'>
                  {book.publishedDate.split('.')[0]}
                </p>
                <p className='text-xs text-[#2656CD]'>민음사</p>
              </div>
            </li>
          ),
        )
      )}
    </ul>
  );
};

export default BookCaseList;
