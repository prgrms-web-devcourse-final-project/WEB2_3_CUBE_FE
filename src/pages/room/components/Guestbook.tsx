import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { guestbookAPI } from '../../../apis/guestbook';

import GuestbookMessage from '@pages/room/components/GuestbookMessage';
import GusetbookInput from '@pages/room/components/GusetbookInput';
import Pagination from '../../../components/Pagination';
import { useUserStore } from '../../../store/useUserStore';
import { formatTimeDate } from '../../../utils/dateFormat';

export default function Guestbook({ onClose, roomId, ownerId }) {
  const [guestbookData, setGuestbookData] = useState<GuestbookMessageType[]>(
    [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchGuestbookData = async (page: number) => {
      try {
        const response = await guestbookAPI.getGuestbook(roomId, page, 2);
        console.log('API 응답:', response);
        setGuestbookData(response.guestbook);
        setTotalPage(response.pagination.totalPages);
        console.log('페이지 정보 업데이트:', {
          currentPage: page,
          totalPages: response.pagination.totalPages,
          dataLength: response.guestbook.length,
        });
      } catch (error) {
        console.error('방명록 조회 중 오류:', error);
      }
    };
    fetchGuestbookData(currentPage);
  }, [roomId, currentPage]);

  const handleDeleteMessage = (guestbookId: number) => {
    setGuestbookData((prev) =>
      prev.filter((msg) => msg.guestbookId !== guestbookId),
    );
  };

  const handleSubmitMessage = async (guestMessage: string) => {
    if (guestMessage.trim() === '') return;

    const tempMessage = {
      guestbookId: Date.now(),
      userId: user.userId,
      nickname: user.nickname,
      message: guestMessage,
      createdAt: formatTimeDate(new Date().toISOString()),
    };

    setGuestbookData((prev) => [tempMessage, ...prev]);

    try {
      const newMessage = await guestbookAPI.createGuestbook(
        roomId,
        user.userId,
        guestMessage,
      );
      console.log('방명록 등록 성공:', newMessage);
      setGuestbookData((prev) =>
        prev.map((msg) =>
          msg.guestbookId === tempMessage.guestbookId ? newMessage : msg,
        ),
      );
    } catch (error) {
      console.error('방명록 등록 중 오류 발생:', error);
      setGuestbookData((prev) =>
        prev.filter((msg) => msg.guestbookId !== tempMessage.guestbookId),
      );
    }
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePageChange = (page: number) => {
    console.log('페이지 변경 요청:', page);
    setCurrentPage(page);
  };

  console.log('렌더링 시 상태:', {
    currentPage,
    totalPage,
    dataLength: guestbookData.length,
  });

  return (
    <motion.div
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100vh', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 130, damping: 18 }}
      onClick={handleClickOutside}
      className='fixed inset-0 z-10 flex items-center justify-center'>
      <div className='@container relative w-[calc(100vw*0.3966)] max-w-[819px] h-[calc(100vw*0.3411)] max-h-[822px] min-w-[600px] min-h-[550px]'>
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
            ownerId={ownerId}
            messages={guestbookData}
            userId={user.userId}
            onDelete={handleDeleteMessage}
          />
          {/* 작성 필드 */}
          <GusetbookInput onSubmitMessage={handleSubmitMessage} />
          {/* 페이제네이션 */}
          {guestbookData.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChangePage={handlePageChange}
              color='#73A1F7'
            />
          )}
        </section>
      </div>
    </motion.div>
  );
}
