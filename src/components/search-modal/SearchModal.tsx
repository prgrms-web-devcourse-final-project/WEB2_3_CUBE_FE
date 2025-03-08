import React from 'react';
import { SearchInput } from './SearchInput';
import { SearchList } from './SearchList';
import { SearchResult } from './SearchResult';
import { useSearch } from '@/hooks/useSearch';
import ModalBackground from '@/components/ModalBackground';
import { SEARCH_THEME } from '@/constants/searchTheme';
import { motion } from 'framer-motion';

interface SearchModalProps {
  title: string;
  onClose: () => void;
  type: 'CD' | 'BOOK';
  onSelect: (item?: SearchItemType) => void;
  onSuccess?: (item: SearchItemType) => void;
}

export const SearchModal = ({
  title,
  onClose,
  type,
  onSelect,
  onSuccess,
}: SearchModalProps) => {
  const { query, setQuery, results, isLoading, error } = useSearch(type);
  const [selectedItem, setSelectedItem] = React.useState<SearchItemType | null>(
    null,
  );
  const theme = SEARCH_THEME[type];

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  return (
    <ModalBackground onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.95, x: 20 }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
        className='p-4 border-2 border-white bg-white/30 filter-blur rounded-3xl w-[1000px] h-[657px]'>
        <div className='gap-2 p-10 w-full h-full bg-[#FCF7FD] rounded-2xl item-between'>
          {/* 제목 + 검색 바 + 아이템 리스트 */}
          <div className='w-1/2 h-full'>
            <h2 className={`mb-7 text-3xl font-bold ${theme.title}`}>
              {title}
            </h2>
            <SearchInput
              value={query}
              onChange={handleSearch}
              placeholder='어떤 것이든 검색해보세요!'
              mainColor='#2656CD' // 검색창 아웃라인
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
          <div className='pl-8 w-1/2'>
            <SearchResult
              item={selectedItem}
              type={type}
              isLoading={isLoading}
              error={error}
              items={results}
              onSelect={onSelect}
              onClose={onClose}
              onSuccess={onSuccess}
            />
          </div>
        </div>
      </motion.div>
    </ModalBackground>
  );
};
