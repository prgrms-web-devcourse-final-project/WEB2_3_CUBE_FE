import type { SearchItemType } from '@/types/search';
import { SEARCH_THEME } from '@/constants/searchTheme';
import { truncateTitle } from '@/utils/truncate';

interface SearchItemProps {
  item: SearchItemType;
  type: 'CD' | 'BOOK';
  onClick: () => void;
}

export const SearchItem = ({ item, type, onClick }: SearchItemProps) => {
  const theme = SEARCH_THEME[type];
  return (
    <div
      className={`flex items-center p-3 mb-3 rounded-lg cursor-pointer ${theme.searchItemBg}`}
      onClick={onClick}>
      <div className='flex-1 min-w-0'>
        <h3 className={`text-lg font-bold ${theme.searchItemText}`}>
          {truncateTitle(item.title, 15)}
        </h3>
        <p className={`text-sm ${theme.searchItemName} line-clamp-1`}>
          {type === 'BOOK' 
            ? `${item.author} | ${item.publisher || '출판사 정보 없음'}`
            : `${item.artist} | ${item.album_title || ''}`}
        </p>
      </div>
      <span
        className={`ml-4 text-sm ${theme.searchItemText} whitespace-nowrap`}>
        {item.date}
      </span>
    </div>
  );
};
