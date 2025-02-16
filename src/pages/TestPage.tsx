import AlertModal from '@components/AlertModal';
import ConfirmModal from '@components/ConfirmModal';
import React, { useState } from 'react';

export default function TestPage() {
  const [isClicked, setIsClicked] = useState(false);

  const handleConfirm = () => {
    console.log('어떤 이벤트 처리 완료~~');
    setIsClicked(false);
  };
  return (
    <>
      <div>TestPage</div>
      <button onClick={() => setIsClicked(true)}>모달창 띄우기</button>
      {isClicked && (
        // <ConfirmModal
        //   title='정말 이대로 떠나시겠어요? 🥺'
        //   subTitle='지금 아니면 다시 되돌릴 수 없어요!'
        //   onConfirm={handleConfirm}
        //   onClose={() => setIsClicked(false)}
        // />
        <AlertModal
          onConfirm={handleConfirm}
          title='정말 이대로 떠나시겠어요? 🥺'
          subTitle='지금 아니면 다시 되돌릴 수 없어요!'
        />
      )}
    </>
  );
}
