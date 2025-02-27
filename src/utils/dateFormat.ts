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