import { useEffect, useState, useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { tokenService } from '@/utils/token';

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '⋯';
  }
  return text;
};

interface BookCaseListProps {
  page: number;
  books: BookCaseListType[];
}

const BookCaseList = ({ page, books }: BookCaseListProps) => {
  const navigate = useNavigate();
  const { userId: pageUserId } = useParams<{ userId: string }>();
  const myUserId = tokenService.getUser()?.id;

  const handleBookClick = (bookId: number | string) => {
    if (pageUserId === myUserId) {
      navigate(`/book/${bookId}`);
    } else {
      navigate(`/book/${bookId}/user/${pageUserId}`);
    }
  };

  return (
    <ul className='w-[5300px] h-[420px] bg-[#D1E5F1] shadow-[inset_0px_4px_20px_5px_rgba(30,146,215,0.20)] flex items-end gap-14 px-20'>
      {books.length === 0 && page === 2 ? (
        // 두 번째 책장이고 비어있을 때만 메시지 표시
        <div className='flex relative justify-center items-center w-full'>
          <div className='text-center'>
            <li className='text-2xl text-white rounded-2xl cursor-pointer w-50 h-70 book-gradient drop-shadow-book item-middle'>
              ｡°(っ°´o`°ｃ)°｡
              <div className='absolute bottom-0 w-full bg-white rounded-b-2xl h-13'></div>
            </li>
            <span className='text-xl text-[#2656CD]/70 block mt-4'>
              책장이 텅 비어있습니다.
            </span>
          </div>
        </div>
      ) : (
        // 책 목록 표시
        books.map((book) =>
          book.imageURL ? (
            // 이미지가 있는 경우
            <li
              key={book.id}
              onClick={() => handleBookClick(book.id)}
              className='relative text-white rounded-2xl transition-transform duration-300 transform cursor-pointer w-50 h-70 book-gradient drop-shadow-book hover:-rotate-6 hover:scale-105 hover:-translate-y-4'>
              <img
                src={book.imageURL}
                alt={book.title}
                className='object-cover w-full h-full rounded-2xl'
              />
              <div className='absolute bottom-0 p-2 w-full bg-white rounded-b-2xl h-13'>
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
              className='relative text-white bg-white rounded-2xl transition-transform duration-300 transform cursor-pointer w-18 h-70 drop-shadow-book hover:-rotate-6 hover:scale-105 hover:-translate-y-4'>
              <div className='flex flex-col justify-between items-center pt-4 pb-14 w-full h-full text-center'>
                <h3 className='text-lg vertical-text font-medium mb-2 text-[#2656CD]'>
                  {truncateText(book.title, 6)}
                </h3>
                <p className='text-sm text-[#2656CD]/70 normal-case'>
                  {truncateText(book.author, 8)}
                </p>
              </div>
              <div className='absolute bottom-0 p-2 w-full text-center rounded-b-2xl book-gradient h-13'>
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
