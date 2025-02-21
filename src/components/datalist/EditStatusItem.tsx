import classNames from 'classnames';
import { useState } from 'react';
import check_logo from '@assets/datalist/check-logo.svg';
import { truncateTitle } from '@utils/truncate';

export default function EditStatusItem({
  data,
  isBook,
}: {
  data: DataListInfo;
  isBook: boolean;
}) {
  const mainColor = isBook ? '#2656CD' : '#7838AF';
  const [isChecked, setIsChecked] = useState(false);
  const TITLE_MAX_LENGTH = 13;

  return (
    <>
      <li
        onClick={() => setIsChecked(!isChecked)}
        style={isChecked ? { borderColor: `${mainColor}` } : {}}
        className={classNames(
          `pl-7 pr-9 py-4.5 flex items-center gap-7  cursor-pointer rounded-xl border-2 border-transparent ${
            isBook ? 'bg-[#F1F3FA80]' : 'bg-[#f7f1fa]/50 '
          }`,
        )}>
        <label className='relative flex items-center justify-center w-4 h-4'>
          {/* 체크 박스 */}
          <input
            type='checkbox'
            style={isChecked ? { backgroundColor: mainColor } : {}}
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className={classNames(
              'appearance-none w-4 h-4 rounded-full bg-no-repeat bg-center border cursor-pointer',
            )}
          />
          {isChecked && (
            <img
              className='absolute  w-2.5 h-2.5  '
              src={check_logo}
            />
          )}
        </label>

        <div className='flex flex-col gap-2'>
          <div
            className={`flex items-center gap-2  ${
              isBook ? 'text-[#3E507D]' : 'text-[#60308C]'
            } `}>
            <h4 className='text-[18px] font-semibold truncate'>
              {truncateTitle(data.title, TITLE_MAX_LENGTH)}
            </h4>
            <span className='text-[14px]'>{data.artist || data.author}</span>
          </div>

          <div>
            <span
              className={` ${
                isBook ? 'text-[#3E507DB2]' : 'text-[#5F3E7DB2]/70'
              } `}>
              {data.released_year}
              {isBook ? ` | ${data.publisher}` : ''}
            </span>
          </div>
        </div>
      </li>
    </>
  );
}
