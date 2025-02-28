import BookReviewDisplay from './components/BookReviewDisplay';
import NotFoundPage from '@pages/NotFoundPage';
import tempIMG from '@assets/book/temp.jpg';
import { BookReviewData } from '@/types/book';

interface BookViewerPageProps {
  reviewData: BookReviewData | null;
  bookId?: string;
}

const BookViewerPage = ({ reviewData, bookId }: BookViewerPageProps) => {
  if (!reviewData) return <NotFoundPage />;

  return (
    <section className='flex w-full h-screen overflow-auto'>
      <figure className='w-1/2 h-full p-4'>
        <img
          className='object-cover object-top w-full h-full rounded-2xl'
          src={reviewData.imageUrl || tempIMG}
          alt={reviewData.bookTitle}
        />
      </figure>
      <article className='w-1/2 h-full'>
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
