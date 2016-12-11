/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {float} a random floating point number
 */
function getRandom (min, max) {
  return Math.random() * (max - min) + min
}

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {int} a random integer
 */
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomDay (year, month) {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  let curDays = days[month - 1]
  if (month === 2 && year % 4 === 0) {
    curDays += 1
  }
  const day = getRandomInt(1, curDays)
  return day
}

exports.getRandom = getRandom
exports.getRandomInt = getRandomInt
exports.getRandomDay = getRandomDay
