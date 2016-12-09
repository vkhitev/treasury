const estimates = require('../order.json')
const fs = require('fs')
const path = require('path')

estimates.forEach((item) => {
  item.money = item.money.toString().replace('.', ',')
})

fs.writeFileSync(path.resolve(__dirname, '../order2.json'), JSON.stringify(estimates, null, 2))
