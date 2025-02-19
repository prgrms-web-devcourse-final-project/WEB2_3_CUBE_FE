import BookReviewDisplay from './components/BookReviewDisplay';
import { useParams } from 'react-router-dom';

const BookViewerPage = () => {
  const { userId, bookId } = useParams();

  return (
    <section className='w-full h-screen overflow-auto item-between'>
      <figure className='w-1/2 h-full bg-red-100'>
        <img src='' />
      </figure>
      <article className='w-1/2 h-full bg-blue-100'>
        <BookReviewDisplay
          mode='view'
          userId={userId}
          bookId={bookId}
        />
      </article>
    </section>
  );
};

export default BookViewerPage;
