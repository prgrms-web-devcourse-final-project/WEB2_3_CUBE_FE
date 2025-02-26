import LayeredButton from '@components/LayeredButton';

const ProfileButtons = ({
  isMyProfile,
  onMateButtonClick,
  onRoomButtonClick,
}: ProfileButtonsProps) => {
  return (
    <div className='gap-10 mt-5 item-middle'>
      {isMyProfile ? (
        <LayeredButton
          theme='purple'
          className='py-1.5 px-8'
          onClick={onMateButtonClick}>
          프로필 수정
        </LayeredButton>
      ) : (
        <LayeredButton
          theme={isMyProfile ? 'gray' : 'red'}
          className='py-1.5 px-8'
          onClick={onMateButtonClick}>
          메이트 {isMyProfile ? '취소' : '맺기'}
        </LayeredButton>
      )}
      <LayeredButton
        theme='blue'
        className='py-1.5 px-8'
        onClick={onRoomButtonClick}>
        방 구경하기
      </LayeredButton>
    </div>
  );
};

export default ProfileButtons;
