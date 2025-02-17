import type { SearchItemType } from '@/types/search';
import { SearchItem } from './SearchItem';

interface SearchListProps {
  items: SearchItemType[];
  type: 'CD' | 'BOOK';
  onItemClick: (item: SearchItemType) => void;
}

export const SearchList = ({ items, type, onItemClick }: SearchListProps) => {
  return (
    <div className='mb-4 h-70 overflow-y-auto'>
      {items.map((item) => (
        <SearchItem
          key={item.id}
          item={item}
          type={type}
          onClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
};
