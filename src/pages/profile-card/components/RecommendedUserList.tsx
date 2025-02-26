import RecommendedUserListItem from './RecommendedUserListItem';

interface RecommendedUserListProps {
  users: RecommendedUser[];
}

const RecommendedUserList = ({ users }: RecommendedUserListProps) => {

  return (
    <div className='flex flex-col w-full gap-4 bg-[#F9F4FB] rounded-2xl px-8 py-4'>
      <h3 className='text-[#224DBA] text-lg font-bold text-center'>
        나와 취향이 비슷한 유저
      </h3>

      <ul className='w-full gap-3 item-middle'>
        {users.map((user) => (
          <RecommendedUserListItem
            key={user.userId}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
};

export default RecommendedUserList;
