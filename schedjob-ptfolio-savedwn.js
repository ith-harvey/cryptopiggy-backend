const { Auth } = require('./db')
const { Performancehistory } = require('./db')

const { addresses: ctrl } = require('./routes/controllers')


function arrayOfBalancePromises(users) {
  return users.map( user => { //maps over users returns Promises
      return ctrl.balanceAndAllAddresses(user.id)
      .then(response => {
        //kick back our obj
        return {user_id: user.id, portfolio_value: response.totalUSD, amount_eth: response.totalCrypto}
      })
  })
}


function getUsersAndBalanceForInsert() {
  return Auth.getAllUsers().then(users => {

    return Promise.all(arrayOfBalancePromises(users)).then( data => {
      return data //return all of our objects
    })
  })
}

function dateMinRounded() {
    let date = new Date()
    date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.toISOString().slice(0, 19).replace('T', ' ')
}

// initiate the price history save down for all users
function initiateTask() {
  console.log('running job')

  // run balance of All addresses
  getUsersAndBalanceForInsert().then(response => {

    // get back the array of objects we will insert {user_id, value, amount_eth}
    const insertPromiseArr = response.map( priceObj => {
        // insert to db
        console.log('what we send to save price', priceObj)
        return Performancehistory.savePrice(priceObj,dateMinRounded())
    })

    // execute all promises
    Promise.all([insertPromiseArr]).then( (success, fail) => {
      console.log('success!', success)
      console.log('failed', fail)
    })

  })
}

initiateTask()
