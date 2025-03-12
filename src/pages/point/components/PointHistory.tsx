import { PointReason } from '@constants/point';
import { toKoreanDate } from '@utils/dateFormat';
import React, { forwardRef } from 'react';

interface PointHistoryProps {
  data: { pages: Points[] };
  isFetching: boolean;
}

const PointHistory = forwardRef<HTMLDivElement, PointHistoryProps>(
  ({ data, isFetching }, ref) => {
    return (
      <section
        className='translate-y-5 w-[70%] h-[480px] overflow-y-auto  scrollbar   
        border-t-2 border-b-2 border-dashed border-[#B7C7EA] 
      flex flex-col gap-7  pt-6 pr-2'>
        {/* 날짜별 적립, 차감 */}
        {data?.pages.map((page: Points, index: number) => (
          <React.Fragment key={index}>
            {page.history.map((data: FilteredHistory, index: number) => (
              <div
                key={index}
                className='flex flex-col gap-1'>
                <p className='text-right text-[#162C6399] text-xs'>
                  {toKoreanDate(data.date)}
                </p>
                <ul className='flex flex-col gap-4'>
                  {data.items.map((point: PointHistory) => (
                    <li
                      key={point.id}
                      className='flex items-center font-medium w-full  '>
                      <span className='text-sm text-[#3E507D]'>
                        {point.type}
                      </span>
                      <span className='ml-30 text-[#162C63]'>
                        {PointReason[point.reason]}
                      </span>
                      <span
                        className={`ml-auto ${
                          point.type === '적립'
                            ? 'text-[#2C5FBDCC]'
                            : 'text-[#D8297BCC]'
                        }`}>
                        {point.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </React.Fragment>
        ))}
        <div
          ref={ref}
          className='w-full flex justify-center items-center'>
          {isFetching && (
            <div role='status'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
        </div>
      </section>
    );
  },
);

export default PointHistory;
