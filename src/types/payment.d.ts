interface AlertState {
  isOpen: boolean;
  title: string;
  subTitle: string;
  onConfirm: () => void;
}

interface AlertState {
  isOpen: boolean;
  title: string;
  subTitle: string;
  onConfirm: () => void;
}

interface PaymentOption {
  points: number;
  amount: number;
}

interface PaymentHistory {
  orderId: string;
  amount: number;
  purchasedPoints: number;
  createdAt: string;
  status: 'SUCCESS' | 'CANCELED';
}

interface PaymentVerifyRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

interface PaymentRequestBody {
  orderId: string;
  amount: number;
  purchasedPoints: number;
}

interface PaymentResponse {
  id: number;
  amount: number;
  earnedPoints: number;
  paymentKey: string;
  createdAt: string;
  status: 'SUCCESS' | 'CANCELED';
}

interface PaymentHistoryParams {
  page?: number;
  size?: number;
}

interface Window {
  TossPayments: (clientKey: string) => {
    requestPayment: (
      method:
        | '카드'
        | '가상계좌'
        | '계좌이체'
        | '휴대폰'
        | '문화상품권'
        | '도서문화상품권'
        | '게임문화상품권',
      params: {
        amount: number;
        orderId: string;
        orderName: string;
        successUrl: string;
        failUrl: string;
        [key: string]: any;
      },
    ) => Promise<void>;
  };
}

declare module '@tosspayments/payment-widget-sdk' {
  export function loadPaymentWidget(
    clientKey: string,
    customerKey: string,
  ): Promise<{
    renderPaymentMethods: (
      selector: string,
      amount: { value: number },
    ) => Promise<void>;
    renderAgreement: (selector: string) => Promise<void>;
    requestPayment: (params: {
      orderId: string;
      orderName: string;
      successUrl: string;
      failUrl: string;
      [key: string]: any;
    }) => Promise<void>;
  }>;
}
