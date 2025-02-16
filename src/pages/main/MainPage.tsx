import LayeredButton from '@components/LayeredButton';
import { useToastStore } from '@/store/useToastStore';
import { useEffect, useState } from 'react';
import ModalBackground from '@components/ModalBackground';

const MainPage = () => {
  const { showToast } = useToastStore();
  useEffect(() => {
    showToast('메인 페이지입니다.', 'error');
  }, [showToast]);

  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      {isClicked && (
        <ModalBackground onClose={() => setIsClicked(false)}>
          <div className='w-[300px] h-[300px] p-10 bg-amber-400'>
            <h1>모달창</h1>
            <button onClick={() => setIsClicked(false)}>버튼 닫기</button>
          </div>
        </ModalBackground>
      )}
      <div className='h-screen bg-blue-100'>
        <div>MainPage</div>
        <button onClick={() => setIsClicked(true)}>모달창 띄우기</button>
        <LayeredButton
          theme='red'
          className='w-20 h-20'>
          확인
        </LayeredButton>
        <LayeredButton theme='gray'>메이트 취소</LayeredButton>
        <LayeredButton theme='blue'>방 구경하기</LayeredButton>
      </div>
    </>
  );
};

export default MainPage;
