import { useState, useEffect } from 'react';
import LayeredButton from '@components/LayeredButton';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { paymentAPI } from '@apis/payment';

interface PaymentOption {
  points: number;
  amount: number;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  { points: 100, amount: 1000 },
  { points: 550, amount: 5000 },
  { points: 1200, amount: 10000 },
  { points: 4000, amount: 30000 },
];

const TOSS_CLIENT_KEY = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
// const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY;
const CUSTOMER_KEY = '5bwe_UyPru_naK0XAgYqS'; // 테스트용 임시 키

const TestPage = () => {
  const [selectedOption, setSelectedOption] = useState<PaymentOption | null>(
    null,
  );
  const [paymentWidget, setPaymentWidget] = useState<any>(null);

  useEffect(() => {
    const initializePaymentWidget = async () => {
      const widget = await loadPaymentWidget(TOSS_CLIENT_KEY, CUSTOMER_KEY);
      setPaymentWidget(widget);

      // 결제 금액이 있을 때만 렌더링
      if (selectedOption) {
        await widget.renderPaymentMethods('#payment-widget', {
          value: selectedOption.amount,
        });
        await widget.renderAgreement('#agreement');
      }
    };

    initializePaymentWidget();
  }, [selectedOption]);

  const handlePayment = async () => {
    if (!selectedOption || !paymentWidget) return;

    try {
      // 주문 ID 생성
      const orderId = `order-${Date.now()}`;

      // 결제 전 서버에 주문 정보 저장
      await paymentAPI.requestPayment({
        orderId,
        amount: selectedOption.amount,
        purchasedPoints: selectedOption.points,
      });

      // 결제 요청
      await paymentWidget.requestPayment({
        orderId,
        orderName: `${selectedOption.points} 포인트 충전`,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error('결제 요청 실패:', error);
    }
  };

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>포인트 충전</h1>
      <div className='grid grid-cols-2 gap-4 mb-4'>
        {PAYMENT_OPTIONS.map((option) => (
          <div
            key={option.points}
            className='p-4 rounded border'>
            <h2 className='text-xl font-bold'>{option.points} 포인트</h2>
            <p className='text-gray-600'>{option.amount.toLocaleString()}원</p>
            <LayeredButton
              theme='blue'
              className='mt-2'
              onClick={() => setSelectedOption(option)}>
              선택하기
            </LayeredButton>
          </div>
        ))}
      </div>

      {selectedOption && (
        <div className='mt-8'>
          <div className='p-4 mb-4 rounded-lg border'>
            <div id='payment-widget' />
            <div id='agreement' />
          </div>
          <button
            className='p-4 w-full text-white bg-blue-500 rounded-lg hover:bg-blue-600'
            onClick={handlePayment}>
            {selectedOption.amount.toLocaleString()}원 결제하기
          </button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
