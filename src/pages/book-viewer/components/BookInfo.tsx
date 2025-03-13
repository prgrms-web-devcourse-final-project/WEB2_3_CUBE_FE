import { BOOK_THEME, BookThemeType } from '@/constants/bookTheme';

interface BookInfoProps {
  publishedDate: string;
  bookTitle: string;
  author: string;
  genreNames: string[];
  colors: (typeof BOOK_THEME)[BookThemeType];
}

export const BookInfo = ({
  publishedDate,
  bookTitle,
  author,
  genreNames,
  colors,
}: BookInfoProps) => (
  <div className='flex flex-col gap-2'>
    <div className='flex flex-col gap-4'>
      <span
        className='text-xl font-medium'
        style={{ color: `${colors.primary}` }}>
        {publishedDate?.split('-')[0]}
      </span>
      <div className='flex items-end w-full gap-4'>
        <h2
          className='text-4xl font-bold'
          style={{ color: colors.primary }}>
          {bookTitle}
        </h2>
        <span
          className='text-lg font-medium flex-shrink-0 max-w-[30%]'
          style={{ color: colors.primary }}>
          {author}
        </span>
      </div>
    </div>
    <div className='flex gap-2 mt-2'>
      {genreNames.map((genre) => (
        <span
          key={genre}
          className='px-4 py-1 text-sm rounded-full'
          style={{
            backgroundColor: `${colors.secondary}20`,
            color: colors.primary,
          }}>
          {genre}
        </span>
      ))}
    </div>
  </div>
);
