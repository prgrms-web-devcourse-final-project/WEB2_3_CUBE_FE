import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import copyIcon from '@assets/profile-card/copy-icon.svg';
import LayeredButton from '@components/LayeredButton';
import { useState, useRef } from 'react';

const ProfileCardEditPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [nickname, setNickname] = useState('PH-1');
  const [bio, setBio] = useState('나를 표현해보세요 ψ(｀∇´)ψ ♪');
  const [profileImage, setProfileImage] = useState(
    'https://i.pinimg.com/736x/9e/00/8e/9e008e514cc474b12d7190c9e87ebf48.jpg',
  );

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='w-full h-screen main-background'>
      <motion.div
        initial={{ y: '100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100vh', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 130, damping: 18 }}
        onClick={handleClickOutside}
        className='fixed inset-0 z-10 flex items-center justify-center'>
        <div className='@container relative w-[660px] h-[660px]'>
          {/* 뒤 배경 */}
          <div
            className='absolute w-[660px] h-[660px] bg-[#73A1F7] rounded-[60px] border-2 border-[#2656CD]'
            style={{ bottom: '-24px', left: '0' }}></div>

          {/* 메인 배경 */}
          <section className='relative flex flex-col justify-around items-center w-[660px] h-[660px] bg-[#FCF7FD] rounded-[60px] border-2 border-[#2656CD] px-24 py-10'>
            {/* 프로필 이미지 수정 */}
            <div
              aria-label='프로필 이미지 수정'
              className='relative'>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept='image/*'
                className='hidden'
              />
              <img
                src={profileImage}
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

            {/* 닉네임 수정 */}
            <div
              aria-label='닉네임 수정'
              className='flex flex-col gap-2 w-[400px]'>
              <h2 className='text-lg font-bold text-[#3E507D]'>닉네임</h2>
              <input
                type='text'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder='닉네임을 입력해주세요'
                className='w-full px-4 py-2 bg-[#4E7ACF]/5 rounded-lg outline-none border-2 border-transparent focus:border-[#73A1F7] transition-colors text-[#3E507D]'
                maxLength={10}
              />
            </div>

            <div className='flex flex-col gap-2 w-[400px]'>
              <h3 className='text-lg font-bold text-[#3E507D]'>한 줄 소개</h3>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder='나를 표현해보세요 ψ(｀∇´)ψ ♪'
                className='w-full p-4 bg-[#4E7ACF]/5 rounded-lg outline-none resize-none border-2 border-transparent focus:border-[#73A1F7] transition-colors min-h-[100px] text-[#3E507D]'
                maxLength={100}
              />
            </div>

            <div className='flex flex-col items-center gap-4'>
              <LayeredButton
                theme='purple'
                className='py-1.5 px-10'>
                수정 완료
              </LayeredButton>
              <button className='text-sm text-[#3E507D]/30 mt-2'>
                회원 탈퇴하기
              </button>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileCardEditPage;
