import { useUserStore } from '@/store/useUserStore';
import { useParams } from 'react-router-dom';
import writeTemplate from '@/assets/cd/write-template.svg';
import logoOpacity from '@assets/cd/logo-opacity.png';

export default function EmptyTemplate({ questions, onToggleEdit }) {
  const userId = Number(useParams().userId) || 0;
  // 방주인이 아니면 템플릿 작성 버튼은 있을 수 없음
  const user = useUserStore((state) => state.user);

  const myUserId = user.userId;

  return userId !== myUserId ? (
    <div className='flex flex-col items-center justify-center gap-3.5'>
      <img
        className='w-[200px] h-[68px] '
        src={logoOpacity}
        alt='투명도 적용된 로고'
      />
      <span className='text-white font-semibold text-[16px]'>
        아직 작성되지 않은 템플릿입니다.
      </span>
    </div>
  ) : (
    <div className='overflow-hidden h-full w-[90%] pt-15 pb-10 '>
      <button
        type='button'
        onClick={onToggleEdit}>
        <img
          className='absolute top-5 right-5 w-8 h-8  cursor-pointer hover:opacity-60 '
          src={writeTemplate}
          alt='템플릿 작성 버튼'
        />
      </button>
      <section className='flex flex-col justify-around items-center gap-14  overflow-auto h-full   scrollbar scrollbar-white'>
        {questions.map((q, index: number) => (
          <article
            key={index}
            className='w-full'>
            <h3 className=' text-base  lg:text-lg  2xl:text-xl min-w-[200px]  font-bold border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
              {q.question}
            </h3>
            <p className=' text-base  lg:text-lg  2xl:text-xl w-full   drop-shadow-logo '>
              {q.answer}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
