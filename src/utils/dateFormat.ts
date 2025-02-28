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