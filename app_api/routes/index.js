const { Router } = require('express')
const router = Router()

const controller = require('../controllers/mainController')

router.get('/institutions_by_bank/:bankid', controller.institutionsByBank)

router.get('/money_spent', controller.moneySpent)
router.get('/institution_years_working', controller.institutionYearsWorking)
router.get('/payment_orders_nice', controller.paymentOrdersNice)
router.get('/rest_estimates', controller.restEstimates)

router.get('/report', controller.report)
router.get('/report/:institutionid', controller.reportInst)
router.get('/report/:institutionid/:date', controller.reportInstYear)

module.exports = router
