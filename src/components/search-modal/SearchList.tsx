import { SearchItem } from './SearchItem';

interface SearchListProps {
  items: SearchItemType[];
  type: 'CD' | 'BOOK';
  onItemClick: (item: SearchItemType) => void;
}

export const SearchList = ({ items, type, onItemClick }: SearchListProps) => {
  return (
    <div className='overflow-y-auto mb-4 h-102 scrollbar pr-2'>
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
