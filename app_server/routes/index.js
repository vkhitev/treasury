var express = require('express')
var router = express.Router()

const nodemailer = require('nodemailer')

var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'vladkhitev@gmail.com',
    pass: process.env.MAIL_PASSWORD
  }
}

var transporter = nodemailer.createTransport(smtpConfig)

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/mail/contact_me', (req, res) => {
  const { name, phone, email, message } = req.body

  var mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'vladkhitev@gmail.com',
    subject: 'Курсач БД',
    text: `${message}\n\n${phone}`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.sendStatus(400)
    } else {
      res.sendStatus(204)
      console.log('Message sent: ' + info.response)
    }
  })
})

module.exports = router
