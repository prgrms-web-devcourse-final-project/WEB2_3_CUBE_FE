import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ToolBoxButton from './components/ToolBoxButton';
import { SearchModal } from '@components/search-modal/SearchModal';
import BookCaseList from './components/BookCaseList';
import DataList from '@components/datalist/DataList';
import { bookAPI } from '@apis/book';
import ModalBackground from '@components/ModalBackground';
import { BookCaseListType } from '@/types/book';
import Loading from '@components/Loading';
import AnimationGuide from '@components/AnimationGuide';
import { useToastStore } from '@/store/useToastStore';

const BookCasePage = () => {
  const { showToast } = useToastStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [books, setBooks] = useState<BookCaseListType[]>([]);
  const [dataListItems, setDataListItems] = useState<DataListInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuideOpen, setIsGuideOpen] = useState(true);

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

        // console.log('API Response:', response);

        if (response?.myBooks) {
          const formattedBooks = response.myBooks.map((book: any) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            publishedDate: book.publishedDate,
            imageUrl: book.imageUrl,
            genreNames: book.genreNames,
            page: book.page || 0,
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

          // console.log('Formatted DataList Items:', dataListFormat);

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

  useEffect(() => {
    if (isGuideOpen) {
      const timer = setTimeout(() => {
        setIsGuideOpen(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isGuideOpen]);

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
    // books 업데이트
    setBooks((prevBooks) =>
      prevBooks.filter((book) => !deletedIds.includes(book.id.toString())),
    );

    // dataListItems 업데이트
    setDataListItems((prevItems) =>
      prevItems.filter((item) => !deletedIds.includes(item.id)),
    );

    // 전체 카운트 업데이트
    setTotalCount((prev) => prev - deletedIds.length);
  };

  const bookCaseRows =
    books.length <= 45 ? 3 : Math.ceil(books.length / BOOKS_PER_ROW);

  const handleBookAdd = (newBook: BookCaseListType) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setDataListItems((prevItems) => [
      ...prevItems,
      {
        id: newBook.id.toString(),
        title: newBook.title,
        author: newBook.author,
        publisher: newBook.publisher,
        released_year: newBook.publishedDate,
        imageUrl: newBook.imageUrl,
      },
    ]);
    setTotalCount((prev) => prev + 1);
  };

  if (isLoading) {
    return <Loading />;
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
      className='overflow-auto w-full h-screen bg-[#D1E5F1] shadow-[inset_0px_4px_20px_5px_rgba(30,146,215,0.20)] select-none cursor-grab active:cursor-grabbing scrollbar-none'
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
      <div className='w-full min-h-[1300px]'>
        {bookRows.map((rowBooks, index) => (
          <BookCaseList
            key={index}
            books={rowBooks}
            showEmptyMessage={books.length === 0 && index === 1}
          />
        ))}
      </div>

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
          userId={userId}
          onSuccess={async (item) => {
            const newBook = {
              id: parseInt(item.id),
              title: item.title,
              author: item.author || '',
              publisher: item.publisher || '',
              publishedDate: new Date(item.date).toISOString().split('T')[0],
              imageUrl: item.imageUrl,
              genreNames: item.genres || [],
              page: 0,
            };

            try {
              // UI 업데이트 (낙관적 업데이트)
              setBooks((prevBooks) => [...prevBooks, newBook]);
              setDataListItems((prevItems) => [
                ...prevItems,
                {
                  id: newBook.id.toString(),
                  title: newBook.title,
                  author: newBook.author,
                  publisher: newBook.publisher,
                  released_year: newBook.publishedDate,
                  imageUrl: newBook.imageUrl,
                },
              ]);
              setTotalCount((prev) => prev + 1);
              setIsModalOpen(false);
            } catch (error) {
              // 실패시 UI 롤백
              setBooks((prevBooks) =>
                prevBooks.filter((book) => book.id !== newBook.id),
              );
              setDataListItems((prevItems) =>
                prevItems.filter((item) => item.id !== newBook.id.toString()),
              );
              setTotalCount((prev) => prev - 1);
              showToast('책 추가에 실패했습니다.', 'error');
            }
          }}
        />
      )}

      {isGuideOpen && (
        <AnimationGuide
          titleText='드래그로 책장을 이동할 수 있습니다.'
          subText='마우스를 이용해 책장을 이동해보세요.'
          onClose={() => setIsGuideOpen(false)}
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
            count={totalCount}
          />
        </ModalBackground>
      )}
    </div>
  );
};

export default BookCasePage;
