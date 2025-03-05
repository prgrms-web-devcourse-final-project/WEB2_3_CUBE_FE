import cd from '@assets/cd/cd.png';
import Dock from './Dock';
import { SearchModal } from '@components/search-modal/SearchModal';
import cd_add_icon from '@assets/cd/cd-add-icon.svg';
import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { useParams } from 'react-router-dom';

export default function EmptyStatus() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const myUserId = useUserStore().user.userId;
  const userId = Number(useParams().userId);

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

      {myUserId === userId && (
        <div
          onClick={() => setIsModalOpen((prev) => !prev)}
          className='fixed bottom-17 right-15 z-[5] bg-[#FFFFFF33] backdrop-blur-[35px] rounded-full w-16 h-16 cursor-pointer 
       item-middle border-2 border-[#FFFFFFB2]'>
          <img
            className='w-5 h-5'
            src={cd_add_icon}
            alt='cd 추가 아이콘'
          />
        </div>
      )}

      {/* 검색 모달 */}
      {isModalOpen && (
        <SearchModal
          title='CD 랙에 담을 음악 찾기'
          onClose={() => setIsModalOpen(false)}
          type='CD'
          onSelect={() => {}}
        />
      )}
    </div>
  );
}
