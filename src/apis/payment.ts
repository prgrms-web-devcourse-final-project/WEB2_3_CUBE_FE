import axiosInstance from './axiosInstance';

const API_URL = 'api';

export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELED';

interface PaymentVerifyRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

interface PaymentRequestBody {
  orderId: string;
  amount: number;
  purchasePoints: number;
}

interface PaymentResponse {
  orderId: string;
  paymentKey: string;
  amount: number;
  purchasedPoints: number;
  status: PaymentStatus;
}

export const paymentAPI = {
  /**
   * 결제 검증 API
   * @param data - 결제 검증에 필요한 데이터
   * @returns 결제 검증 결과 및 상태 정보
   * @example
   * const result = await paymentAPI.verifyPayment({
   *   paymentKey: "payment_key_xxx",
   *   orderId: "order_123",
   *   amount: 10000
   * });
   */
  verifyPayment: (data: PaymentVerifyRequest) =>
    axiosInstance.post<PaymentResponse>(`/${API_URL}/payments/verify`, data),

  /**
   * 결제 요청 API
   * @param data - 결제 요청에 필요한 데이터
   * @returns 결제 요청 결과 및 상태 정보
   * @example
   * const result = await paymentAPI.requestPayment({
   *   orderId: "order_123",
   *   amount: 10000,
   *   purchasePoints: 1000
   * });
   */
  requestPayment: (data: PaymentRequestBody) =>
    axiosInstance.post<PaymentResponse>(`/${API_URL}/payments/request`, data),

  /**
   * 결제 실패 처리 API
   * @param orderId - 실패 처리할 주문 ID
   * @example
   * await paymentAPI.failPayment("order_123");
   */
  failPayment: (orderId: string) =>
    axiosInstance.post<void>(`/${API_URL}/payments/fail/${orderId}`),

  /**
   * 결제 취소 API
   * @param orderId - 취소할 주문 ID
   * @param cancelReason - 취소 사유 (기본값: '전액 취소')
   * @param cancelAmount - 취소 금액 (선택사항)
   * @returns 취소된 결제 정보
   * @example
   * const result = await paymentAPI.cancelPayment(
   *   "order_123",
   *   "고객 변심",
   *   10000
   * );
   */
  cancelPayment: (
    orderId: string,
    cancelReason: string = '전액 취소',
    cancelAmount?: number,
  ) =>
    axiosInstance.post<PaymentResponse>(
      `/${API_URL}/payments/cancel/${orderId}`,
      undefined,
      { params: { cancelReason, cancelAmount } },
    ),
};
