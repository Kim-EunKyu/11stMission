export function getDay() {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${min}분 ${sec}초`;
}
