export const formatDate = (milliseconds: number, withTime: boolean = true) => {
  const date = new Date(milliseconds)

  function leadingZero(token: number) {
    return ("0" + token).slice(-2)
  }

  const year = date.getFullYear()
  const month = leadingZero(date.getMonth() + 1)
  const day = leadingZero(date.getDate())
  const hours = leadingZero(date.getHours())
  const minutes = leadingZero(date.getMinutes())

  let result = `${day}.${month}.${year}`
  if (withTime) {
    result += ` ${hours}:${minutes}`
  }

  return result
}
