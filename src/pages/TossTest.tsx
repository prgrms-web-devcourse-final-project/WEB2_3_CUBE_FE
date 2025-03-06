import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = '5bwe_UyPru_naK0XAgYqS';

export function TossTest() {
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: 50_000,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      });
      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(amount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  useEffect(() => {
    if (widgets == null) {
      return;
    }

    widgets.setAmount(amount);
  }, [widgets, amount]);

  return (
    <div className='wrapper'>
      <div className='box_section'>
        {/* 결제 UI */}
        <div id='payment-method' />
        {/* 이용약관 UI */}
        <div id='agreement' />

        {/* 결제하기 버튼 */}
        <button
          className='button p-4 w-full text-white bg-blue-500 rounded-lg hover:bg-blue-600'
          disabled={!ready}
          onClick={async () => {
            try {
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
              // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
              await widgets.requestPayment({
                orderId: 'vsRzW8H6kcvvonkxMjvOJ',
                orderName: '토스 티셔츠 외 2건',
                successUrl: window.location.origin + '/success',
                failUrl: window.location.origin + '/fail',
                customerEmail: 'customer123@gmail.com',
                customerName: '김토스',
                customerMobilePhone: '01012341234',
              });
            } catch (error) {
              // 에러 처리하기
              console.error(error);
            }
          }}>
          결제하기
        </button>
      </div>
    </div>
  );
}
