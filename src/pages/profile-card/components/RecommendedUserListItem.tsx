import { useNavigate } from 'react-router-dom';

interface RecommendedUserListItemProps {
  user: RecommendedUser;
}

const RecommendedUserListItem = ({ user }: RecommendedUserListItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${user.userId}`);
  };

  return (
    <li
      onClick={handleClick}
      className='flex flex-col items-center w-[80px] h-[100px] py-4 bg-[#FCF7FD] shadow-md rounded-[10px] mb-1 cursor-pointer hover:bg-[#FCF7FD]/80 transition-colors'>
      <div className='w-10 h-10 mb-2 shrink-0'>
        <img
          src={user.profileImage}
          alt={`${user.nickname}님의 프로필`}
          className='w-full h-full rounded-full bg-[#E8F0FE] object-cover'
        />
      </div>
      <span className='text-sm text-[#3E507D] text-center w-full px-2 truncate font-semibold'>
        {user.nickname}
      </span>
    </li>
  );
};

export default RecommendedUserListItem;
