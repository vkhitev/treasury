const orders = require('../order_changed.json')

orders.forEach((order, index) => {
  order.order_number = index + 1
})

require('fs').writeFileSync(
  require('path').resolve(__dirname, '../order_changed2.json'),
  JSON.stringify(orders, null, 2)
)
