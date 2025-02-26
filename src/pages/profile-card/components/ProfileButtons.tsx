import LayeredButton from '@components/LayeredButton';
import { ProfileButtonsProps } from './types';

const ProfileButtons = ({
  isMyProfile,
  onMateButtonClick,
  onRoomButtonClick,
}: ProfileButtonsProps) => {
  return (
    <div className='gap-10 mt-5 item-middle'>
      {isMyProfile ? (
        <LayeredButton
          theme='gray'
          className='py-1.5'
          onClick={onMateButtonClick}>
          프로필 수정
        </LayeredButton>
      ) : (
        <LayeredButton
          theme='gray'
          className='py-1.5'
          onClick={onMateButtonClick}>
          메이트 {isMyProfile ? '취소' : '추가'}
        </LayeredButton>
      )}
      <LayeredButton
        theme='blue'
        className='py-1.5'
        onClick={onRoomButtonClick}>
        방 구경하기
      </LayeredButton>
    </div>
  );
};

export default ProfileButtons;
