
const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const autoTask = require('./auto-task.js')


const auth = require('./routes/auth.js')
const address = require('./routes/address.js')
const portfolio = require('./routes/portfolio.js')

app.use(allowCrossDomain)

app.use(bodyParser.json());

app.use(allowCrossDomain)

// Cross
function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );

  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
}


// routes
app.use('/auth', auth)
app.use('/address', address)
app.use('/portfolio', portfolio)

app.post("/dev/pullanddeploy", function(req, res) {
  console.log('poot s')
  autoTask.gitPull()
  res.send('task complete.')
})

app.get("/", function(req, res) {
  console.log('taco')
  res.send('Welcome to root!')
})



app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
