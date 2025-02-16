import React from 'react';
import { SearchInput } from './SearchInput';
import { SearchList } from './SearchList';
import { SearchResult } from './SearchResult';
import { useSearch } from '@/hooks/useSearch';
import type { SearchItemType } from '@/types/search';

interface SearchModalProps {
  title: string;
  onClose: () => void;
  type: 'CD' | 'BOOK';
}

export const SearchModal = ({ title, onClose, type }: SearchModalProps) => {
  const { search, isLoading, error } = useSearch(type);
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchItemType[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<SearchItemType | null>(
    null,
  );

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.trim()) {
      const searchResults = await search(value);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div
      role='dialog'
      className='fixed inset-0 bg-opacity-50 flex items-center justify-center'>
      <div className='p-4 border-2 border-white bg-white/30 filter-blur rounded-3xl w-[1000px]'>
        <div className='bg-white rounded-2xl p-6 w-full h-full item-between gap-2'>
          {/* 제목 + 검색 바 + 아이템 리스트 */}
          <div className='w-1/2'>
            <h2 className='text-xl font-bold mb-4'>{title}</h2>
            <SearchInput
              value={query}
              onChange={handleSearch}
              placeholder='어떤 것이든 검색해보세요!'
            />
            {isLoading && <div className='text-gray-400'>검색 중...</div>}
            {error && <div className='text-gray-400'>{error}</div>}
            <SearchList
              items={results}
              type={type}
              onItemClick={setSelectedItem}
            />
          </div>
          {/* 검색 결과 */}
          <div className='w-1/2 pl-8'>
            <SearchResult
              item={selectedItem}
              type={type}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
