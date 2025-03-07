import { useState, useEffect } from 'react';
import LayeredButton from '@components/LayeredButton';
import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { paymentAPI } from '@apis/payment';
import { ProfileCardLayout } from '@pages/profile-card/components/ProfileCardLayout';
import PaymentOptionCard from './components/PaymentOptionCard';

const PAYMENT_OPTIONS: PaymentOption[] = [
  { points: 100, amount: 1000 },
  { points: 550, amount: 5000 },
  { points: 1200, amount: 10000 },
  { points: 4000, amount: 30000 },
];

const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY;
const CUSTOMER_KEY = import.meta.env.VITE_TOSS_CUSTOMER_KEY;

const PaymentPage = () => {
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
    <ProfileCardLayout
      containerClassName='w-[1200px] h-[800px]'
      backgroundClassName='w-[1200px] h-[800px]'
      className='w-[1200px] h-[800px] overflow-y-auto scrollbar'>
      <h1 className='mb-4 text-[40px] font-bold text-[#162C63]'>포인트 충전</h1>

      <ul className='flex gap-4 mb-4 w-full'>
        {PAYMENT_OPTIONS.map((option) => (
          <PaymentOptionCard
            key={option.points}
            option={option}
            isSelected={selectedOption?.points === option.points}
            onSelect={setSelectedOption}
          />
        ))}
      </ul>

      {selectedOption && (
        <div className='mt-8 w-full item-row gap-8'>
          <div className='p-4 mb-4 rounded-lg border border-[#2656CD]/20 w-full'>
            <div id='payment-widget' />
            <div id='agreement' />
          </div>
          <LayeredButton
            theme='red'
            containerClassName='w-fit'
            className='px-40 w-full text-white bg-blue-500 rounded-lg hover:bg-blue-600'
            onClick={handlePayment}>
            {selectedOption.amount.toLocaleString()}원 결제하기
          </LayeredButton>
        </div>
      )}
    </ProfileCardLayout>
  );
};

export default PaymentPage;
