import { bookAPI } from '@apis/book';
import React, { useState, useEffect } from 'react';
import { BOOK_THEME, BookThemeType } from '@/constants/bookTheme';

interface ReviewData {
  // 도서 정보
  bookTitle: string;
  author: string;
  genres: string[];
  publishedDate: string; // 출판일자
  // 리뷰 정보
  title: string;
  reviewDate: string; // 리뷰 작성일자
  theme: BookThemeType;
  quote?: string; // 인상 깊은 구절
  emotion?: string; // 그 때 나의 감정
  reason?: string; // 책을 선택하게 된 계기
  discussion?: string; // 다른 사람과 나누고 싶은 대화 주제
  freeform?: string; // 자유 형식
}

interface BookReviewDisplayProps {
  mode: 'preview' | 'view';
  // preview 모드일 때는 실시간 데이터를 직접 받음
  previewData?: ReviewData;
  // view 모드일 때는 userId와 bookId로 데이터를 조회
  userId?: string;
  bookId?: string;
}

interface ReviewField {
  key: keyof ReviewData;
  title: string;
}

// const review = await bookAPI.getBookDetail('1');
// const review = await bookAPI.getReview('1');

const REVIEW_FIELDS: ReviewField[] = [
  { key: 'quote', title: '인상 깊은 구절' },
  { key: 'emotion', title: '그 때 나의 감정' },
  { key: 'reason', title: '책을 선택하게 된 계기' },
  { key: 'discussion', title: '다른 사람과 나누고 싶은 대화 주제' },
];

const ReviewSection = ({
  title,
  content,
  colors,
}: {
  title: string;
  content: string;
  colors: (typeof BOOK_THEME)[BookThemeType];
}) => (
  <div className='mb-6'>
    <h2
      className='mb-2 text-lg font-semibold'
      style={{ color: colors.primary }}>
      {title}
    </h2>
    <p style={{ color: colors.secondary }}>{content}</p>
  </div>
);

const BookReviewDisplay = ({
  mode,
  previewData,
  userId,
  bookId,
}: BookReviewDisplayProps) => {
  // view 모드일 때 사용할 데이터 fetch 로직
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);

  useEffect(() => {
    if (mode === 'view' && userId && bookId) {
      // API 호출 로직 추가하기
    }
  }, [mode, userId, bookId]);

  // 실제 표시할 데이터 (preview 모드면 previewData, view 모드면 reviewData 사용)
  const displayData = mode === 'preview' ? previewData : reviewData;

  if (!displayData) return null;

  const colors = BOOK_THEME[(displayData.theme as BookThemeType) || 'BLUE'];

  return (
    <div className='relative h-full overflow-auto '>
      {/* 제목 + 목차 */}
      <div className='py-12 item-between px-14'>
        <h1 className='text-6xl font-semibold text-[#162C63] mb-8'>
          {displayData.title}
        </h1>
        <ul className='flex flex-col items-end justify-start gap-2 shrink-0'>
          <li className='text-xl font-semibold text-[#162C63]'>목차</li>
          {REVIEW_FIELDS.map(({ key, title }) => (
            <li
              key={key}
              className='text-sm text-[#162C63]'>
              {title}
            </li>
          ))}
        </ul>
      </div>

      {/* 도서 정보 + 서평 내용 영역 */}
      <article className='absolute flex flex-col w-full gap-4 bg-[#D1E5F1] rounded-tl-[80px] top-[70%] min-h-[30%] px-24 py-16'>
        {/* 도서 정보 */}
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-4'>
            <span className='text-[#162C63]/70 text-sm'>
              {displayData.publishedDate}
            </span>
            <div className='flex items-end w-full gap-4'>
              <h2 className='text-3xl font-semibold text-[#162C63]'>
                {displayData.bookTitle}
              </h2>
              <span className='text-[#162C63]'>{displayData.author}</span>
            </div>
          </div>
          <div className='flex gap-2 mt-2'>
            {displayData.genres.map((genre) => (
              <span
                key={genre}
                className='px-4 py-1 bg-[#3E507D]/20 rounded-full text-sm text-[#162C63]'>
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* 리뷰 작성일자 */}
        <div className='text-sm text-[#162C63]/70 mt-20'>
          {displayData.reviewDate}
        </div>

        {/* 서평 내용 */}
        {REVIEW_FIELDS.map(
          ({ key, title }) =>
            displayData[key] && (
              <ReviewSection
                key={key}
                title={title}
                content={
                  Array.isArray(displayData[key])
                    ? displayData[key].join(', ')
                    : displayData[key]!
                }
                colors={colors}
              />
            ),
        )}

        {displayData.freeform && (
          <div
            className='mt-8 prose-sm prose'
            dangerouslySetInnerHTML={{ __html: displayData.freeform }}
          />
        )}
      </article>
    </div>
  );
};

export default BookReviewDisplay;
