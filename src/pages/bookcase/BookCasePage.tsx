import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ToolBoxButton from './components/ToolBoxButton';
import { SearchModal } from '@components/search-modal/SearchModal';
import BookCaseList from './components/BookCaseList';
import DataList from '@components/datalist/DataList';
import { bookAPI } from '@apis/book';
import ModalBackground from '@components/ModalBackground';
import { BookCaseListType } from '@/types/book';
import Loading from '@components/Loading';
<<<<<<< Updated upstream
import AnimationGuide from '@components/AnimationGuide';
import { useToastStore } from '@/store/useToastStore';
=======
import { useDebounce } from '@/hooks/useDebounce';

interface BookState {
  books: BookCaseListType[];
  dataListItems: DataListInfo[];
  totalCount: number;
  lastBookId?: number;
}
>>>>>>> Stashed changes

const BookCasePage = () => {
  const { showToast } = useToastStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [bookState, setBookState] = useState<BookState>({
    books: [],
    dataListItems: [],
    totalCount: 0,
    lastBookId: undefined,
  });
  const [isLoading, setIsLoading] = useState(true);
<<<<<<< Updated upstream
  const [isGuideOpen, setIsGuideOpen] = useState(true);

=======
  const [searchInput, setSearchInput] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchInput = useDebounce(searchInput);
  const BOOKS_PER_PAGE = 45;
>>>>>>> Stashed changes
  const BOOKS_PER_ROW = 15;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [shouldResetScroll, setShouldResetScroll] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchBooks = useCallback(
    async (keyword?: string, lastId?: number) => {
      try {
        setIsLoading(true);
        if (!userId) return;

<<<<<<< Updated upstream
        const response = await bookAPI.getBookCaseList(Number(userId), 45);

        // console.log('API Response:', response);
=======
        const response = await bookAPI.getBookCaseList(
          Number(userId),
          BOOKS_PER_PAGE,
          lastId,
          keyword,
        );
>>>>>>> Stashed changes

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

          const dataListFormat = response.myBooks.map((book: any) => ({
            id: book.id.toString(),
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            released_year: book.publishedDate,
            imageUrl: book.imageUrl,
          }));

<<<<<<< Updated upstream
          // console.log('Formatted DataList Items:', dataListFormat);
=======
          // 상태 업데이트를 일괄 처리
          setBookState((prev) => {
            const newState = {
              books: lastId
                ? [...prev.books, ...formattedBooks]
                : formattedBooks,
              dataListItems: lastId
                ? [...prev.dataListItems, ...dataListFormat]
                : dataListFormat,
              totalCount: response.count,
              lastBookId:
                response.myBooks.length > 0
                  ? response.myBooks[response.myBooks.length - 1].id
                  : undefined,
            };
            return newState;
          });
>>>>>>> Stashed changes

          // 최초 로딩 시에만 스크롤 리셋
          if (isInitialLoad) {
            setShouldResetScroll(true);
            setIsInitialLoad(false);
          }
        }
      } catch (error) {
        console.error('책 목록을 가져오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
        setIsSearching(false);
      }
    },
    [userId, isInitialLoad],
  );

  // 검색어가 변경될 때마다 새로운 검색 실행
  useEffect(() => {
    if (debouncedSearchInput !== undefined) {
      setIsSearching(true);
      fetchBooks(debouncedSearchInput);
    }
  }, [debouncedSearchInput, fetchBooks]);

  // 초기 데이터 로딩
  useEffect(() => {
    setIsInitialLoad(true);
    fetchBooks();
  }, [userId, fetchBooks]);

  // 초기 스크롤 위치 설정
  useEffect(() => {
    if (
      containerRef.current &&
      !isLoading &&
      shouldResetScroll &&
      isInitialLoad
    ) {
      const container = containerRef.current;
      const scrollX = (container.scrollWidth - container.clientWidth) / 2;
      const scrollY = (container.scrollHeight - container.clientHeight) / 2;

      container.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: 'smooth',
      });
      setShouldResetScroll(false);
    }
  }, [isLoading, shouldResetScroll, isInitialLoad]);

  const handleFetchMore = useCallback(() => {
    if (bookState.lastBookId) {
      fetchBooks(searchInput, bookState.lastBookId);
    }
  }, [bookState.lastBookId, searchInput, fetchBooks]);

  // 도서 분배 로직을 useMemo로 최적화
  const bookRows = useMemo(() => {
    const { books } = bookState;
    if (books.length <= 45) {
      const totalRows = 3;
      const baseCount = Math.floor(books.length / totalRows);
      const remainder = books.length - baseCount * totalRows;

      let currentIndex = 0;
      return Array(totalRows)
        .fill(null)
        .map((_, index) => {
          const currentRowCount =
            index === totalRows - 1 ? baseCount + remainder : baseCount;
          const row = books.slice(currentIndex, currentIndex + currentRowCount);
          currentIndex += currentRowCount;
          return row;
        });
    } else {
      return Array(Math.ceil(books.length / BOOKS_PER_ROW))
        .fill(null)
        .map((_, index) => {
          const start = index * BOOKS_PER_ROW;
          return books.slice(start, start + BOOKS_PER_ROW);
        });
    }
  }, [bookState.books]);

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

  const handleDeleteBooks = useCallback((deletedIds: string[]) => {
    setBookState((prev) => ({
      ...prev,
      books: prev.books.filter(
        (book) => !deletedIds.includes(book.id.toString()),
      ),
      dataListItems: prev.dataListItems.filter(
        (item) => !deletedIds.includes(item.id),
      ),
      totalCount: prev.totalCount - deletedIds.length,
    }));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={containerRef}
      className='overflow-auto w-full h-screen bg-white select-none cursor-grab active:cursor-grabbing scrollbar-none'
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
          key={`row-${index}`}
          books={rowBooks}
          showEmptyMessage={bookState.books.length === 0 && index === 1}
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
<<<<<<< Updated upstream
          onSuccess={async (item) => {
=======
          onSuccess={(item) => {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

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
=======
            setBookState((prev) => ({
              ...prev,
              books: [...prev.books, newBook],
              dataListItems: [
                ...prev.dataListItems,
                {
                  id: item.id,
                  title: item.title,
                  author: item.author,
                  publisher: item.publisher,
                  released_year: new Date(item.date)
                    .toISOString()
                    .split('T')[0],
                  imageUrl: item.imageUrl,
                },
              ],
              totalCount: prev.totalCount + 1,
            }));
>>>>>>> Stashed changes
          }}
        />
      )}

      {isGuideOpen && (
        <AnimationGuide
          titleText='책장 추가'
          subText='책장에 책을 추가할 수 있습니다.'
          onClose={() => setIsGuideOpen(false)}
        />
      )}

      {isListOpen && (
        <ModalBackground onClose={() => setIsListOpen(false)}>
          <DataList
            datas={bookState.dataListItems}
            type='book'
            onDelete={handleDeleteBooks}
            hasMore={bookState.books.length < bookState.totalCount}
            isLoading={isLoading || isSearching}
            fetchMore={handleFetchMore}
            userId={Number(userId)}
            count={bookState.totalCount}
            setSearchInput={setSearchInput}
          />
        </ModalBackground>
      )}
    </div>
  );
};

export default BookCasePage;
