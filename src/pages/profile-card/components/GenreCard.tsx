import { GenreCardProps } from './types';

const GenreCard = ({ title, genres }: GenreCardProps) => {
  return (
    <div className='item-row gap-2 bg-[#B5B5B5]/10 rounded-2xl px-8 py-4 w-full'>
      <h4 className='font-semibold text-[#224DBA] text-sm'>{title}</h4>
      <div className='flex flex-wrap gap-2'>
        {genres.map((genre, index) => (
          <span
            key={`${genre}-${index}`}
            className='text-xs text-[#3E507D] bg-[#73A1F7]/20 rounded-full px-2 py-1 min-w-15 item-middle'>
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GenreCard;
