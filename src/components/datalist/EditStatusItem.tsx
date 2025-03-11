import classNames from 'classnames';
import check_logo from '@assets/datalist/check-logo.svg';
import { truncateTitle } from '@utils/truncate';

const AUTHOR_MAX_LENGTH = 8;

export default function EditStatusItem({
  data,
  isBook,
  isSelected,
  onSelect,
}: {
  data: DataListInfo;
  isBook: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const mainColor = isBook ? '#2656CD' : '#7838AF';
  const TITLE_MAX_LENGTH = 13;

  return (
    <>
      <li
        onClick={onSelect}
        style={isSelected ? { borderColor: `${mainColor}` } : {}}
        className={classNames(
          `pl-7 pr-9 py-4.5 flex items-center gap-7 cursor-pointer rounded-xl border-2 border-transparent ${
            isBook ? 'bg-[#F1F3FA80]' : 'bg-[#f7f1fa]/50 '
          }`,
        )}>
        <label className='flex relative justify-center items-center w-4 h-4'>
          {/* 체크 박스 */}
          <input
            type='checkbox'
            style={
              isSelected
                ? { backgroundColor: mainColor, borderColor: mainColor }
                : { borderColor: mainColor }
            }
            checked={isSelected}
            onChange={onSelect}
            className={classNames(
              'w-4 h-4 bg-center bg-no-repeat rounded-full border appearance-none cursor-pointer',
            )}
          />
          {isSelected && (
            <img
              className='absolute  w-2.5 h-2.5'
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
            <span className='text-[14px]'>
              {data.artist || truncateTitle(data.author, AUTHOR_MAX_LENGTH)}
            </span>
          </div>

          <div>
            <span
              className={` ${
                isBook ? 'text-[#3E507DB2]' : 'text-[#5F3E7DB2]/70'
              } `}>
              {data.released_year.split('-')[0]}
              {isBook
                ? ` | ${data.publisher}`
                : ` | ${truncateTitle(data.album, 22)}`}
            </span>
          </div>
        </div>
      </li>
    </>
  );
}
