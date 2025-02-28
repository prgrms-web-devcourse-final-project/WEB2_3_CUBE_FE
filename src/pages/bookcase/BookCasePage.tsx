import { useState, useEffect, useRef } from 'react';
import ToolBoxButton from './components/ToolBoxButton';
import { SearchModal } from '@components/search-modal/SearchModal';
import BookCaseList from './components/BookCaseList';
import DataList from '@components/datalist/DataList';
import { bookAPI } from '@apis/book';
import ModalBackground from '@components/ModalBackground';
import { useUserStore } from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { BookCaseListType } from '@/types/book';

const BookCasePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [books, setBooks] = useState<BookCaseListType[]>([]);
  const [dataListItems, setDataListItems] = useState<DataListInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const BOOKS_PER_ROW = 15;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);

        const response = await bookAPI.getBookCaseList(user.userId, 1);

        console.log('API Response:', response);

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

          // DataList 컴포넌트용 데이터 변환
          const dataListFormat = response.myBooks.map((book: any) => ({
            id: book.id.toString(),
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            released_year: book.publishedDate,
            imageUrl: book.imageUrl,
          }));

          console.log('Formatted DataList Items:', dataListFormat);

          setBooks(formattedBooks);
          setDataListItems(dataListFormat);
          setTotalCount(response.count);
        }
      } catch (error) {
        console.error('책 목록을 가져오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [user, navigate]);

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

  const handleDeleteBooks = (deletedIds: string[]) => {
    // books state 업데이트
    setBooks((prevBooks) =>
      prevBooks.filter((book) => !deletedIds.includes(book.id.toString())),
    );
    // dataListItems state 업데이트
    setDataListItems((prevItems) =>
      prevItems.filter((item) => !deletedIds.includes(item.id)),
    );
    // totalCount 감소
    setTotalCount((prev) => prev - deletedIds.length);
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
      <ToolBoxButton
        onAddBook={() => setIsModalOpen(true)}
        onOpenList={() => setIsListOpen(true)}
      />

      {isModalOpen && (
        <SearchModal
          title='책장에 담을 책 찾기'
          type='BOOK'
          onClose={() => setIsModalOpen(false)}
          onSelect={() => {}}
        />
      )}

      {isListOpen && (
        <ModalBackground onClose={() => setIsListOpen(false)}>
          <DataList
            datas={dataListItems}
            type='book'
            onDelete={handleDeleteBooks}
            hasMore={false}
            isLoading={isLoading}
            fetchMore={() => {}}
          />
        </ModalBackground>
      )}
    </div>
  );
};

export default BookCasePage;
