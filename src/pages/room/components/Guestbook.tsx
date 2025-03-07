import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { guestbookAPI } from '../../../apis/guestbook';
import { useToastStore } from '../../../store/useToastStore';
import { useUserStore } from '../../../store/useUserStore';
import Pagination from '../../../components/Pagination';
import GuestbookMessage from '@pages/room/components/GuestbookMessage';
import GusetbookInput from '@pages/room/components/GusetbookInput';

export default function Guestbook({ onClose, ownerName, ownerId }: GuestbookProps) {
  const { showToast } = useToastStore();
  const [guestbookData, setGuestbookData] = useState<GuestbookMessageType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const user = useUserStore((state) => state.user);

  const fetchGuestbookData = useCallback(async (page: number) => {
    try {
      const response = await guestbookAPI.getGuestbook(ownerId, page, 2);
      setGuestbookData(response.guestbook);
      setTotalPage(response.pagination.totalPages);
    } catch (error) {
      console.error('방명록 조회 중 오류:', error);
    }
  }, [ownerId]); 

  useEffect(() => {
    fetchGuestbookData(currentPage);
  }, [fetchGuestbookData, currentPage]);

  const handleSubmitMessage = async (guestMessage: string) => {
    if (guestMessage.trim() === '') return;

    try {
      const response = await guestbookAPI.createGuestbook(
        ownerId,
        user.userId,
        guestMessage,
      );
      showToast('방명록 등록 완료! 멋진 한마디, 잘 전달되었어요!', 'success');
      setGuestbookData(response.guestbook);
      setTotalPage(response.pagination.totalPages);

      setCurrentPage(1);
    } catch (error) {
      console.error('방명록 등록 중 오류 발생:', error);
      showToast('방명록을 등록하는 데 실패했어요. 다시 시도해 주세요!', 'error');

    }
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteGuestbook = () => {
    if (guestbookData.length === 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      fetchGuestbookData(currentPage);
    }
  };

  return (
    <motion.div
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100vh', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 130, damping: 18 }}
      onClick={handleClickOutside}
      className='fixed inset-0 z-10 flex items-center justify-center'>
      <div className='@container relative w-[calc(100vw*0.3966)] max-w-[800px] h-[calc(100vw*0.3611)] max-h-[700px] min-w-[600px] min-h-[550px]'>
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
        <section className='guest-book flex-col items-center pt-10 @2xl:pt-15 px-13 @2xl:px-16'>
          {/* 방명록 컨텐츠 */}
          <span className='flex gap-2 font-bold text-3xl @2xl:text-4xl @2xl:my-3'>
            {/*todo: 방 userId -> 닉네임으로 수정 */}
            <p className='text-[#4983EF]'>{ownerName}</p>
            <p className='text-[#3E507D]'>님의 방명록</p>
          </span>
          {/* 방명록 글 */}
          <GuestbookMessage
            ownerId={ownerId}
            messages={guestbookData}
            userId={user.userId}
            refetchGuestbook={() => fetchGuestbookData(currentPage)}
            onDelete={handleDeleteGuestbook}
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
