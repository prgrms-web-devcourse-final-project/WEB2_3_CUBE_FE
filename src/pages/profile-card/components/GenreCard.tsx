const GenreCard = ({ title, genres }: GenreCardProps) => {
  return (
    <div className='item-row gap-2 bg-[#F9F4FB] rounded-2xl px-6 py-4 w-full '>
      <h4 className='font-semibold text-[#224DBA] text-sm'>{title}</h4>
      <div className='flex gap-2'>
        {genres.length > 0 ? (
          genres.map((genre, index) => (
            <span
              key={`${genre}-${index}`}
              className='text-xs text-[#3E507D] bg-[#73A1F7]/20 rounded-full px-2 py-1 min-w-15 item-middle font-medium item-middle text-center break-keep'>
              {genre}
            </span>
          ))
        ) : (
          <span className='text-xs text-[#3E507D] bg-[#73A1F7]/20 rounded-full px-2 py-1 min-w-15 item-middle font-medium item-middle text-center'>
            딱 맞는 취향을 찾는 중
          </span>
        )}
      </div>
    </div>
  );
};

export default GenreCard;
