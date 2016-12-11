const fs = require('fs')
const path = require('path')
const random = require('./random')
let jsonArray = []

const estimates = require('../estimate')
const numberOfBanks = require('../bank').length

const rnd = {
  date: (year) => {
    const month = random.getRandomInt(1, 12)
    return new Date(
      year,
      month,
      random.getRandomDay(year, month)
    ).toISOString().substring(0, 10)
  },
  money: (limit) => random.getRandom(0.15 * limit, limit).toFixed(2),
  bank: () => random.getRandomInt(0, numberOfBanks),
  generate (estimate, rest, bank) {
    return {
      date: this.date(estimate.year),
      institution: estimate.institution,
      kekv: estimate.kekv,
      bank: bank,
      money: this.money(rest)
    }
  }
}

estimates.forEach((estimate) => {
  const numberOfOrders = random.getRandomInt(0, 5)
  let rest = estimate.limit
  const bank = rnd.bank()
  for (let i = 0; i < numberOfOrders; i++) {
    const obj = rnd.generate(estimate, rest, bank)
    rest -= obj.money
    jsonArray.push(obj)
  }
})

fs.writeFileSync(path.resolve(__dirname, '../order.json'), JSON.stringify(jsonArray, null, 2))
