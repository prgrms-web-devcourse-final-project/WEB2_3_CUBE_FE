import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { paymentAPI } from '@apis/payment';

const PaymentFailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePaymentFail = async () => {
      const orderId = searchParams.get('orderId');
      const message = searchParams.get('message');

      if (orderId) {
        try {
          await paymentAPI.failPayment(orderId);
          alert(`결제 실패: ${message}`);
          navigate('/test'); // 테스트 페이지로 돌아가기
        } catch (error) {
          console.error('결제 실패 처리 오류:', error);
        }
      }
    };

    handlePaymentFail();
  }, [searchParams, navigate]);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>결제 실패</h1>
      <p className='text-gray-600'>결제에 실패했습니다. 다시 시도해주세요.</p>
    </div>
  );
};

export default PaymentFailPage; 