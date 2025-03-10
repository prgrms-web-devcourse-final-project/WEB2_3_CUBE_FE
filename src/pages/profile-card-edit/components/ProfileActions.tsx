import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayeredButton from '@components/LayeredButton';
import ConfirmModal from '@components/ConfirmModal';
import { profileAPI } from '@/apis/profile';
import { useToastStore } from '@/store/useToastStore';

interface ProfileActionsProps {
  onSubmit: () => void;
  isLoading: boolean;
}

export const ProfileActions = ({
  onSubmit,
  isLoading,
}: ProfileActionsProps) => {
  const navigate = useNavigate();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const { showToast } = useToastStore();

  const handleWithdraw = async () => {
    try {
      await profileAPI.withdraw();
      navigate('/login');
    } catch (error) {
      showToast('회원 탈퇴에 실패했어요. 잠시 후 다시 시도해주세요.', 'error');
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col gap-4 items-center'>
      <LayeredButton
        theme='purple'
        className='py-1.5 px-10'
        onClick={onSubmit}
        disabled={isLoading}>
        {isLoading ? '수정 중...' : '수정 완료'}
      </LayeredButton>
      <button
        className='text-sm text-[#3E507D]/30 mt-2'
        onClick={() => setShowWithdrawModal(true)}>
        회원 탈퇴하기
      </button>

      {showWithdrawModal && (
        <ConfirmModal
          title='회원 탈퇴'
          subTitle='정말 RoomE를 탈퇴하시겠어요? 회원 탈퇴시 지난 모든 활동과 포인트는 복구할 수 없습니다.'
          onClose={() => setShowWithdrawModal(false)}
          onConfirm={handleWithdraw}
        />
      )}
    </div>
  );
};
