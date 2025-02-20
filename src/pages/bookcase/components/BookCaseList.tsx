import { mockBooks } from '@/mocks/searchData';
import { useNavigate } from 'react-router-dom';

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '⋯';
  }
  return text;
};

const BookCaseList = () => {
  const navigate = useNavigate();

  const handleBookClick = (bookId: string) => {
    // ** 추후 수정할 부분 : store에서 userId 가져오기 or URL에서 userId 가져오기
    navigate(`/book/${bookId}/userId`);
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
