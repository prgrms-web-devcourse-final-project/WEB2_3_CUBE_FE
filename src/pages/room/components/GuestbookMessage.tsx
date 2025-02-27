import { formatTimeDate } from "../../../utils/dateFormat";
import exProfile from '@assets/rank/exProfile.png';
import { guestbookAPI } from "../../../apis/guestbook";

export default function GuestbookMessage({ messages = [], onDelete, userId }: GuestbookMessageProps) {

  const handleDelete = async (guestbookId: number) => {

    try {
      await guestbookAPI.deleteGuestbook(guestbookId, userId);
      onDelete(guestbookId); 
    } catch (error) {
      console.log('삭제 중 오류 발생',error)
    }
  };

  return (
    <div className='@container w-full flex flex-col gap-4 @3xl:mt-6 mt-7 2xl:mb-8 mb-4 max-h-80 min-h-[300px] '>
      {/* 방명록 글 0개일 경우 */}
      {messages.length === 0 ? (
        <div className='flex flex-col justify-center items-center text-gray-500/50 h-60 @xl:h-96 font-medium'>
          <p className="text-2xl @xl:text-3xl text-gray-500/20">｡°(っ°´o`°ｃ)°｡</p>
          <p className="@xl:text-lg mt-5 ">텅~ 빈 방명록...</p>
          <p className="@xl:text-lg mt-[-3px] @xl:mt-[-4px]">당신의 따뜻한 한마디가 필요해요!</p>
        </div>
      ) : (
        messages.map((msg) => (
          <div
            key={msg.guestbookId}
            className={`flex items-center bg-[#F5F1FA]/50 rounded-xl @xl:rounded-3xl w-full py-5 gap-8 @xl:gap-11 px-8 @xl:px-12`}>
            {/* 방문객 프로필 */}
            <div className='flex flex-col items-center gap-1.5 @xl:gap-2'>
              <img
                src={msg.profileImage || exProfile}
                alt={`${msg.nickname}의 프로필`}
                className='w-18 @2xl:w-20 rounded-full'
              />
              <p className='text-sm @xl:text-base font-semibold text-[#292929]'>
                {msg.nickname}
              </p>
            </div>

            {/* 방명록 내용 */}
            <div className='flex flex-col flex-1 min-h-[100px] justify-between '>
              {/* 관계 & 삭제 */}
              <div className='flex justify-between items-center w-full mb-2'>
                <p
                  className={`ml-[-2px] @xl:pt-2 rounded-full text-center @xl:px-4 px-2.5 py-1 text-[10px] @xl:text-xs font-semibold @xl:font-semibold text-white inline-block self-start whitespace-nowrap
              ${
                msg.relation === '지나가던_나그네'
                  ? 'bg-[#B5B5B5]'
                  : 'bg-[#FF4A9E]'
              }`}>
                  {`${msg.relation === '지나가던_나그네' ? '지나가던 나그네' : '하우스메이트'}`}
                </p>
                <button 
                  onClick={() => handleDelete(msg.guestbookId)}
                  className='text-[#3E507D] opacity-50 text-[10px] @xl:text-xs font-semibold hover:opacity-100'>
                  삭제
                </button>
              </div>
              {/* 방명록 본문 */}
              <p className='text-xs @xl:text-sm text-[#292929]/70 font-medium mb-1.5 leading-tight '>
                {msg.message}
              </p>

              {/* 작성 일시 */}
              <p className='text-[10px] @xl:text-xs text-[#292929]/30 font-medium'>
              {formatTimeDate(msg.createdAt)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
