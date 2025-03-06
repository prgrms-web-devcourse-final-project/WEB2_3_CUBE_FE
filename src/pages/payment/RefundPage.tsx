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
  const [isRefunding, setIsRefunding] = useState(false);
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
        const filteredHistory = response.data.map(
          (payment: PaymentResponse) => ({
            orderId: payment.paymentKey,
            amount: payment.amount,
            purchasedPoints: payment.earnedPoints,
            createdAt: payment.createdAt,
            status: payment.status,
          }),
        );

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
    if (!selectedPayment || isRefunding) return;

    try {
      setIsRefunding(true);
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
    } finally {
      setIsRefunding(false);
    }
  };

  return (
    <ProfileCardLayout
      // containerClassName='w-[1200px] h-[800px]'
      // backgroundClassName='w-[1200px] h-[800px]'
      className=' overflow-hidden'>
      <div className='w-full h-full overflow-y-auto scrollbar px-4'>
        <h1 className='mb-4 text-[40px] font-bold text-[#162C63] w-full text-center'>
          포인트 환불
        </h1>

        <div className='mb-8'>
          <h3 className='text-lg text-[#162C63] mb-4 w-full text-center'>
            결제 내역 확인 후 환불을 원하는 내역을 선택해 환불을 진행해주세요.
          </h3>
          <ul className='item-row gap-4 w-full'>
            {paymentHistory.map((payment) => (
              <li
                key={payment.orderId}
                className={`p-6 rounded-lg border-2 transition-colors w-full ${
                  payment.status === 'CANCELED'
                    ? 'bg-[#000]/2 border-[#000]/3 cursor-not-allowed'
                    : selectedPayment?.orderId === payment.orderId
                    ? 'bg-[#73A1F7]/10 border-[#2656CD] cursor-pointer'
                    : 'bg-[#95B2EA]/10 border-transparent cursor-pointer'
                }`}
                onClick={() => {
                  if (payment.status !== 'CANCELED') {
                    setSelectedPayment(payment);
                  }
                }}>
                <div className='flex justify-between items-center mb-2'>
                  <span
                    className={`text-xl font-bold ${
                      payment.status === 'CANCELED'
                        ? 'text-gray-500'
                        : 'text-[#2656CD]'
                    }`}>
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
                {payment.status === 'CANCELED' && (
                  <strong className='mt-4 text-gray-800 font-medium text-md w-full text-right inline-block'>
                    환불 완료
                  </strong>
                )}
              </li>
            ))}
          </ul>
        </div>

        {selectedPayment && (
          <div className='mt-8 w-full flex justify-center'>
            <LayeredButton
              theme='red'
              containerClassName='w-fit'
              className='px-20 text-white'
              onClick={handleRefund}
              disabled={isRefunding}>
              {isRefunding ? (
                <div className='flex items-center gap-2'>
                  <div className='w-5 h-5 border-t-2 border-white rounded-full animate-spin' />
                  환불 처리중...
                </div>
              ) : (
                `${selectedPayment.amount.toLocaleString()}원 환불하기`
              )}
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
