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
import ConfirmModal from '@/components/ConfirmModal';

interface SearchResultProps {
  item: SearchItemType | null;
  type: 'CD' | 'BOOK';
  items: SearchItemType[];
  isLoading: boolean;
  error: string | null;
  onSelect: (item?: SearchItemType) => void;
  onClose: () => void;
  onSuccess?: (item: SearchItemType) => void;
}

export const SearchResult = ({
  item,
  type,
  isLoading,
  error,
  onSelect,
  onClose,
  onSuccess,
}: SearchResultProps) => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const theme = SEARCH_THEME[type];
  const { user } = useUserStore();
  const { showToast } = useToastStore();

  const handleAdd = async (item: SearchItemType) => {
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
        onClose();
        showToast('책장에 책이 추가되었어요!', 'success');
        onSuccess?.(item);
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
        onSelect(item);

        await addCdToMyRack(user.userId, cdData);
      }
    } catch (error: any) {
      if (
        error.response?.data?.message ===
        '책장에 더 이상 책을 추가할 수 없습니다. 책장을 업그레이드 해주세요.'
      ) {
        setIsUpgradeModalOpen(true);
      } else {
        showToast(
          error.response?.data?.message || '오류가 발생했습니다.',
          'error',
        );
      }
      console.error(`${type} 추가 실패:`, error);
    }
  };

  const handleUpgrade = async () => {
    try {
      if (!user?.roomId) {
        showToast('오류가 발생했습니다.', 'error');
        return;
      }

      // await bookAPI.upgradeBookLevel(user.roomId, user.bookLevel + 1);
      showToast('책장이 업그레이드 되었어요!', 'success');
      setIsUpgradeModalOpen(false);

      // 책 추가 재시도
      if (item) {
        handleAdd(item);
      }
    } catch (error: any) {
      showToast(
        error.response?.data?.message || '업그레이드에 실패했습니다.',
        'error',
      );
      console.error('책장 업그레이드 실패:', error);
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
        <button
          onClick={() => handleAdd(item)}
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

      {isUpgradeModalOpen && (
        <ConfirmModal
          onClose={() => setIsUpgradeModalOpen(false)}
          onConfirm={handleUpgrade}
          title='책장이 꽉 찼어요!'
          subTitle='400 포인트를 소모해 책장을 업그레이드 할 수 있어요.'
        />
      )}
    </div>
  );
};
