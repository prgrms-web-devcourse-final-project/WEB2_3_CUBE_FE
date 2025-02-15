import cd_play_btn from '@/assets/datalist/cd-play-btn.svg';
import book_go_btn from '@/assets/datalist/book-go-btn.svg';
import { Link } from 'react-router-dom';

export default function NoEditStatusItem({
  data,
  isBook,
}: {
  data: DataListInfo;
  isBook: boolean;
}) {
  return (
    <>
      <li
        className={`pl-7 pr-9 py-4.5 flex justify-between items-center  rounded-xl ${
          isBook ? 'bg-[#F1F3FA80]' : 'bg-[#f7f1fa]/50'
        } `}>
        <div className='flex flex-col gap-2'>
          <div
            className={`flex items-center gap-2  ${
              isBook ? 'text-[#3E507D]' : 'text-[#60308C]'
            } `}>
            <span className='text-[18px]'>{data.title}</span>
            <span className='text-[14px]'>{data.singer || data.author}</span>
          </div>

          <div>
            <span
              className={` ${
                isBook ? 'text-[#3E507DB2]' : 'text-[#5F3E7DB2]/70'
              } `}>
              {data.released_year}
            </span>
          </div>
        </div>

        <Link to={`${isBook ? '/book' : '/cd'}`}>
          <img
            className='cursor-pointer'
            src={isBook ? book_go_btn : cd_play_btn}
            alt={`이동하기 버튼`}
          />
        </Link>
      </li>
    </>
  );
}
