const express = require('express')
const router = express.Router();

const { auth: ctrl } = require('./controllers')

router.post('/signin', ctrl.signIn );
router.post('/signup', ctrl.signUp );

router.get('/', function (req,res,next) {
  res.send('Welcome to auth!')
})


module.exports = router
