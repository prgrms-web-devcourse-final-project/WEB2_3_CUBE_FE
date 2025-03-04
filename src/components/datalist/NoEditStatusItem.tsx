import cd_play_btn from '@/assets/datalist/cd-play-btn.svg';
import book_go_btn from '@/assets/datalist/book-go-btn.svg';
import { Link } from 'react-router-dom';
import { truncateTitle } from '@/utils/truncate';
import { useUserStore } from '@/store/useUserStore';

const AUTHOR_MAX_LENGTH = 8;

export default function NoEditStatusItem({
  data,
  isBook,
  userId,
}: {
  data: DataListInfo;
  isBook: boolean;
  userId: number;
}) {
  const { user } = useUserStore();
  const TITLE_MAX_LENGTH = 12;
  const getBookPath = () => {
    // 현재 로그인한 유저의 ID와 전달받은 userId가 같으면 내 서평
    if (user.userId === userId) {
      return `/book/${data.id}`;
    }
    // 다른 사람의 서평
    return `/book/${data.id}/user/${userId}`;
  };
  return (
    <li
      className={`pl-7 pr-4 py-4.5 flex justify-between items-center   rounded-xl ${
        isBook ? 'bg-[#F1F3FA80]' : 'bg-[#f7f1fa]/50'
      } `}>
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
            } trunc`}>
            {data.released_year.split('-')[0]}
            {isBook
              ? ` | ${data.publisher}`
              : ` | ${truncateTitle(data.album, TITLE_MAX_LENGTH)}`}
          </span>
        </div>
      </div>
      <Link
        to={isBook ? getBookPath() : `/cd/${data.id}/user/${userId}`}
        className='hover:translate-x-1 all-200-eio'>
        <img
          className='cursor-pointer'
          src={isBook ? book_go_btn : cd_play_btn}
          alt={`이동하기 버튼`}
        />
      </Link>
    </li>
  );
}
