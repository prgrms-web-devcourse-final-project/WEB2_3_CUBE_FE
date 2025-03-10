import { PointReason } from '@constants/point';
import { toKoreanDate } from '@utils/dateFormat';
import React, { forwardRef } from 'react';

interface PointHistoryProps {
  data: { pages: Points[] };
  isFetching: boolean;
}

const PointHistory = forwardRef<HTMLDivElement, PointHistoryProps>(
  ({ data, isFetching }, ref) => {
    console.log(data?.pages);

    return (
      <section
        className='translate-y-5 w-full h-[360px] overflow-y-auto  point-scrollbar 
        border-t-2 border-b-2 border-dashed border-[#B7C7EA] relative
      flex flex-col gap-7 py-3'>
        {/* 날짜별 적립, 차감 */}
        {data?.pages.map((page: Points, index: number) => (
          <React.Fragment key={index}>
            {page.history.map((data: FilteredHistory, index: number) => (
              <div
                key={index}
                className='flex flex-col gap-1'>
                <p className='text-right text-[#162C6399] text-xs'>
                  {toKoreanDate(data[0])}
                </p>
                <ul className='flex flex-col gap-4'>
                  {data[1].map((point: PointHistory) => (
                    <li
                      key={point.id}
                      className='flex items-center font-medium w-full'>
                      <span className='text-sm text-[#3E507D]'>{point.type}</span>
                      <span className='ml-20 text-[#162C63]'>{PointReason[point.reason]}</span>
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
          className='absolute bottom-1 left-0 w-full'>
          {isFetching && <div>내역을 불러오고 있습니다...</div>}
        </div>
      </section>
    );
  },
);

export default PointHistory;
