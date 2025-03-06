import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { paymentAPI } from '@apis/payment';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    const verifyPayment = async () => {
      const paymentKey = searchParams.get('paymentKey');
      const orderId = searchParams.get('orderId');
      const amount = searchParams.get('amount');

      if (paymentKey && orderId && amount) {
        try {
          await paymentAPI.verifyPayment({
            paymentKey,
            orderId,
            amount: Number(amount),
          });
          alert('결제가 완료되었습니다!');
          navigate(`/point/${user.userId}`);
        } catch (error) {
          console.error('결제 검증 실패:', error);
          alert('결제 검증에 실패했습니다.');
        }
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div>
      <h1>결제 처리 중...</h1>
    </div>
  );
};

export default PaymentSuccessPage; 