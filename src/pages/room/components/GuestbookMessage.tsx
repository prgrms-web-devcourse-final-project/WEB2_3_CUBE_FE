interface Message {
  guestbookId: number;
  userId: number;
  nickname: string;
  profileImage: string;
  message: string;
  createdAt: string;
  relation: string;
}

interface GuestbookMessageProps {
  messages: Message[];
}

export default function GuestbookMessage({ messages }: GuestbookMessageProps) {
  return (
    <div className='@container w-full flex flex-col gap-4 2xl:mt-8 mt-6 2xl:mb-8 mb-4 max-h-80 '>
      {messages.map((msg) => (
        <div
          key={msg.guestbookId}
          className={`flex items-center bg-[#F5F1FA]/50 rounded-xl @xl:rounded-3xl w-full py-5 gap-8 @xl:gap-11 px-8 @xl:px-12`}>
          {/* 방문객 프로필 */}
          <div className='flex flex-col items-center gap-1.5 @xl:gap-2'>
            <img
              src={msg.profileImage}
              alt={`${msg.nickname}의 프로필`}
              className='w-13 2xl:w-20 rounded-full'
            />
            <p className='text-sm @xl:text-base font-semibold text-[#292929]'>
              {msg.nickname}
            </p>
          </div>

          {/* 방명록 내용 */}
          <div className='flex flex-col flex-1'>
            {/* 관계 & 삭제 */}
            <div className='flex justify-between items-center w-full mb-2'>
              <p
                className={`ml-[-2px] rounded-full text-center @xl:px-4 px-2.5 py-1 text-[10px] @xl:text-xs font-semibold @xl:font-bold text-white inline-block self-start whitespace-nowrap
              ${
                msg.relation === '지나가던 나그네'
                  ? 'bg-[#B5B5B5]'
                  : 'bg-[#FF4A9E]'
              }`}>
                {msg.relation}
              </p>
              <button className='text-[#3E507D] opacity-50 text-[10px] @xl:text-xs font-semibold hover:opacity-100'>
                삭제
              </button>
            </div>
            {/* 방명록 본문 */}
            <p className='text-xs @xl:text-sm text-[#292929]/70 font-medium mb-1.5 leading-tight '>
              {msg.message}
            </p>

            {/* 작성 일시 */}
            <p className='text-[10px] @xl:text-xs text-[#292929]/30 font-medium'>
              {new Date(msg.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              }).replace(/(\d{4})\. (\d{2})\. (\d{2})\./, '$1. $2. $3')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
