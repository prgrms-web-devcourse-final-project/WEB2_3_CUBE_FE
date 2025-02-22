import BookReviewDisplay from './components/BookReviewDisplay';
import type { ReviewData } from '@/types/review';
import NotFoundPage from '@pages/NotFoundPage';
import tempIMG from '@assets/book/temp.jpg';

interface BookViewerPageProps {
  reviewData: ReviewData | null;
}

const BookViewerPage = ({ reviewData }: BookViewerPageProps) => {
  if (!reviewData) return <NotFoundPage />;

  return (
    <section className='flex w-full h-screen overflow-auto'>
      <figure className='w-1/2 h-full p-4'>
        <img
          className='object-cover w-full h-full rounded-2xl'
          src={reviewData.imageUrl || tempIMG}
          alt={reviewData.bookTitle}
        />
      </figure>
      <article className='w-1/2 h-full'>
        <BookReviewDisplay
          mode='view'
          previewData={reviewData}
        />
      </article>
    </section>
  );
};

export default BookViewerPage;
