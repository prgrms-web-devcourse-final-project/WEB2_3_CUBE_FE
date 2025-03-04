import { useRef } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import cdImg from '@assets/cd/cd.png';
import bookImg from '@assets/room/book.png';
import PreferenceSettingCard from './PreferenceSettingCard';

export default function PreferenceSetting({
  storageData,
  onFurnitureToggle,
  bookshelfLevel,
  cdRackLevel,
  furnitures,
  bookGenres,
  cdGenres,
  onClose,
}: PreferenceSettingProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useClickOutside({ modalRef, buttonRef, isOpen: true, onClose, excludeSelectors: ['.bottom-menu'] });

  return (
    <div className='flex flex-col items-center justify-end w-full min-h-screen'>
      <div ref={modalRef} className='setting-gradient flex items-start 2xl:items-center justify-center gap-10 w-full h-[300px] 2xl:h-[418px]'>
        <PreferenceSettingCard
          title={'음악'}
          level={cdRackLevel}
          genres={cdGenres}
          thumbnail={cdImg}
          maxCount={storageData.maxMusic}
          savedCount={storageData.savedMusic}
          writtenCount={storageData.writtenMusicLogs}
          isAdd={furnitures[1].isVisible}
          onClick={() => onFurnitureToggle('CD_RACK')}
        />
        <PreferenceSettingCard
          title={'도서'}
          level={bookshelfLevel}
          genres={bookGenres}
          thumbnail={bookImg}
          maxCount={storageData.maxBooks}
          savedCount={storageData.savedBooks}
          writtenCount={storageData.writtenReviews}
          isAdd={furnitures[0].isVisible}
          onClick={() => onFurnitureToggle('BOOKSHELF')}
        />
      </div>
    </div>
  );
}
