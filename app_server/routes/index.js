var express = require('express')
var router = express.Router()

// const db = require('../models')
//
// /* GET home page. */
// router.get('/', function (req, res, next) {
//   // res.render('index', { title: 'Express' })
//   db.Kekv.findAll().then((result) => {
//     res.send(result)
//   })
// })

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
