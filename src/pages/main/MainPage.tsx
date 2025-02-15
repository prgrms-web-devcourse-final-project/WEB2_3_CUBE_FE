import LayeredButton from '@components/LayeredButton';

const MainPage = () => {
  return (
    <>
      <div>MainPage</div>
      <LayeredButton theme='red' className='w-20 h-20'>확인</LayeredButton>
      <LayeredButton theme='gray'>메이트 취소</LayeredButton>
      <LayeredButton theme='blue'>방 구경하기</LayeredButton>
    </>
  );
};

export default MainPage;
