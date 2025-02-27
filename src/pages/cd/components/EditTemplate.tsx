import React from 'react';
import writeTemplate from '@/assets/cd/write-template.svg';
export default function EditTemplate({
  isEditable,
}: {
  isEditable: () => void;
}) {
  return (
    <>
      <button
        type='button'
        onClick={isEditable}
        className='absolute top-4 right-4 rounded-[10px] text-[12px] font-semibold bg-white text-[#162C63] drop-shadow-logo px-6 py-2.5'>
        저장
      </button>

      <div className='flex flex-col gap-14 overflow-auto h-full pr-3 scrollbar'>
        <div>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5  '>
            이 노래를 듣게 된 계기
          </h3>
          <textarea
            defaultValue='  울면서 집에 가는 길에 들린 카페에서 나온 노래 그 이후부터 힘 낼 일이 필요하면 이 노래를 들어용'
            className='text-[16px] w-full h-[120px] resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
          />
        </div>

        <div>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래를 듣게 된 계기
          </h3>
          <textarea
            defaultValue='  울면서 집에 가는 길에 들린 카페에서 나온 노래 그 이후부터 힘 낼 일이 필요하면 이 노래를 들어용'
            className='text-[16px] w-full h-[120px] resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
          />
        </div>

        <div>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래를 듣게 된 계기
          </h3>
          <textarea
            defaultValue='  울면서 집에 가는 길에 들린 카페에서 나온 노래 그 이후부터 힘 낼 일이 필요하면 이 노래를 들어용'
            className='text-[16px] w-full h-[120px] resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
          />
        </div>

        <div>
          <h3 className='text-2xl font-bol border-b-2 border-[#FFFFFF33] pb-4 mb-5 '>
            이 노래를 듣게 된 계기
          </h3>
          <textarea
            defaultValue='  울면서 집에 가는 길에 들린 카페에서 나온 노래 그 이후부터 힘 낼 일이 필요하면 이 노래를 들어용'
            className='text-[16px] w-full h-[120px] resize-none rounded-[14px] bg-[#EDE6EE4D] 
            drop-shadow-logo border-2 border-white outline-0 px-5 py-4  '
          />
        </div>
      </div>
    </>
  );
}
