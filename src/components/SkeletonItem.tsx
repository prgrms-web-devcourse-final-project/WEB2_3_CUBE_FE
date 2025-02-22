// Skeleton loader component
export default function SkeletonItem({ isBook }: { isBook: boolean }) {
  const mainColor = isBook ? 'bg-[#2656CD]/10' : 'bg-[#7838AF]/10';

  return (
    <li className='flex items-center gap-4 p-4 animate-pulse'>
      <div className={`w-16 h-16 rounded-md ${mainColor}`}></div>
      <div className='flex flex-col gap-2 flex-1'>
        <div className={`h-4 w-3/4 rounded ${mainColor}`}></div>
        <div className={`h-3 w-1/2 rounded ${mainColor}`}></div>
      </div>
    </li>
  );
}
