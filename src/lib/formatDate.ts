export const formatDate = (date: Date) => {
  function leadingZero(token: number) {
    return ("0" + token).slice(-2);
  }

  const year = date.getFullYear();
  const month = leadingZero(date.getMonth() + 1);
  const day = leadingZero(date.getDate());
  const hours = leadingZero(date.getHours());
  const minutes = leadingZero(date.getMinutes());
  const seconds = leadingZero(date.getSeconds());

  const result = `${day}.${month}.${year} в ${hours}:${minutes}`;

  return result;
};
