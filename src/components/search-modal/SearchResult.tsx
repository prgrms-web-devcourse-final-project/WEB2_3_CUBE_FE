import { SearchItemType } from '@/types/search';
import { bookAPI } from '@/apis/book';
import addIcon from '@/assets/add-icon.svg';
import { SEARCH_THEME } from '@/constants/searchTheme';

interface SearchResultProps {
  item: SearchItemType | null;
  type: 'CD' | 'BOOK';
  items: SearchItemType[];
  isLoading: boolean;
  error: string | null;
  onSelect: (item: SearchItemType) => void;
}

export const SearchResult = ({
  item,
  type,
  isLoading,
  error,
  onSelect,
}: SearchResultProps) => {
  const theme = SEARCH_THEME[type];

  const handleAddBook = async (item: SearchItemType) => {
    if (type === 'BOOK') {
      try {
        const bookData: BookType = {
          isbn: item.id,
          title: item.title,
          author: item.author,
          publisher: item.publisher,
          publishedDate: item.date,
          imageUrl: item.imageUrl,
          category: item.genres,
        };
        await bookAPI.addBookToMyBook(bookData);
        onSelect(item);
      } catch (error) {
        console.error('책 추가 실패:', error);
      }
    } else {
      onSelect(item);
    }
  };

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full text-gray-400'>
        검색 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-full text-gray-400'>
        {error}
      </div>
    );
  }

  if (!item) {
    return (
      <div className='flex items-center justify-center h-full text-gray-400'>
        검색 결과를 선택해주세요
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      {/* 출판일 / 발매일 */}
      <div className='flex flex-col items-center justify-center gap-1'>
        <p className={theme.searchResultDate}>{item.date}</p>
        <h3
          className={`text-xl font-bold text-center ${theme.searchResultText}`}>
          {item.title}
        </h3>
      </div>
      {/* 표지 / 앨범 커버 */}
      <div className='relative w-auto mb-4 h-70'>
        <img
          src={item.imageUrl}
          className='object-contain w-full h-full rounded-lg shadow-lg'
        />
        {/* 내 책장에 담기 버튼 */}
        <button
          onClick={() => handleAddBook(item)}
          className={`absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 p-2 ${theme.searchResultAddBtn} rounded-full cursor-pointer`}>
          <img
            src={addIcon}
            alt='add'
          />
        </button>
      </div>
      <p className={`${theme.searchItemName} font-semibold`}>{item.author}</p>
      {/* 장르 */}
      <div className='flex flex-wrap gap-2'>
        {item.genres?.map((genre) => (
          <span
            key={genre}
            className={`px-4 py-1 text-sm ${theme.searchGenre} ${theme.searchResultText} rounded-full`}>
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};
