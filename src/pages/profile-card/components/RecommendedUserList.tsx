interface RecommendedUserListProps {
  users: RecommendedUser[];
}

const RecommendedUserList = ({ users }: RecommendedUserListProps) => {
  const displayedUsers = users.slice(0, 5);

  return (
    <div className='flex flex-col w-full gap-4 bg-[#F9F4FB] rounded-2xl px-8 py-4'>
      <h3 className='text-[#224DBA] text-lg font-bold text-center'>
        나와 취향이 비슷한 유저
      </h3>

      <ul className='w-full gap-3 item-middle'>
        {displayedUsers.map((user) => (
          <li
            key={user.userId}
            className='flex flex-col items-center w-[80px] h-[100px] py-4 bg-[#FCF7FD] shadow-md rounded-[10px] mb-1 cursor-pointer'>
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
        ))}
      </ul>
    </div>
  );
};

export default RecommendedUserList;
