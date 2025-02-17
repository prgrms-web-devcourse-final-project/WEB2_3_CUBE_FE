import type { SearchItemType } from '@/types/search';
import { SEARCH_THEME } from '@/constants/searchTheme';

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
      <div>
        <h3 className={`text-lg font-bold ${theme.searchItemText}`}>
          {item.title}
        </h3>
        <p className={`text-sm ${theme.searchItemName}`}>{item.author}</p>
      </div>
      <span className={`ml-auto text-sm ${theme.searchItemText}`}>{item.date}</span>
    </div>
  );
};
