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
        error: 'Wrong date passed. Must be less than 1900-01-01',
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

function sortPageSearch (req) {
  const sort = req.query.sort
  let order = null
  if (sort && !sort.startsWith('-')) {
    order = `${sort} ASC`
  } else if (sort) {
    order = `${sort.replace('-', '')} DESC`
  }
  return {
    limit: +req.query.count || 1000,
    offset: +req.query.offset || 0,
    order: order
  }
}

function moneySpent (req, res, next) {
  db.MoneySpent.findAll(Object.assign({
    attributes: ['institution_name', 'money_spent', 'years_working']
  }, sortPageSearch(req))).then(res.send.bind(res))
}

function institutionYearsWorking (req, res, next) {
  db.InstitutionYearsWorking.findAll(Object.assign({
    attributes: ['institution_name', 'years_working']
  }, sortPageSearch(req))).then(res.send.bind(res))
}

function paymentOrdersNice (req, res, next) {
  db.PaymentOrders.findAll(Object.assign({
    attributes: ['institution_name', 'money', 'order_date', 'kekv_code', 'bank_name']
  }, sortPageSearch(req))).then(res.send.bind(res))
}

function restEstimates (req, res, next) {
  db.RestEstimates.findAll(Object.assign({
    attributes: ['institution_name', 'kekv_code', 'year', 'rest']
  }, sortPageSearch(req))).then(res.send.bind(res))
}

function report (req, res, next) {
  let { start, end } = req.query

  const badDate = findBadDates(start, end)
  if (badDate) {
    res.send(badDate)
    return
  }

  console.log(start, end)

  start = start || '1900-01-01'
  end = end || '2100-01-01'

  const { jtSorting, jtStartIndex, jtPageSize } = req.query

  const query = `
  select
  	i.id,
      i.name,
      count(*) as total_payment_orders,
      sum(p.money) as total_money
  from institution i
  inner join payment_order p
  	on i.id = p.institution_id
      and p.order_date between
    		cast('${start}' as date) and
    		cast('${end}' as date)
  group by i.id
  order by ${jtSorting || 'i.name'};
  `

  db.sequelize
    .query(query)
    .then((result) => {
      res.send({
        count: result[0].length,
        data: result[0].slice(jtStartIndex || 0, jtPageSize || 1000)
      })
    })
    .catch((err) => {
      res.send({
        error: err
      })
    })
}

function reportInst (req, res, next) {
  const id = req.params.institutionid
  const { jtSorting, jtStartIndex, jtPageSize } = req.query

  let { start, end } = req.query

  const badDate = findBadDates(start, end)
  if (badDate) {
    res.send(badDate)
    return
  }

  start = start || '1900-01-01'
  end = end || '2100-01-01'

  const query = `
  select
  	extract(year from p.order_date) as year,
      count(*) as count_orders,
      sum(p.money) as total_money
  from institution i
  inner join payment_order p
  	on i.id = p.institution_id
    and p.order_date between
      cast('${start}' as date) and
      cast('${end}' as date)
  group by i.id, extract(year from p.order_date)
  	having i.id = ${id}
  order by ${jtSorting || 'extract(year from p.order_date)'};
  `

  db.sequelize
    .query(query)
    .then((result) => {
      res.send({
        count: result[0].length,
        data: result[0].slice(jtStartIndex || 0, jtPageSize || 1000)
      })
    })
    .catch(() => {
      res.send({
        error: 'No such institution id',
        value: id
      })
    })
}

function reportInstYear (req, res, next) {
  const id = req.params.institutionid
  const date = req.params.date

  const splitted = date.split('&')
  let start = splitted[0]
  let end = splitted[1]
  let year = splitted[2]
  console.log(start, end, year)

  const { jtSorting, jtStartIndex, jtPageSize } = req.query

  const badDate = findBadDates(start, end)
  if (badDate) {
    res.send(badDate)
    return
  }

  start = start || '1900-01-01'
  end = end || '2100-01-01'
  year = year || 2016

  const query = `
  select
  	p.order_date,
    k.code,
    p.money,
    b.name
  from payment_order p
  inner join kekv k
  	on k.id = p.kekv_id
  inner join bank b
  	on b.id = p.bank_id
  where
  	p.institution_id = ${id} and
    extract(year from p.order_date) = ${year} and
    p.order_date between
    cast('${start}' as date) and
    cast('${end}' as date)
  order by ${jtSorting || 'p.order_date'};
  `

  db.sequelize
    .query(query)
    .then((result) => {
      res.send({
        count: result[0].length,
        data: result[0].slice(jtStartIndex || 0, jtPageSize || 1000)
      })
    })
    .catch((err) => {
      res.send({
        error: err
      })
    })
}

exports.institutionsByBank = institutionsByBank
exports.moneySpent = moneySpent
exports.institutionYearsWorking = institutionYearsWorking
exports.paymentOrdersNice = paymentOrdersNice
exports.restEstimates = restEstimates
exports.report = report
exports.reportInst = reportInst
exports.reportInstYear = reportInstYear
