import exProfile from '@assets/rank/exProfile.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { guestbookAPI } from '../../../apis/guestbook';
import ConfirmModal from '../../../components/ConfirmModal';
import { useToastStore } from '../../../store/useToastStore';
import { useUserStore } from '../../../store/useUserStore';
import { getRelativeTimeString } from '../../../utils/dateFormat';

export default function GuestbookMessage({
  messages = [],
  userId,
  ownerId,
  refetchGuestbook,
  onDelete,
}: GuestbookMessageProps) {
  const { showToast } = useToastStore();
  const [modalState, setModalState] = useState<{ [key: number]: boolean }>({});
  const user = useUserStore((state) => state.user);

  const handleDelete = async (guestbookId: number) => {
    try {
      await guestbookAPI.deleteGuestbook(guestbookId, userId);
      showToast('방명록 삭제 완료! 깔끔하게 정리됐어요', 'success');

      if (refetchGuestbook) {
        refetchGuestbook();
      }

      onDelete();
    } catch (error) {
      console.log('삭제 중 오류 발생', error);
      showToast('삭제하지 못했어요. 다시 시도해 주세요!', 'error');
    }
  };

  const openModal = (guestbookId: number) => {
    setModalState((prev) => ({ ...prev, [guestbookId]: true }));
  };

  const closeModal = (guestbookId: number) => {
    setModalState((prev) => ({ ...prev, [guestbookId]: false }));
  };

  const handleConfirm = (guestbookId: number) => {
    closeModal(guestbookId);
    handleDelete(guestbookId);
  };

  return (
    <div className='@container w-full flex flex-col gap-2 2xl:gap-4 mt-3 mb-3 2xl:mb-3 3xl:mb-8 max-h-80 min-h-[300px]'>
      {/* 방명록 글 0개일 경우 */}
      {messages.length === 0 ? (
        <div className='flex flex-col justify-center items-center text-gray-500/50 h-74 @xl:h-96 font-medium'>
          <p className='text-2xl @xl:text-3xl text-gray-500/20'>
            ｡°(っ°´o`°ｃ)°｡
          </p>
          <p className='@xl:text-lg mt-5 '>텅~ 빈 방명록...</p>
          <p className='@xl:text-lg mt-[-3px] @xl:mt-[-4px]'>
            당신의 따뜻한 한마디가 필요해요!
          </p>
        </div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.guestbookId}
            className={`flex items-center bg-[#F5F1FA]/40 rounded-xl @xl:rounded-3xl w-full py-5 gap-8 @xl:gap-11 px-8 @xl:px-12`}>
            {/* 방명록 컨텐츠 */}
            <div className='flex flex-col flex-1 min-h-[100px] justify-between '>
              <div className='flex justify-between items-center w-full mb-2 @xl:mb-4'>
                {/* 관계 */}
                <p
                  className={`ml-[-2px] @xl:pt-1.5 rounded-full text-center @xl:px-4 px-2.5 py-1 text-[10px] @xl:text-xs font-semibold @xl:font-semibold text-white inline-block self-start whitespace-nowrap
                    ${
                      msg.userId === user.userId
                        ? 'bg-[#B5B5B5]' // 작성자
                        : msg.userId === ownerId
                        ? 'bg-[#8DB2F8]' // 방 주인
                        : msg.relation === '지나가던_나그네'
                        ? 'bg-[#B5B5B5]' // 나그네
                        : 'bg-[#FF4A9E]' // 하우스 메이트
                    }`}>
                  {`${
                    msg.userId === user.userId
                      ? '작성자'
                      : msg.userId === ownerId
                      ? '방 주인'
                      : msg.relation === '지나가던_나그네'
                      ? '지나가던 나그네'
                      : '하우스 메이트'
                  }`}
                </p>
                {/* 삭제 */}
                {(msg.userId === user.userId || ownerId === user.userId) && (
                  <button
                    onClick={() => openModal(msg.guestbookId)}
                    className='text-[#3E507D] opacity-50 text-[10px] @xl:text-xs font-semibold hover:opacity-100'>
                    삭제
                  </button>
                )}
                {modalState[msg.guestbookId] && (
                  <ConfirmModal
                    onClose={() => closeModal(msg.guestbookId)}
                    onConfirm={() => handleConfirm(msg.guestbookId)}
                    title='삭제하시겠습니까? 🗑️'
                    subTitle='사라지면 다시는 돌아오지 않아요...'
                  />
                )}
              </div>

              {/* 방명록 본문 */}
              <p className='text-xs @xl:text-sm text-[#292929]/70 font-medium mb-2 ml-[2px] leading-tight '>
                {msg.message}
              </p>

              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  {/* 방문객 프로필 */}
                  <Link
                    to={`/profile/${msg.userId}`}
                    className='flex items-center gap-1.5 @xl:gap-2'>
                    <img
                      src={msg.profileImage || exProfile}
                      alt={`${msg.nickname}의 프로필`}
                      className='w-6 h-6 @2xl:w-7 @2xl:h-7 rounded-full'
                    />
                    <p className='text-sm @2xl:pb-1 @2xl:text-base font-semibold text-[#292929]'>
                      {msg.nickname}
                    </p>
                  </Link>
                </div>
                {/* 작성 일시 */}
                <p className='text-[10px] @xl:text-xs text-[#292929]/30 font-medium'>
                  {getRelativeTimeString(msg.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
