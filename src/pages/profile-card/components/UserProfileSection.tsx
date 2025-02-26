interface UserProfileSectionProps {
  profile: Pick<UserProfile, 'nickname' | 'profileImage' | 'bio'>;
}

const UserProfileSection = ({ profile }: UserProfileSectionProps) => {
  const { nickname, profileImage, bio } = profile;

  return (
    <div
      aria-label='사용자 프로필'
      className='flex flex-col items-center'>
      <img
        src={profileImage}
        alt='사용자 프로필'
        className='rounded-full h-25 w-25'
      />
      <h2 className='text-2xl font-bold text-[#3E507D] mt-2'>{nickname}</h2>
      <p className='text-sm font-medium text-[#AFAFAF]'>{bio}</p>
    </div>
  );
};

export default UserProfileSection;
