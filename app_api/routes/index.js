const { Router } = require('express')
const router = Router()

const controller = require('../controllers/mainController')

router.get('/institutions_by_bank/:bankid', controller.institutionsByBank)

router.get('/money_spent', controller.moneySpent)
router.get('/institution_years_working', controller.institutionYearsWorking)
router.get('/payment_orders_nice', controller.paymentOrdersNice)
router.get('/rest_estimates', controller.restEstimates)

module.exports = router
