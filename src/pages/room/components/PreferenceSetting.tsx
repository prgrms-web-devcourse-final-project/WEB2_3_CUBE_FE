import { useRef, useState } from 'react';
import { roomAPI } from '../../../apis/room';
import { useClickOutside } from '../../../hooks/useClickOutside';
import cdImg from '@assets/cd/cd.png';
import bookImg from '@assets/room/book.png';
import PreferenceSettingCard from './PreferenceSettingCard';

export default function PreferenceSetting({
  storageLimits,
  userStorage,
  userId,
  roomId,
}) {
  const [addFurniture, setAddFurniture] = useState<Record<string, boolean>>({
    BOOKSHELF: false,
    CD_RACK: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    setIsModalOpen(false);
  };

  useClickOutside({ modalRef, buttonRef, isOpen: isModalOpen, onClose });

  const handleFurnitureToggle = async (
    furnitureType: 'BOOKSHELF' | 'CD_RACK',
  ) => {
    try {
      const url = `/api/rooms/${roomId}/furniture?userId=${userId}`;
      console.log('Request URL:', url);
      await roomAPI.updateRoomFurniture(roomId, userId, furnitureType);

      setAddFurniture((prev) => ({
        ...prev,
        [furnitureType]: !prev[furnitureType],
      }));
    } catch (error) {
      console.error('가구 설정 변경 실패:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-end w-full min-h-screen'>
      <div ref={modalRef} className='setting-gradient flex items-start 2xl:items-center justify-center gap-10 w-full h-[300px] 2xl:h-[418px]'>
        <PreferenceSettingCard
          title={'음악'}
          thumbnail={cdImg}
          maxCount={storageLimits?.maxMusic || 0}
          savedCount={userStorage?.savedMusic || 0}
          writtenCount={userStorage?.writtenMusicLogs || 0}
          isAdd={addFurniture.CD_RACK}
          onClick={() => handleFurnitureToggle('CD_RACK')}
        />
        <PreferenceSettingCard
          title={'도서'}
          thumbnail={bookImg}
          maxCount={storageLimits?.maxBooks || 0}
          savedCount={userStorage?.savedBooks || 0}
          writtenCount={userStorage?.writtenReviews || 0}
          isAdd={addFurniture.BOOKSHELF}
          onClick={() => handleFurnitureToggle('BOOKSHELF')}
        />
      </div>
    </div>
  );
}
