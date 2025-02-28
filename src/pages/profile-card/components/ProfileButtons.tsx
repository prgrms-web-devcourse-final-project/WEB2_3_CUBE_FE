import { useNavigate } from 'react-router-dom';
import LayeredButton from '@components/LayeredButton';
import { housemateAPI } from '@/apis/housemate';
import { useToastStore } from '@/store/useToastStore';

interface ProfileButtonsProps {
  userId: string;
  isMyProfile: boolean;
  isMatched?: boolean;
  onProfileUpdate?: () => void;
}

export const ProfileButtons = ({
  userId,
  isMyProfile,
  isMatched = false,
  onProfileUpdate,
}: ProfileButtonsProps) => {
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  const handleEditProfile = () => {
    navigate(`/profile/${userId}/edit`);
  };

  const handleMateAction = async () => {
    try {
      if (isMatched) {
        await housemateAPI.unfollowHousemate(Number(userId));
        showToast('하우스메이트 취소 완료!', 'success');
      } else {
        await housemateAPI.followHousemate(Number(userId));
        showToast('하우스메이트 추가 완료!', 'success');
      }
      onProfileUpdate?.();
    } catch (error) {
      showToast(
        isMatched
          ? '하우스메이트 취소에 실패했어요.'
          : '하우스메이트 추가에 실패했어요.',
        'error',
      );
    }
  };

  const handleRoomVisit = () => {
    navigate(`/room/${userId}`);
  };

  if (isMyProfile) {
    return (
      <LayeredButton
        theme='purple'
        className='py-1.5 px-8'
        onClick={handleEditProfile}>
        프로필 수정
      </LayeredButton>
    );
  }

  return (
    <div className='gap-10 mt-5 item-middle'>
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
    </div>
  );
};

export default ProfileButtons;
