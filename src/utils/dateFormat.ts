/**
 * YYYY-MM-DD 형식을 YYYY.MM.DD. 형식으로 변환
 */
export const toKoreanDate = (date: string) => {
  return date.replace(/-/g, '.') + '.';
};

/**
 * Date 객체를 YYYY.MM.DD. 형식으로 변환
 */
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}.`;
};

/**
 * ISO 날짜 문자열을 YYYY년 M월 D일 형식으로 변환
 */
export const formatToKoreanFullDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

/**
 * YYYY.MM.DD HH:mm 형식으로 날짜 변환
 */
export const formatTimeDate = (date: string) => {
  return new Date(date)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(/(\d{4})\. (\d{2})\. (\d{2})\./, '$1. $2. $3');
};

// 날짜를 상대적 시간으로 변환하는 함수
export const getRelativeTimeString = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const pastKST = new Date(past.getTime() + 9 * 60 * 60 * 1000);
  console.log(dateString);

  const diffMs = now.getTime() - pastKST.getTime();

  // 시간 간격 계산 (밀리초 기준)
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffMonth / 12);

  // 상대적 시간 문자열 반환
  if (diffSec < 60) return `방금 전`;
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 30) return `${diffDay}일 전`;
  if (diffMonth < 12) return `${diffMonth}달 전`;
  return `${diffYear}년 전`;
};
