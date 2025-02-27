const HousemateSkeletonItem = () => {
  return (
    <li className='gap-3 item-between animate-pulse'>
      <div
        aria-label='프로필 정보'
        className='gap-2 item-middle'>
        {/* 프로필 이미지 스켈레톤 */}
        <div className='w-10 h-10 bg-gray-200 rounded-full' />
        <div aria-label='닉네임 및 상태'>
          {/* 닉네임 스켈레톤 */}
          <div className='w-20 h-4 mb-1 bg-gray-200 rounded' />
          {/* 상태메시지 스켈레톤 */}
          <div className='w-32 h-3 bg-gray-200 rounded' />
        </div>
      </div>
      {/* 화살표 버튼 스켈레톤 */}
      <div className='w-8 h-8 bg-gray-200 rounded-full' />
    </li>
  );
};

export default HousemateSkeletonItem;
