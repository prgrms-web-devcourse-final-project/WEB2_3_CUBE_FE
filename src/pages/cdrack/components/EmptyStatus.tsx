import cd from '@assets/cd/cd.png';
import cd_add_icon from '@assets/cd/cd-add-icon.svg';
import Dock from './Dock';

export default function EmptyStatus() {
  return (
    <div className='w-full h-screen'>
      {/* 제목 & cd 이미지 */}
      <div className=' text-white '>
        <h1 className='text-[40px] font-bold tracking-[-0.3px] text-center pt-46 mb-12'>
          꽂을 CD가 없네요...
        </h1>
        <img
          className='max-w-[472px] max-h-[472px] shrink-0 drop-shadow-book aspect-square m-auto'
          src={cd}
          alt='cd 실사 이미지'
        />
      </div>

      <div
        className='fixed bottom-49 right-19 bg-[#FFFFFF33] backdrop-blur-[35px] rounded-full w-16 h-16 cursor-pointer 
      flex justify-center items-center border-2 border-[#FFFFFFB2]'>
        <img
          className='w-5 h-5 '
          src={cd_add_icon}
          alt='cd 추가 아이콘'
        />
      </div>

      {/* CD 목록 독(하단바) */}
      <Dock isEmpty={true} />
    </div>
  );
}
