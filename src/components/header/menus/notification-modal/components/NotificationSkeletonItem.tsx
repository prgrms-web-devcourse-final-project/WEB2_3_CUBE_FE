const NotificationSkeletonItem = () => {
  return (
    <li className='gap-3 item-between'>
      <div className='gap-2 item-middle'>
        <div className='w-10 h-10 rounded-full bg-gray-200 animate-pulse' />
        <div className='flex flex-col gap-1'>
          <div className='w-32 h-4 bg-gray-200 rounded animate-pulse' />
          <div className='w-20 h-3 bg-gray-200 rounded animate-pulse' />
        </div>
      </div>
    </li>
  );
};

export default NotificationSkeletonItem;
