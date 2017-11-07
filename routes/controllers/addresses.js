const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const utils = {
  jwt : require('./utilfolder/jwtUtils'),
  ethscan : require('./utilfolder/etherscan')
  }

const { Address } = require('../../db')

function balanceAndAllAddresses (id) {
  return Address.getAddressesByUserID(id).then( response => {
    if (response) {
      let addressData = response

      //pull out addresses
      const addressArr = response.map( obj => obj.address)

    return Promise.all([
        utils.ethscan.getEthPrice(),
        utils.ethscan.getBalanceMultiAddress(addressArr)])

      .then(values => {
        let ethPriceinUSD = Number(values[0].result.ethusd)

          // We send { totalCrypto, totalUSD, addressData } back
        return  utils.ethscan.mapEthPriceToAddressData(
                  addressData,
                  values[1].result,
                  ethPriceinUSD
                )
        })
    }
  })
}


function balanceAddressesSetup (req, res, next) {
  const id =  utils.jwt.parseToken(req.body.token).id.toString()

  balanceAndAllAddresses(id).then( values => {
    console.log('idk wtf', values)
    res.send(values)
  })
  .catch(function (err) {
    console.log('api call failed error : ', err)
    res.status(500).send(err) // API call failed...
  });
}


function createAddress(req, res, next) {
  console.log('in create', req.body)
  let token = utils.jwt.parseToken(req.body.token)

  const data = {
    address: req.body.address,
    user_id: token.id.toString()
  }

  Address.create(data).then(() => {
      console.log('the post was success added')
      res.send('address was successfully added!')
  }).catch(error => {
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
