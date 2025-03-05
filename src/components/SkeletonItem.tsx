export default function SkeletonItem({ isBook }: { isBook: boolean }) {
  const mainColor = isBook ? 'bg-[#2656CD]/10' : 'bg-[#7838AF]/10';

  return (
    <li
      className={`flex justify-between items-center animate-pulse rounded-[12px]`}>
      {/* 왼쪽 콘텐츠 */}
      <div className='flex flex-col gap-1 py-4 pl-7 w-full'>
        <div className='flex gap-2 items-baseline'>
          <div className={`w-16 h-4 rounded ${mainColor}`}></div> {/* 닉네임 */}
          <div className={`h-3 rounded w-15 ${mainColor}`}></div> {/* 날짜 */}
        </div>
        <div className={`w-3/4 h-4 rounded ${mainColor}`}></div>
      </div>

      <div className='py-7 pr-8'>
        <div className={`w-8 h-8 rounded ${mainColor}`}></div>{' '}
        {/* 아이콘 자리 */}
      </div>
    </li>
  );
}
