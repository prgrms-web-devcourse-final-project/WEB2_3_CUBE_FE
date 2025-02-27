import { useNavigate } from 'react-router-dom';
import LayeredButton from '@components/LayeredButton';
import { housemateAPI } from '@apis/housemate';

interface ProfileButtonsProps {
  userId: string;
  isMyProfile: boolean;
  isMatched?: boolean;
  onProfileUpdate?: () => void;
}

const ProfileButtons = ({
  userId,
  isMyProfile,
  isMatched = false,
  onProfileUpdate,
}: ProfileButtonsProps) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate(`/profile/${userId}/edit`);
  };

  const handleMateAction = async () => {
    try {
      if (isMatched) {
        await housemateAPI.unfollowHousemate(Number(userId));
      } else {
        await housemateAPI.followHousemate(Number(userId));
      }
      // 프로필 정보 업데이트를 부모 컴포넌트에 알림
      onProfileUpdate?.();
    } catch (error) {
      console.error('메이트 상태 변경 실패:', error);
    }
  };

  const handleRoomVisit = () => {
    navigate(`/room/${userId}`);
  };

  return (
    <div className='gap-10 mt-5 item-middle'>
      {isMyProfile ? (
        <LayeredButton
          theme='purple'
          className='py-1.5 px-8'
          onClick={handleEditProfile}>
          프로필 수정
        </LayeredButton>
      ) : (
        <>
          <LayeredButton
            theme={isMatched ? 'gray' : 'red'}
            className='py-1.5 px-8'
            onClick={handleMateAction}>
            메이트 {isMatched ? '취소' : '맺기'}
          </LayeredButton>
          <LayeredButton
            theme='blue'
            className='py-1.5 px-8'
            onClick={handleRoomVisit}>
            방 구경하기
          </LayeredButton>
        </>
      )}
    </div>
  );
};

export default ProfileButtons;
