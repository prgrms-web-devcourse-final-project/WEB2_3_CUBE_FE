import BookReviewDisplay from './components/BookReviewDisplay';
import NotFoundPage from '@pages/NotFoundPage';
import tempIMG from '@assets/book/temp.jpg';
import { BookReviewData } from '@/types/book';
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';
import logo from '@/assets/header/header-logo.svg';

interface BookViewerPageProps {
  reviewData: BookReviewData | null;
  bookId?: string;
}

const BookViewerPage = ({ reviewData, bookId }: BookViewerPageProps) => {
  if (!reviewData) return <NotFoundPage />;

  return (
    <section className='flex w-full h-screen overflow-auto'>
      <Link
        to='/'
        className='fixed top-12 left-21 z-50'>
        <img
          src={logo}
          alt='logo'
        />
      </Link>
      <figure className='w-1/2 h-full p-4'>
        <ul className='w-full h-full rounded-2xl overflow-hidden relative'>
          <BookCoverList className='h-[30%]' />
          <BookCoverList className='h-[40%]'>
            <div className='flex items-center justify-center relative w-[11.5vw] h-[16vw] min-w-[200px] min-h-[267px]'>
              <img
                src={reviewData.imageUrl || tempIMG}
                alt={reviewData.title}
                className='object-cover rounded-2xl select-none pointer-events-none w-full h-full book-gradient'
                style={{
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                }}
              />
            </div>
          </BookCoverList>
          <BookCoverList className='h-[30%]' />
        </ul>
      </figure>
      <article className='w-1/2 h-full scroll-smooth'>
        <BookReviewDisplay
          mode='view'
          previewData={reviewData}
          bookId={bookId}
        />
      </article>
    </section>
  );
};

export default BookViewerPage;

const BookCoverList = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <li
      className={twMerge(
        'w-full h-[33.3%] bg-[#D1E5F1] shadow-[inset_0px_4px_20px_5px_rgba(30,146,215,0.20)] flex justify-center items-end',
        className,
      )}>
      {children}
    </li>
  );
};
