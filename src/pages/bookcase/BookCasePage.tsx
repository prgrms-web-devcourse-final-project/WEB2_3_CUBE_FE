import { useState, useEffect, useRef } from 'react';
import ToolBoxButton from './components/ToolBoxButton';
import { SearchModal } from '@components/search-modal/SearchModal';
import BookCaseList from './components/BookCaseList';
import { bookAPI } from '@apis/book';
import { tokenService } from '@utils/token';

const BookCasePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [books, setBooks] = useState<BookCaseListType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const BOOKS_PER_ROW = 15;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const response = await bookAPI.getBookCaseList(
          tokenService.getUser()?.userId || 1,
          1,
        );


        if (response?.myBooks) {
          const formattedBooks = response.myBooks.map((book: any) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            publishedDate: book.publishedDate,
            imageURL: book.imageUrl,
            genreNames: book.genreNames,
          }));

          setBooks(formattedBooks);
        }
      } catch (error) {
        console.error('책 목록을 가져오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    if (containerRef.current) {
      setStartX(clientX - containerRef.current.offsetLeft);
      setStartY(clientY - containerRef.current.offsetTop);
      setScrollLeft(containerRef.current.scrollLeft);
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    if (containerRef.current) {
      const x = clientX - containerRef.current.offsetLeft;
      const y = clientY - containerRef.current.offsetTop;
      const walkX = (x - startX) * 2;
      const walkY = (y - startY) * 2;

      containerRef.current.scrollLeft = scrollLeft - walkX;
      containerRef.current.scrollTop = scrollTop - walkY;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const bookCaseRows = Math.max(3, Math.ceil(books.length / BOOKS_PER_ROW));

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div
      ref={containerRef}
      className='w-full h-screen overflow-auto bg-white select-none cursor-grab active:cursor-grabbing'
      onMouseDown={(e) => handleDragStart(e.pageX, e.pageY)}
      onMouseMove={(e) => handleDragMove(e.pageX, e.pageY)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) =>
        handleDragStart(e.touches[0].clientX, e.touches[0].clientY)
      }
      onTouchMove={(e) =>
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY)
      }
      onTouchEnd={handleDragEnd}>
      {[...Array(bookCaseRows)].map((_, index) => {
        const startIdx = index * BOOKS_PER_ROW;
        const endIdx = startIdx + BOOKS_PER_ROW;
        const rowBooks = books.slice(startIdx, endIdx);

        return (
          <BookCaseList
            key={index}
            page={index + 1}
            books={rowBooks}
            showEmptyMessage={books.length === 0 && index === 1}
          />
        );
      })}
      <ToolBoxButton onAddBook={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <SearchModal
          title='책장에 담을 책 찾기'
          type='BOOK'
          onClose={() => setIsModalOpen(false)}
          onSelect={() => {}}
        />
      )}
    </div>
  );
};

export default BookCasePage;
