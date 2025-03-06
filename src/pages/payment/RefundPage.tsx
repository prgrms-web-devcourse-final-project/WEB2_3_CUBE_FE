import { useState, useEffect } from 'react';
import LayeredButton from '@components/LayeredButton';
import { paymentAPI } from '@apis/payment';
import { ProfileCardLayout } from '@pages/profile-card/components/ProfileCardLayout';
import { useNavigate } from 'react-router-dom';
import AlertModal from '@components/AlertModal';
import { useUserStore } from '@/store/useUserStore';

const RefundPage = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [selectedPayment, setSelectedPayment] = useState<PaymentHistory | null>(
    null,
  );
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [alert, setAlert] = useState<AlertState>({
    isOpen: false,
    title: '',
    subTitle: '',
    onConfirm: () => {},
  });

  // 결제 내역 조회
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await paymentAPI.getPaymentHistory({ page, size });
        console.log('Payment history response:', response.data); // 디버깅을 위한 로그 추가
        const filteredHistory = response.data.map(
          (payment: PaymentResponse) => ({
            orderId: payment.paymentKey,
            amount: payment.amount,
            purchasedPoints: payment.earnedPoints,
            createdAt: payment.createdAt,
          }),
        );
        console.log('Filtered history:', filteredHistory); // 디버깅을 위한 로그 추가
        setPaymentHistory(filteredHistory);
      } catch (error) {
        console.error('결제 내역 조회 실패:', error);
        setAlert({
          isOpen: true,
          title: '조회 실패',
          subTitle: '결제 내역을 불러오는데 실패했습니다.',
          onConfirm: () => navigate(`/point/${user.userId}`),
        });
      }
    };

    fetchPaymentHistory();
  }, [navigate, user.userId, page, size]);

  const handleRefund = async () => {
    if (!selectedPayment) return;

    try {
      await paymentAPI.cancelPayment(
        selectedPayment.orderId,
        '전액 취소',
        selectedPayment.amount,
      );

      setAlert({
        isOpen: true,
        title: '환불 신청 완료',
        subTitle: '환불이 정상적으로 처리되었습니다.',
        onConfirm: () => navigate(`/point/${user.userId}`),
      });
    } catch (error) {
      console.error('환불 요청 실패:', error);
      setAlert({
        isOpen: true,
        title: '환불 신청 실패',
        subTitle: error.response.data.message,
        onConfirm: () => setAlert((prev) => ({ ...prev, isOpen: false })),
      });
    }
  };

  return (
    <ProfileCardLayout
      containerClassName='w-[1200px] h-[800px]'
      backgroundClassName='w-[1200px] h-[800px]'
      className='w-[1200px] h-[800px] overflow-hidden'>
      <div className='w-full h-full overflow-y-auto scrollbar'>
        <h1 className='mb-4 text-[40px] font-bold text-[#162C63]'>
          포인트 환불
        </h1>

        <div className='mb-8'>
          <h2 className='text-xl font-bold text-[#162C63] mb-4'>
            환불 가능한 결제 내역
          </h2>
          <ul className='grid grid-cols-2 gap-4 w-full'>
            {paymentHistory.map((payment) => (
              <li
                key={payment.orderId}
                className={`p-6 rounded-lg border-2 transition-colors cursor-pointer ${
                  selectedPayment?.orderId === payment.orderId
                    ? 'bg-[#73A1F7]/10 border-[#2656CD]'
                    : 'bg-[#95B2EA]/10 border-transparent'
                }`}
                onClick={() => setSelectedPayment(payment)}>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-xl font-bold text-[#2656CD]'>
                    {payment.purchasedPoints}P
                  </span>
                  <span className='text-gray-600 font-semibold'>
                    {payment.amount.toLocaleString()}원
                  </span>
                </div>
                <div className='text-sm text-gray-500'>
                  <div>주문번호: {payment.orderId}</div>
                  <div>
                    결제일: {new Date(payment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {selectedPayment && (
          <div className='mt-8 w-full flex justify-center'>
            <LayeredButton
              theme='gray'
              containerClassName='w-fit'
              className='px-40 text-white'
              onClick={handleRefund}>
              {selectedPayment.amount.toLocaleString()}원 환불하기
            </LayeredButton>
          </div>
        )}
      </div>
      {alert.isOpen && (
        <AlertModal
          title={alert.title}
          subTitle={alert.subTitle}
          onConfirm={alert.onConfirm}
        />
      )}
    </ProfileCardLayout>
  );
};

export default RefundPage;
