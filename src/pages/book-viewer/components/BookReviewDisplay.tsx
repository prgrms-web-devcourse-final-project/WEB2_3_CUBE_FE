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
  id,
  title,
  content,
  colors,
}: {
  id: string;
  title: string;
  content: string;
  colors: (typeof BOOK_THEME)[BookThemeType];
}) => (
  <div
    id={id}
    className='mb-6'>
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

  // 실제 표시할 데이터 (preview 모드면 previewData 사용)
  const displayData = previewData; // mode와 상관없이 previewData 사용

  if (!displayData) return null;

  const colors = BOOK_THEME[(displayData.theme as BookThemeType) || 'BLUE'];

  // 자유 형식 내용에서 헤딩 추출
  const extractHeadings = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3, h4, h5');

    return Array.from(headings).map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id; // 헤딩에 id 부여
      return {
        id,
        level: parseInt(heading.tagName.substring(1)),
        text: heading.textContent || '',
      };
    });
  };

  const headings = displayData.freeform
    ? extractHeadings(displayData.freeform)
    : [];

  return (
    <div className='relative h-full overflow-auto'>
      {/* 제목 + 목차 */}
      <div className='py-12 item-between px-14'>
        <h1
          className='text-6xl font-semibold mb-8'
          style={{ color: colors.primary }}>
          {displayData.title}
        </h1>
        <ul className='flex flex-col items-end justify-start gap-2 shrink-0'>
          <li
            className='text-xl font-semibold'
            style={{ color: colors.primary }}>
            목차
          </li>
          {REVIEW_FIELDS.map(
            ({ key, title }) =>
              displayData[key] && ( // 값이 있는 경우에만 목차에 표시
                <li
                  key={key}
                  className='text-sm'
                  style={{ color: colors.primary }}>
                  <a href={`#section-${key}`}>{title}</a>
                </li>
              ),
          )}
          {/* 자유 형식의 헤딩들도 존재할 때만 목차에 추가 */}
          {headings.length > 0 &&
            headings.map(({ id, level, text }) => (
              <li
                key={id}
                className='text-sm'
                style={{
                  color: colors.primary,
                  paddingLeft: `${(level - 2) * 1}rem`,
                }}>
                <a href={`#${id}`}>{text}</a>
              </li>
            ))}
        </ul>
      </div>

      {/* 도서 정보 + 서평 내용 영역 */}
      <article
        className='absolute flex flex-col w-full gap-4 rounded-tl-[80px] top-[70%] min-h-[30%] px-24 py-16'
        style={{ backgroundColor: `${colors.surface}` }}>
        {/* 도서 정보 */}
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-4'>
            <span
              className='text-sm'
              style={{ color: `${colors.primary}70` }}>
              {displayData.publishedDate}
            </span>
            <div className='flex items-end w-full gap-4'>
              <h2
                className='text-3xl font-semibold'
                style={{ color: colors.primary }}>
                {displayData.bookTitle}
              </h2>
              <span style={{ color: colors.primary }}>
                {displayData.author}
              </span>
            </div>
          </div>
          <div className='flex gap-2 mt-2'>
            {displayData.genres.map((genre) => (
              <span
                key={genre}
                className='px-4 py-1 rounded-full text-sm'
                style={{
                  backgroundColor: `${colors.secondary}20`,
                  color: colors.primary,
                }}>
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* 리뷰 작성일자 */}
        <div
          className='text-sm mt-20'
          style={{ color: `${colors.primary}70` }}>
          {displayData.reviewDate}
        </div>

        {/* 서평 내용 */}
        {REVIEW_FIELDS.map(
          ({ key, title }) =>
            displayData[key] && (
              <ReviewSection
                key={key}
                id={`section-${key}`}
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
            style={{ color: colors.secondary }}
            dangerouslySetInnerHTML={{
              __html: displayData.freeform.replace(
                /<(h[2-5])>/g,
                (_, tag) => `<${tag} id="heading-$1">`,
              ),
            }}
          />
        )}
      </article>
    </div>
  );
};

export default BookReviewDisplay;
