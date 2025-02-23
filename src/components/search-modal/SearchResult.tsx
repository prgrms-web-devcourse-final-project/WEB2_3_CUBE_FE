import { SearchItemType } from '@/types/search';
import { bookAPI } from '@/apis/book';
import addIcon from '@/assets/add-icon.svg';
import { SEARCH_THEME } from '@/constants/searchTheme';
import { toKoreanDate } from '@utils/dateFormat';

interface SearchResultProps {
  item: SearchItemType | null;
  type: 'CD' | 'BOOK';
  items: SearchItemType[];
  isLoading: boolean;
  error: string | null;
  onSelect: (item: SearchItemType) => void;
  onClose: () => void;
}

export const SearchResult = ({
  item,
  type,
  isLoading,
  error,
  onSelect,
  onClose,
}: SearchResultProps) => {
  const theme = SEARCH_THEME[type];

  const handleAddBook = async (item: SearchItemType) => {
    try {
      if (type === 'BOOK') {
        const bookData: BookType = {
          isbn: item.id,
          title: item.title,
          author: item.author,
          publisher: item.publisher,
          publishedDate: item.date,
          imageUrl: item.imageUrl,
          genreNames: item.genres,
          page: '0', // 기본값 설정
        };
        await bookAPI.addBookToMyBook(bookData);
      } else if (type === 'CD') {
        // CD 추가 요청 로직
        // const cdData = {
        //   id: item.id,
        //   title: item.title,
        //   artist: item.artist,
        //   albumTitle: item.album_title,
        //   releaseDate: item.date,
        //   imageUrl: item.imageUrl,
        // };
      }
      onSelect(item);
      onClose();
    } catch (error) {
      console.error(`${type} 추가 실패:`, error);
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full text-gray-400'>
        검색 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-full text-gray-400'>
        {error}
      </div>
    );
  }

  if (!item) {
    return (
      <div className='flex justify-center items-center h-full text-gray-400'>
        검색 결과를 선택해주세요
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      {/* 출판일 / 발매일 */}
      <div className='flex flex-col gap-1 justify-center items-center'>
        <p className={`${theme.searchResultDate} font-mono tabular-nums`}>
          {toKoreanDate(item.date)}
        </p>
        <h3
          className={`text-xl font-bold text-center ${theme.searchResultText}`}>
          {item.title}
        </h3>
      </div>
      {/* 표지 / 앨범 커버 */}
      <div className='relative mb-4 w-auto h-70'>
        <img
          src={item.imageUrl}
          className='object-contain w-full h-full rounded-lg book-shadow'
        />
        {/* 내 책장에 담기 버튼 */}
        <button
          onClick={() => handleAddBook(item)}
          className={`absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 p-2 ${theme.searchResultAddBtn} rounded-full cursor-pointer backdrop-blur-xs`}>
          <img
            src={addIcon}
            alt='add'
          />
        </button>
      </div>
      <p className={`${theme.searchItemName} font-semibold text-lg`}>{item.author}</p>
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
