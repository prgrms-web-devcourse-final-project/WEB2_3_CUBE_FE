import React from 'react';
import writeTemplate from '@/assets/cd/write-template.svg';
import { useParams } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';

export default function NotEmptyTemplate() {
  const userId = Number(useParams().userId) || 0;
  // 방주인이 아니면 템플릿 작성 버튼은 있을 수 없음
  const user = useUserStore((state) => state.user);

  const myUserId = user.userId;

  const questions = [
    { question: '이 노래를 듣게 된 계기', answer: templateData?.comment1 },
    {
      question: '이 노래에서 가장 좋았던 부분',
      answer: templateData?.comment2,
    },
    { question: '이 노래를 듣는 지금의 감정', answer: templateData?.comment3 },
    {
      question: '어떨 때 자주 듣는 노래인가요?',
      answer: templateData?.comment4,
    },
  ];

  return (
    <>
      {userId === myUserId && (
        <button
          type='button'
          onClick={onToggleEdit}>
          <img
            className='absolute top-6 right-6 w-8 h-8  cursor-pointer hover:opacity-60 '
            src={writeTemplate}
            alt='템플릿 작성 버튼'
          />
        </button>
      )}
      {userId === myUserId && (
        <>
          <button
            onClick={onToggleEdit}
            className=' absolute top-4 right-20 2xl:right-24 rounded-[10px]  text-[10px] 2xl:text-[12px] font-semibold
     bg-white text-[#162C63]  2xl:px-6 2xl:py-2.5  px-4 py-1.5  hover:opacity-80'>
            수정
          </button>

          <button
            type='button'
            onClick={handleDeleteTemplate}
            className='absolute top-4 right-4 rounded-[10px] text-[10px] 2xl:text-[12px] font-semibold
     bg-white text-[#162C63]   2xl:px-6 2xl:py-2.5  px-4 py-1.5 hover:opacity-80'>
            삭제
          </button>
        </>
      )}

      <section className='flex flex-col justify-around items-center gap-14  overflow-auto h-full pr-3 scrollbar'>
        {questions.map((q, index) => (
          <article
            key={index}
            className='w-full '>
            <h3 className=' text-[16px]  lg:text-[20px]  2xl:text-2xl min-w-[200px]  font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
              {q.question}
            </h3>
            <p className='text-[14px] 2xl:text-[16px] w-full   drop-shadow-logo  '>
              {templateData ? q.answer : ''}
            </p>
          </article>
        ))}
      </section>
    </>
  );
}
