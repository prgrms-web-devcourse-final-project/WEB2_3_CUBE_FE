import { BookReviewData } from '@/types/book';
import { BOOK_THEME, BookThemeType } from '@/constants/bookTheme';

interface ReviewField {
  key: keyof BookReviewData;
  title: string;
}

interface BookHeaderProps {
  title: string;
  reviewFields: ReviewField[];
  headings: Array<{ id: string; level: number; text: string }>;
  colors: (typeof BOOK_THEME)[BookThemeType];
}

export const BookHeader = ({
  title,
  reviewFields,
  headings,
  colors,
}: BookHeaderProps) => (
  <div className='py-12 item-between px-14'>
    <h1
      className='mb-8 text-6xl font-semibold'
      style={{ color: colors.primary }}>
      {title}
    </h1>
    <ul className='flex flex-col items-end justify-start gap-2 shrink-0'>
      <li
        className='text-xl font-semibold'
        style={{ color: colors.primary }}>
        목차
      </li>
      {reviewFields.map(({ key, title }) => (
        <li
          key={key}
          className='text-sm'
          style={{ color: colors.primary }}>
          <a href={`#section-${key}`}>{title}</a>
        </li>
      ))}
      {headings.map(({ id, level, text }) => (
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
);
