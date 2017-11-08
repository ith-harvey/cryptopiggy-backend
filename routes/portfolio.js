const express = require('express')
const router = express.Router();

const { history: ctrl } = require('./controllers')

router.post('/performhistory', ctrl.windowOfPerformance);



router.get('/', function (req,res,next) {
  res.send('Welcome to portfolio!')
})


module.exports = router
