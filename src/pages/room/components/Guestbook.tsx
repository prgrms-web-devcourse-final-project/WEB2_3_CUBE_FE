import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { guestbookAPI } from '../../../apis/guestbook';

import GuestbookMessage from '@pages/room/components/GuestbookMessage';
import GusetbookInput from '@pages/room/components/GusetbookInput';
import { useUserStore } from '../../../store/useUserStore';

export default function Guestbook({ onClose, roomId }) {
  const [guestbookData, setGuestbookData] = useState<GuestbookMessageType[]>(
    [],
  );
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchGuestbookData = async () => {
      try {
        const response = await guestbookAPI.getGuestbook(roomId, 1, 2);
        setGuestbookData(response.guestbook);
        console.log(response.guestbook);
      } catch (error) {
        console.error('방명록 조회 중 오류:', error);
      }
    };
    fetchGuestbookData();
  }, [roomId]);

  const handleDeleteMessage = (guestbookId: number) => {
    setGuestbookData((prev) =>
      prev.filter((msg) => msg.guestbookId !== guestbookId),
    );
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100vh', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 130, damping: 18 }}
      onClick={handleClickOutside}
      className='fixed inset-0 flex items-center justify-center z-10'>
      <div className='@container relative w-[calc(100vw*0.4266)] max-w-[819px] h-[calc(100vw*0.3911)] max-h-[822px] min-w-[600px] min-h-[550px]'>
        {/* 뒤 배경 */}
        <div
          className='absolute w-full h-full bg-[#73A1F7] rounded-[60px] border-2 border-[#2656CD]'
          style={{ bottom: '-24px', left: '0' }}></div>

        {/* 스프링 요소 - 왼쪽 */}
        <div className='spring-left-first'>
          <div className='spring-element' />
        </div>
        <div className='spring-left-second'>
          <div className='spring-element' />
        </div>

        {/* 스프링 요소- 오른쪽 */}
        <div className='spring-right-first'>
          <div className='spring-element' />
        </div>
        <div className='spring-right-second'>
          <div className='spring-element' />
        </div>

        {/* 메인 배경 */}
        <section className='guest-book @3xl:gap-5 flex-col items-center pt-10 @3xl:pt-20 px-13 @3xl:px-16'>
          {/* 방명록 컨텐츠 */}
          <span className='flex gap-2 font-bold text-3xl @3xl:text-4xl @3xl:my-3'>
            {/*todo: 방 userId -> 닉네임으로 수정 */}
            <p className='text-[#4983EF]'>{user.nickname}</p>
            <p className='text-[#3E507D]'>님의 방명록</p>
          </span>
          {/* 방명록 글 */}
          <GuestbookMessage
            messages={guestbookData}
            userId={user.userId}
            onDelete={handleDeleteMessage}
          />
          {/* 작성 필드 */}
          <GusetbookInput roomId={roomId} />
        </section>
      </div>
    </motion.div>
  );
}
