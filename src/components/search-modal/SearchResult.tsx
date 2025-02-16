import { SearchItemType } from '@/types/search';

interface SearchResultProps {
  item?: SearchItemType | null;
  type: 'CD' | 'BOOK';
}

export const SearchResult = ({ item, type }: SearchResultProps) => {
  if (!item)
    return (
      <div className='h-full flex items-center justify-center text-gray-400'>
        검색 결과를 선택해주세요
      </div>
    );

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      {/* 출판일 / 발매일 */}
      <p className='text-gray-600'>{item.date}</p>
      <h3 className='text-xl font-bold'>{item.title}</h3>
      <img
        src={item.imageUrl}
        alt={item.title}
        className='h-70 w-auto object-contain rounded-lg shadow-lg'
      />
      <p className='text-gray-600'>{item.author}</p>
      {/* 장르 */}
      <div className='flex flex-wrap gap-2'>
        {item.genres.map((genre) => (
          <span
            key={genre}
            className='px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm'>
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};
