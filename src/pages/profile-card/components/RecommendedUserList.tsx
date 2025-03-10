import RecommendedUserListItem from './RecommendedUserListItem';

interface RecommendedUserListProps {
  users: RecommendedUser[];
}

const RecommendedUserList = ({ users }: RecommendedUserListProps) => {
  return (
    <div className='flex flex-col w-full gap-4 bg-[#FDFCFE] rounded-2xl px-8 py-4'>
      <h3 className='text-[#224DBA] text-lg font-bold text-center'>
        취향이 비슷한 유저
      </h3>
      <ul className='w-full gap-3 item-middle'>
        {users.length > 0 ? (
          users.map((user) => (
            <RecommendedUserListItem
              key={user.userId}
              user={user}
            />
          ))
        ) : (
          <li className='text-sm text-[#3E507D] text-center py-4'>
            취향이 비슷한 유저를 분석하는 중 ૮꒰ ⸝⸝´ ˘ ` ⸝⸝꒱ა
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecommendedUserList;
