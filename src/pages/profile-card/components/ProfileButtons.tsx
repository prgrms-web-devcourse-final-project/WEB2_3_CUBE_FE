import { useNavigate } from 'react-router-dom';
import LayeredButton from '@components/LayeredButton';
import { housemateAPI } from '@/apis/housemate';
import { useToastStore } from '@/store/useToastStore';
import { AxiosError } from 'axios';

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
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message;

        if (errorMessage) {
          showToast(errorMessage, 'error');
        } else {
          switch (status) {
            case 400:
              showToast('유효하지 않은 사용자입니다.', 'error');
              break;
            case 404:
              showToast('존재하지 않는 사용자입니다.', 'error');
              break;
            case 409:
              showToast('이미 하우스메이트로 추가된 사용자입니다.', 'error');
              break;
            default:
              showToast(
                isMatched
                  ? '하우스메이트 취소에 실패했어요.'
                  : '하우스메이트 추가에 실패했어요.',
                'error',
              );
          }
        }
      } else {
        showToast(
          isMatched
            ? '하우스메이트 취소에 실패했어요.'
            : '하우스메이트 추가에 실패했어요.',
          'error',
        );
      }
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
        containerClassName='w-fit'
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
        containerClassName='w-fit'
        onClick={handleMateAction}>
        메이트 {isMatched ? '취소' : '맺기'}
      </LayeredButton>
      <LayeredButton
        theme='blue'
        className='py-1.5 px-8'
        containerClassName='w-fit'
        onClick={handleRoomVisit}>
        방 구경하기
      </LayeredButton>
    </div>
  );
};

export default ProfileButtons;
