module.exports = function (app) {
  const epilogue = require('epilogue')
  const db = require('./models')

  epilogue.initialize({
    app: app,
    sequelize: db.sequelize
  })

  epilogue.resource({
    model: db.Bank,
    endpoints: ['/banks', '/banks/:id']
  })

  epilogue.resource({
    model: db.Estimate,
    endpoints: ['/estimates', '/estimates/:id']
  })

  epilogue.resource({
    model: db.Institution,
    endpoints: ['/institutions', '/institutions/:id']
  })

  epilogue.resource({
    model: db.Kekv,
    endpoints: ['/kekvs', '/kekvs/:id']
  })

  epilogue.resource({
    model: db.PaymentOrder,
    endpoints: ['/payment_orders', '/payment_orders/:id']
  })
}
