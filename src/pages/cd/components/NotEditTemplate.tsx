import React from 'react';
import writeTemplate from '@/assets/cd/write-template.svg';
export default function NotEditTemplate({
  isEditable,
}: {
  isEditable: () => void;
}) {
  return (
    <>
      <button
        type='button'
        onClick={isEditable}>
        <img
          className='absolute top-6 right-6 w-8 h-8 cursor-pointer hover:opacity-60 '
          src={writeTemplate}
          alt='템플릿 작성 버튼'
        />
      </button>

      <div className='flex flex-col items-center gap-14  overflow-auto h-full pr-3 scrollbar'>
        <div>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래를 듣게 된 계기
          </h3>
          <p className='text-[16px] w-full   drop-shadow-logo '>
            울면서 집에 가는 길에 들린 카페에서 나온 노래 그 이후부터 힘 낼 일이
            필요하면 이 노래를 들어용
          </p>
        </div>

        <div>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래를 듣게 된 계기
          </h3>
          <p className='text-[16px] w-full '>
            울면서 집에 가는 길에 들린 카페에서 나온 노래 그 이후부터 힘 낼 일이
            필요하면 이 노래를 들어용
          </p>
        </div>

        <div>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래를 듣게 된 계기
          </h3>
          <p className='text-[16px] w-full '>
            울면서 집에 가는 길에 들린 카페에서 나온 노래 그 이후부터 힘 낼 일이
            필요하면 이 노래를 들어용
          </p>
        </div>

        <div>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래를 듣게 된 계기
          </h3>
          <p className='text-[16px] w-full '>
            울면서 집에 가는 길에 들린 카페에서 나온 노래 그 이후부터 힘 낼 일이
            필요하면 이 노래를 들어용
          </p>
        </div>
      </div>
    </>
  );
}
