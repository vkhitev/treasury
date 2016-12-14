const db = require('../models')

const startDate = new Date('1900-01-01')

function validateDate (strDate) {
  const date = new Date(strDate)
  if (date < startDate) {
    return false
  }
  return true
}

function findBadDates (...dates) {
  for (let date of dates) {
    if (date && !validateDate(date)) {
      return {
        // error: 'Wrong date passed. Must be less than 1900-01-01',
        error: 'Не мучай',
        value: date
      }
    }
  }
  return false
}

function institutionsByBank (req, res, next) {
  const bankid = req.params.bankid
  let { start, end } = req.query

  const badDate = findBadDates(start, end)
  if (badDate) {
    res.send(badDate)
    return
  }

  start = start || '1900-01-01'
  end = end || '2100-01-01'

  let query = `
  select distinct
    i.id as institution_id,
    i.name as institution_name
  from institution i
  inner join payment_order p
    on i.id = p.institution_id
  inner join bank b
    on b.id = p.bank_id
  where b.id = ${bankid}
   and order_date between
      cast ('${start}' as date) and
      cast('${end}' as date);
  `

  db.sequelize.query(query)
    .then((result) => {
      res.send(result[0])
    })
}

function moneySpent (req, res, next) {
  db.MoneySpent.findAll({
    attributes: ['institution_name', 'money_spent', 'years_working']
  }).then(res.send.bind(res))
}

function institutionYearsWorking (req, res, next) {
  db.InstitutionYearsWorking.findAll({
    attributes: ['institution_name', 'years_working']
  }).then(res.send.bind(res))
}

function paymentOrdersNice (req, res, next) {
  db.PaymentOrders.findAll({
    attributes: ['institution_name', 'money', 'order_date', 'kekv_code', 'bank_name']
  }).then(res.send.bind(res))
}

function restEstimates (req, res, next) {
  db.RestEstimates.findAll({
    attributes: ['institution_name', 'kekv_code', 'year', 'rest']
  }).then(res.send.bind(res))
}

exports.institutionsByBank = institutionsByBank
exports.moneySpent = moneySpent
exports.institutionYearsWorking = institutionYearsWorking
exports.paymentOrdersNice = paymentOrdersNice
exports.restEstimates = restEstimates
