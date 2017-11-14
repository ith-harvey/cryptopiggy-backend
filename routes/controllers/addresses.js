const bcrypt = require('bcrypt')

// Utility functions
const { jwtUtils } = require('./utilfolder')
const { ethscan } = require('./utilfolder')

// DB queries
const { Address } = require('../../db')

function balanceAndAllAddresses (id) {
  return Address.getAddressesByUserID(id).then( response => {
    if (response) {
      let addressData = response

      const addressArr = response.map( obj => obj.address) //pull out addresses

      return Promise.all([
          ethscan.getEthPrice(),
          ethscan.getBalanceMultiAddress(addressArr)])
          .then(values => {
            let ethPriceinUSD = Number(values[0].result.ethusd)

          // We send { totalCrypto, totalUSD, addressData } back
          return  ethscan.mapEthPriceToAddressData(
                    addressData,
                    values[1].result,
                    ethPriceinUSD
                  )
          })
    }
  })
}


function balanceAddressesSetup (req, res, next) {
  const id =  jwtUtils.parseToken(req.body.token).id.toString()

  balanceAndAllAddresses(id).then( values => {
    res.send(values)
  })
  .catch(function (err) {
    console.log('api call failed error : ', err)
    res.status(500).send(err) // API call failed...
  });
}


function createAddress(req, res, next) {
  console.log('in create', req.body)
  let token = jwtUtils.parseToken(req.body.token)

  const data = {
    address: req.body.address,
    user_id: token.id.toString()
  }

  Address.create(data).then(() => {
      console.log('the post was success added')
      res.send('address was successfully added!')
  }).catch(error => {
    console.log('error', error)
    res.status(500).send(error)
  })
}

function deleteAddress(req, res, next) {
  const id = req.params.id
  Address.delete(id).then(() => {
    res.send('addresses was removed successfully')
  }).catch(error => {
    res.status(500).send(error)
  })
}


module.exports = {
  balanceAddressesSetup, balanceAndAllAddresses, createAddress, deleteAddress
}
