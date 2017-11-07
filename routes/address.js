const express = require('express')
const router = express.Router();
// const ethscan = require('./utilfolder/etherscan.js')

const { addresses: ctrl } = require('./controllers')


router.get('/ethprice', function (req, res, next) {
  ethscan.getEthPrice().then( response => {
  res.send(response.result.ethusd)
  })
})

// Get balance of and return all addresses
router.post('/balance/user', ctrl.balanceAddressesSetup)

// add an address and return success message
router.post('/', ctrl.createAddress)

// delete an address return success mssg
router.delete('/:id', ctrl.deleteAddress)

module.exports = router
