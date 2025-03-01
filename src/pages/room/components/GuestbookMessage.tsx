import exProfile from '@assets/rank/exProfile.png';
import { Link } from 'react-router-dom';
import { guestbookAPI } from '../../../apis/guestbook';
import { formatTimeDate } from '../../../utils/dateFormat';
import { useUserStore } from '../../../store/useUserStore';

export default function GuestbookMessage({
  messages = [],
  onDelete,
  userId,
  ownerId,
}: GuestbookMessageProps) {
    const user = useUserStore((state) => state.user);
  const handleDelete = async (guestbookId: number) => {
    try {
      await guestbookAPI.deleteGuestbook(guestbookId, userId);
      onDelete(guestbookId);
      console.log('삭제 완료', guestbookId);
    } catch (error) {
      console.log('삭제 중 오류 발생', error);
    }
  };

  return (
    <div className='@container w-full flex flex-col gap-4 @3xl:mt-1 mt-4 mb-4 max-h-80 min-h-[300px] '>
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
                      msg.relation === '지나가던_나그네'
                        ? 'bg-[#B5B5B5]'
                        : 'bg-[#FF4A9E]'
                    }`}>
                  {`${
                    msg.userId === user.userId
                    ? '작성자'
                    : msg.relation === '지나가던_나그네'
                    ? '지나가던 나그네'
                    : '하우스메이트'
                  }`}
                </p>
                {/* 삭제 */}
                {(msg.userId === user.userId || ownerId === user.userId) && (
                <button
                  onClick={() => handleDelete(msg.guestbookId)}
                  className='text-[#3E507D] opacity-50 text-[10px] @xl:text-xs font-semibold hover:opacity-100'>
                  삭제
                </button>)}
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
                      className='w-6 @2xl:w-7 rounded-full'
                    />
                    <p className='text-sm @2xl:pb-1 @2xl:text-base font-semibold text-[#292929]'>
                      {msg.nickname}
                    </p>
                  </Link>
                </div>
                {/* 작성 일시 */}
                <p className='text-[10px] @xl:text-xs text-[#292929]/30 font-medium'>
                  {formatTimeDate(msg.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
