import receipt from '@assets/point/receipt.svg';
import LayeredButton from '@components/LayeredButton';
import { motion } from 'framer-motion';

export default function PointPage() {
  return (
    <div className='w-full h-screen main-background'>
      {/* 메인 배경 */}
      <motion.div
        initial={{ y: '100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100vh', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 130, damping: 18 }}
        className='fixed inset-0 z-10 flex items-center justify-center'>
        {/* 영수증 */}
        <div className=' relative w-[501px] h-[760px]'>
          <img
            src={receipt}
            className=' inset-0 w-full h-full m-auto block text-center'
            alt='포인트 내역 영수증 '
          />
          <h1 className='absolute top-10 left-38 text-[#3E507D] text-[30px] font-bold'>
            Point Receipt
          </h1>

          {/* 보여줄 포인트 내역 */}
          <section className='absolute inset-0 w-full h-full overflow-auto pt-28 pl-13   pr-16'>
            {/* 날짜별 적립, 차감 */}
            <div className='flex flex-col gap-5 py-6 '>
              <p className='text-right text-[#162C6399]'>2025.03.03.</p>
              <ul className='flex flex-col gap-6'>
                <li className='flex  items-center  text-[16px] w-full'>
                  <span>적립</span>
                  <span className='ml-30'>출석체크</span>
                  <span className='ml-auto text-blue-700'>+400P</span>
                </li>
                <li className='flex items-center  text-[16px]'>
                  <span>차감</span>
                  <span className='ml-30'>댓글삭제</span>
                  <span className='ml-auto'>-20P</span>
                </li>
              </ul>
            </div>

            <div className='flex flex-col gap-5 py-6 '>
              <p className='text-right text-[#162C6399]'>2025.03.02.</p>
              <ul className='flex flex-col gap-6'>
                <li className='flex  items-center  text-[16px] w-full'>
                  <span>적립</span>
                  <span className='ml-30'>출석체크</span>
                  <span className='ml-auto text-blue-700'>+200P</span>
                </li>
                <li className='flex items-center  text-[16px]'>
                  <span>차감</span>
                  <span className='ml-30'>댓글삭제</span>
                  <span className='ml-auto'>-50P</span>
                </li>
              </ul>
            </div>
          </section>

          <p className='absolute bottom-33 left-12 text-[#162C63] text-[16px]'>
            포인트 잔고
          </p>

          {/* 포인트 */}
          <p className='absolute bottom-33 right-17 text-[#162C63] text-[16px]'>
            400p
          </p>
          {/* 충전 버튼 */}
          <div className='absolute bottom-13 left-1/2 -translate-x-1/2'>
            <LayeredButton
              theme='blue'
              className=' text-[18px] font-bold w-[202px] h-[50px]'>
              포인트 충전하기
            </LayeredButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
