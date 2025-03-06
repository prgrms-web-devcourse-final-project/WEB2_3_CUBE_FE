export enum PointReason {
  GUESTBOOK_REWARD = '방명록 작성', // X
  FIRST_COME_EVENT = '선착순 이벤트', // O
  DAILY_ATTENDANCE = '출석 체크', //
  RANK_1 = '주간 랭킹 1등',
  RANK_2 = '주간 랭킹 2등',
  RANK_3 = '주간 랭킹 3등',

  // 포인트 사용
  THEME_PURCHASE = '테마 구매', // 테마 구매
  BOOK_UNLOCK_LV2 = '도서 LV2 제한 해제', // 도서 제한 해제 (21~30권, 500P)
  BOOK_UNLOCK_LV3 = '도서 LV3 제한 해제', // 도서 제한 해제 (31권 이상, 1500P)
  CD_UNLOCK_LV2 = 'CD LV2 제한 해제', // CD 제한 해제 (21~30개, 500P)
  CD_UNLOCK_LV3 = 'CD LV3 제한 해제', // CD 제한 해제 (31개 이상, 1500P)

  // 포인트 결제
  POINT_PURCHASE_100 = '100 포인트 충전',
  POINT_PURCHASE_550 = '550 포인트 충전',
  POINT_PURCHASE_1200 = '1200 포인트 충전',
  POINT_PURCHASE_4000 = '4000 포인트 충전',

  // 포인트 환불
  POINT_REFUND_100 = '100 포인트 환불',
  POINT_REFUND_550 = '550 포인트 환불',
  POINT_REFUND_1200 = '1200 포인트 환불',
  POINT_REFUND_4000 = '4000 포인트 환불',
}
