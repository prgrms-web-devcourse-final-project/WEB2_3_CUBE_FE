import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { paymentAPI } from '@apis/payment';
import { useUserStore } from '@/store/useUserStore';

import backgroundIMG from '@/assets/roome-background-img.png';
import oops from '@assets/error/oops.svg';
import doubleArrow from '@/assets/error/double-arrow-icon.svg';

const PaymentFailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useUserStore();
  useEffect(() => {
    const handlePaymentFail = async () => {
      const orderId = searchParams.get('orderId');
      const message = searchParams.get('message');

      if (orderId) {
        try {
          await paymentAPI.canclePayment(orderId);
          alert(`결제 실패: ${message}`);
          navigate('/payment');
        } catch (error) {
          console.error('결제 실패 처리 오류:', error);
        }
      }
    };

    handlePaymentFail();
  }, [searchParams, navigate]);

  return (
    <section
      className='bg-cover bg-center bg-no-repeat h-screen item-middle text-white overflow-hidden'
      style={{ backgroundImage: `url(${backgroundIMG})` }}>
      <div className='item-row gap-10 h-full mt-10'>
        <img
          src={oops}
          alt='oops'
          className='w-80'
        />
        <h1 className='text-center text-xl'>결제에 실패했습니다.</h1>

        <img
          src={doubleArrow}
          alt='double-arrow'
        />
        <Link
          to={`/point/${user.userId}`}
          className='mt-20 text-center text-xl border-b-2 border-white/60 py-2'>
          포인트 내역으로 돌아가기
        </Link>
      </div>
    </section>
  );
};

export default PaymentFailPage;
