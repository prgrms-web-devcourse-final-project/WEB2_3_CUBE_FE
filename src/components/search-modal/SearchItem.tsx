import type { SearchItemType } from '@/types/search';

interface SearchItemProps {
  item: SearchItemType;
  type: 'CD' | 'BOOK';
  onClick: () => void;
}

export const SearchItem = ({ item, type, onClick }: SearchItemProps) => {
  return (
    <div 
      className='flex items-center p-3 bg-gray-50 mb-1 rounded-lg cursor-pointer'
      onClick={onClick}
    >
      <div>
        <h3 className='font-medium'>{item.title}</h3>
        <p className='text-sm text-gray-500'>{item.author}</p>
      </div>
      <span className='ml-auto text-sm text-gray-400'>{item.date}</span>
    </div>
  );
};
