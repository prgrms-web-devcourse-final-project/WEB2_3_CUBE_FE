import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { paymentAPI } from '@apis/payment';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/useUserStore';
import TypingText from '@components/TypingText';
import AlertModal from '@components/AlertModal';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [alert, setAlert] = useState<AlertState>({
    isOpen: false,
    title: '',
    subTitle: '',
    onConfirm: () => {},
  });

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
          setAlert({
            isOpen: true,
            title: '결제 완료',
            subTitle: '결제가 성공적으로 완료되었습니다!',
            onConfirm: () => navigate(`/point/${user.userId}`),
          });
        } catch (error) {
          console.error('결제 검증 실패:', error);
          setAlert({
            isOpen: true,
            title: '결제 실패',
            subTitle: '결제 검증에 실패했습니다.',
            onConfirm: () => navigate('/payment'),
          });
        }
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <TypingText
        text='결제 처리 중...'
        className='text-2xl'
      />
      {alert.isOpen && (
        <AlertModal
          title={alert.title}
          subTitle={alert.subTitle}
          onConfirm={alert.onConfirm}
        />
      )}
    </div>
  );
};

export default PaymentSuccessPage;
