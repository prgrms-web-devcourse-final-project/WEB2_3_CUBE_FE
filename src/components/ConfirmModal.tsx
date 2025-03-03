import React from 'react';
import LayeredButton from './LayeredButton';
import ModalBackground from './ModalBackground';

export default function ConfirmModal({
  onClose,
  onConfirm,
  title,
  subTitle,
}: {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  subTitle: string;
}) {
  return (
    <ModalBackground onClose={onClose}>
      <div className=' flex justify-center items-center w-[470px] h-[240px] shrink-0  rounded-3xl border-2 border-[#FCF7FD]   bg-[#FCF7FD]/20 backdrop-blur-2xl modal-shadow'>
        <div className='w-[446px] h-[216px] shrink-0 rounded-2xl bg-[#FCF7FD] flex flex-col items-center justify-center '>
          <h2 className='text-[#162C63] text-2xl mb-2 font-bold'>{title}</h2>
          <h3 className='text-[#162C63B2] text-[16px] mb-9 px-4'>{subTitle}</h3>
          <div className='flex gap-10 items-center'>
            <div onClick={onClose}>
              <LayeredButton
                theme='gray'
                className='py-1.5 px-10'>
                취소
              </LayeredButton>
            </div>

            <div onClick={onConfirm}>
              <LayeredButton
                theme='blue'
                className='py-1.5 px-10'>
                확인
              </LayeredButton>
            </div>
          </div>
        </div>
      </div>
    </ModalBackground>
  );
}
