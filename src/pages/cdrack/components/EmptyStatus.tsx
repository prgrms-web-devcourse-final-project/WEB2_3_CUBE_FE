import cd from '@assets/cd/cd.png';
import Dock from './Dock';

export default function EmptyStatus() {
  return (
    <div className='w-full h-screen'>
      {/* 제목 & cd 이미지 */}
      <div className=' text-white h-full '>
        <h1 className='text-[40px] font-bold  text-center pt-46 mb-12'>
          꽂을 CD가 없네요...
        </h1>
        <img
          className='max-w-[472px] max-h-[472px] shrink-0 drop-shadow-book aspect-square m-auto'
          src={cd}
          alt='cd 실사 이미지'
        />
      </div>

      {/* CD 목록 독(하단바) */}
      <Dock isEmpty={true} />
    </div>
  );
}
