import LayeredButton from '@components/LayeredButton';
import { useToastStore } from '@/store/useToastStore';
import { useEffect } from 'react';

const MainPage = () => {
  const { showToast } = useToastStore();
  useEffect(() => {
    showToast('메인 페이지입니다.', 'error');
  }
  , [showToast]);
  return (
    <div className='h-screen bg-blue-100'>
      <div>MainPage</div>
      <LayeredButton theme='red' className='w-20 h-20'>확인</LayeredButton>
      <LayeredButton theme='gray'>메이트 취소</LayeredButton>
      <LayeredButton theme='blue'>방 구경하기</LayeredButton>
    </div>
  );
};

export default MainPage;
