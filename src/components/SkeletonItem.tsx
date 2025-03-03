// Skeleton loader component
export default function SkeletonItem({ isBook }: { isBook: boolean }) {
  const mainColor = isBook ? 'bg-[#2656CD]/10' : 'bg-[#7838AF]/10';

  return (
    <li
      className={`flex justify-between items-center  rounded-[12px] animate-pulse`}>
      {/* 왼쪽 콘텐츠 */}
      <div className='flex flex-col gap-1 py-4 pl-7 w-full'>
        <div className='flex items-baseline gap-2'>
          <div className={`h-4 w-16 ${mainColor} rounded`}></div> {/* 닉네임 */}
          <div className={`h-3 w-15 ${mainColor} rounded`}></div> {/* 날짜 */}
        </div>
        <div className={`h-4 w-3/4 ${mainColor} rounded`}></div>
      </div>

      <div className='pr-8 py-7'>
        <div className={`h-8 w-8 ${mainColor} rounded`}></div>{' '}
        {/* 아이콘 자리 */}
      </div>
    </li>
  );
}
