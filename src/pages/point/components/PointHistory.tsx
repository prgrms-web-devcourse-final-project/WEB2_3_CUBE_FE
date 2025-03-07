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
        className='translate-y-10 w-full h-[440px] overflow-y-auto  point-scrollbar
      flex flex-col gap-11'>
        {/* 날짜별 적립, 차감 */}
        {data?.pages.map((page: Points, index: number) => (
          <React.Fragment key={index}>
            {page.history.map((data: FilteredHistory, index: number) => (
              <div
                key={index}
                className='flex flex-col gap-5  '>
                <p className='text-right text-[#162C6399]'>
                  {toKoreanDate(data[0])}
                </p>
                <ul className='flex flex-col gap-6'>
                  {data[1].map((point: PointHistory) => (
                    <li
                      key={point.id}
                      className='flex  items-center  text-[16px] w-full'>
                      <span>{point.type}</span>
                      <span className='ml-30'>{PointReason[point.reason]}</span>
                      <span className='ml-auto text-blue-700'>
                        {point.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </React.Fragment>
        ))}
        {isFetching && <div>불러오는 중...</div>}
        <div
          ref={ref}
          style={{ height: '20px' }}></div>
      </section>
    );
  },
);

export default PointHistory;
