import { bookAPI } from '@/apis/book';
import addIcon from '@/assets/add-icon.svg';
import { SEARCH_THEME } from '@/constants/searchTheme';
import { toKoreanDate } from '@utils/dateFormat';
import { addCdToMyRack } from '@apis/cd';
import { useUserStore } from '@/store/useUserStore';
import { useToastStore } from '@/store/useToastStore';
import AlertModal from '@components/AlertModal';
import { useState } from 'react';
import { BookType } from '@/types/book';

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
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const theme = SEARCH_THEME[type];
  const { user } = useUserStore();
  const { showToast } = useToastStore();
  const handleAddBook = async (item: SearchItemType) => {
    try {
      if (!user?.userId) {
        showToast('로그인이 필요한 서비스입니다.', 'error');
        return;
      }

      if (type === 'BOOK') {
        const bookData: BookType = {
          isbn: item.id,
          title: item.title,
          author: item.author,
          publisher: item.publisher,
          publishedDate: new Date(item.date).toISOString().split('T')[0],
          imageUrl: item.imageUrl,
          genreNames: item.genres,
          page: 0,
        };
        await bookAPI.addBookToMyBook(bookData, user.userId);
      } else if (type === 'CD') {
        // CD 추가 요청 로직
        const cdData: PostCDInfo = {
          title: item.title,
          artist: item.artist,
          album: item.album_title,
          genres: item.genres,
          coverUrl: item.imageUrl,
          youtubeUrl: item.youtubeUrl,
          duration: item.duration,
          releaseDate: item.date,
        };

        if (!cdData.youtubeUrl || !cdData.duration) {
          setIsAlertModalOpen(true);
          return;
        }
        await addCdToMyRack(user.userId, cdData);
      }
      onSelect(item);
      onClose();
    } catch (error) {
      console.error(`${type} 추가 실패:`, error);
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
        <p className={`${theme.searchResultDate} font-mono tabular-nums`}>
          {toKoreanDate(item.date)}
        </p>
        <h3
          className={`text-xl font-bold text-center ${theme.searchResultText}`}>
          {item.title}
        </h3>
      </div>
      {/* 표지 / 앨범 커버 */}
      <div className='relative w-auto mb-4 h-70'>
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
      <p className={`${theme.searchItemName} font-semibold text-lg`}>
        {item.author || item.artist}
      </p>
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
      {isAlertModalOpen && (
        <AlertModal
          onConfirm={() => setIsAlertModalOpen(false)}
          title='추가할 수 없는 CD에요!'
          subTitle='다른 CD를 선택해주세요.'
        />
      )}
    </div>
  );
};
