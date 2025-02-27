import { useRef } from 'react';
import copyIcon from '@assets/profile-card/copy-icon.svg';

interface ProfileImageEditProps {
  imageUrl: string;
  onImageChange: (file: File) => void;
}

export const ProfileImageEdit = ({
  imageUrl,
  onImageChange,
}: ProfileImageEditProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      aria-label='프로필 이미지 수정'
      className='relative'>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept='.jpg,.jpeg,.png'
        className='hidden'
      />
      <img
        src={imageUrl}
        alt='사용자 프로필'
        className='object-cover w-32 h-32 rounded-full'
      />
      <button
        onClick={handleImageButtonClick}
        className='absolute bottom-0 right-0 w-8 h-8 bg-[#73A1F7] rounded-full flex items-center justify-center hover:bg-[#5485E3] transition-colors'>
        <img
          src={copyIcon}
          alt='프로필 이미지 변경'
          className='w-6 h-6'
        />
      </button>
    </div>
  );
};
