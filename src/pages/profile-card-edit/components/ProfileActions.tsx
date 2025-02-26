import LayeredButton from '@components/LayeredButton';

interface ProfileActionsProps {
  onSubmit: () => void;
  isLoading: boolean;
}

export const ProfileActions = ({
  onSubmit,
  isLoading,
}: ProfileActionsProps) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <LayeredButton
        theme='purple'
        className='py-1.5 px-10'
        onClick={onSubmit}
        disabled={isLoading}>
        {isLoading ? '수정 중...' : '수정 완료'}
      </LayeredButton>
      <button className='text-sm text-[#3E507D]/30 mt-2'>회원 탈퇴하기</button>
    </div>
  );
};
