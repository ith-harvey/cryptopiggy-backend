const express = require('express')
const router = express.Router();

const { history: ctrl } = require('./controllers')

router.post('/inceptionperform', ctrl.inceptionPerform );
router.post('/twelvemonthperform', ctrl.twelveMonthPerform );
router.post('/sixmonthperform', ctrl.sixMonthPerform );
router.post('/onemonthperform', ctrl.oneMonthPerform );
router.post('/twoweekperfom', ctrl.twoWeekPerform );


router.get('/', function (req,res,next) {
  res.send('Welcome to portfolio!')
})


module.exports = router
