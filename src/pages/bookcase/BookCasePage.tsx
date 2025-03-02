import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ToolBoxButton from './components/ToolBoxButton';
import { SearchModal } from '@components/search-modal/SearchModal';
import BookCaseList from './components/BookCaseList';
import DataList from '@components/datalist/DataList';
import { bookAPI } from '@apis/book';
import ModalBackground from '@components/ModalBackground';
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
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        if (!userId) return;

        const response = await bookAPI.getBookCaseList(Number(userId), 45);

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
  }, [userId, navigate]);

  // 초기 스크롤 위치 설정
  useEffect(() => {
    if (containerRef.current && !isLoading) {
      const container = containerRef.current;
      // 가로 중앙
      const scrollX = (container.scrollWidth - container.clientWidth) / 2;
      // 세로 중앙
      const scrollY = (container.scrollHeight - container.clientHeight) / 2;

      container.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: 'smooth',
      });
    }
  }, [isLoading]);

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
    setBooks((prevBooks) =>
      prevBooks.filter((book) => !deletedIds.includes(book.id.toString())),
    );
    setDataListItems((prevItems) =>
      prevItems.filter((item) => !deletedIds.includes(item.id)),
    );
    setTotalCount((prev) => prev - deletedIds.length);
  };

  const bookCaseRows =
    books.length <= 45 ? 3 : Math.ceil(books.length / BOOKS_PER_ROW);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  // 책을 각 줄에 분배하는 함수
  const distributeBooks = () => {
    if (books.length <= 45) {
      // 45권 이하일 때는 3줄에 균등 분배
      const totalRows = 3;
      const baseCount = Math.floor(books.length / totalRows);
      const remainder = books.length - baseCount * totalRows;

      let currentIndex = 0;
      return Array(totalRows)
        .fill(null)
        .map((_, index) => {
          // 마지막 줄에 나머지 책들을 모두 추가
          const currentRowCount =
            index === totalRows - 1 ? baseCount + remainder : baseCount;

          const row = books.slice(currentIndex, currentIndex + currentRowCount);
          currentIndex += currentRowCount;
          return row;
        });
    } else {
      // 45권 초과시 15권씩 분배
      return Array(bookCaseRows)
        .fill(null)
        .map((_, index) => {
          const start = index * BOOKS_PER_ROW;
          return books.slice(start, start + BOOKS_PER_ROW);
        });
    }
  };

  const bookRows = distributeBooks();

  return (
    <div
      ref={containerRef}
      className='w-full h-screen overflow-auto bg-white select-none cursor-grab active:cursor-grabbing scrollbar-none'
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
      {bookRows.map((rowBooks, index) => (
        <BookCaseList
          key={index}
          books={rowBooks}
          showEmptyMessage={books.length === 0 && index === 1}
        />
      ))}
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
            userId={Number(userId)}
          />
        </ModalBackground>
      )}
    </div>
  );
};

export default BookCasePage;
