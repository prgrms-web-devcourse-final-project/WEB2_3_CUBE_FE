import { mockBooks } from '@/mocks/searchData';

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '⋯';
  }
  return text;
};

const BookCaseList = () => {
  return (
    <ul className='w-[5300px] h-[420px] bg-[#D1E5F1] shadow-[inset_0px_4px_20px_5px_rgba(30,146,215,0.20)] flex items-end gap-10'>
      {mockBooks.length === 0 ? (
        // 책장이 비어있을 때
        <div className='item-row relative'>
          <li className='w-50 h-70 rounded-2xl text-white book-gradient drop-shadow-book item-middle text-2xl cursor-pointer'>
            ｡°(っ°´o`°ｃ)°｡
            <div className='absolute bottom-0 bg-white w-full h-13 rounded-b-2xl'></div>
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
              className='w-50 h-70 rounded-2xl text-white book-gradient drop-shadow-book relative cursor-pointer
                         transform transition-transform duration-300 hover:-rotate-6 hover:scale-105 hover:-translate-y-4'>
              <img
                src={book.imageURL}
                alt={book.title}
                className='w-full h-full object-cover rounded-2xl'
              />
              <div className='absolute bottom-0 bg-white w-full h-13 rounded-b-2xl p-2'>
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
              className='w-18 h-70 rounded-2xl text-white bg-white drop-shadow-book relative cursor-pointer
                         transform transition-transform duration-300 hover:-rotate-6 hover:scale-105 hover:-translate-y-4'>
              <div className='h-full w-full text-center flex flex-col justify-between items-center pt-4 pb-14'>
                <h3 className='text-lg writing-vertical font-medium mb-2 text-[#2656CD]'>
                  {truncateText(book.title, 6)}
                </h3>
                <p className='text-sm text-[#2656CD]/70 normal-case'>
                  {truncateText(book.author, 8)}
                </p>
              </div>
              <div className='absolute bottom-0 book-gradient w-full h-13 rounded-b-2xl p-2 text-center'>
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
