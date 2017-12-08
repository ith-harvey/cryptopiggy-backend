
process.env.POSTGRESQL_USERANDPASS = 'postgres:tacobelllilly'

const { Auth } = require('./db')
const { PerformanceHistoryHourly } = require('./db')
const { PerformanceHistoryDaily } = require('./db')
const { Time } = require('./routes/controllers/utilfolder')

const { addresses: ctrl } = require('./routes/controllers')




function averageToOneDailyValue(response) {
  let newUserObj = (currVal) => {
    returnObj.user_id = currVal.user_id
    returnObj.portfolio_value = Number(currVal.portfolio_value)
    returnObj.amount_eth = Number(currVal.amount_eth)
  }

  let returnObj = {}
  return response[0].reduce( (acc, currVal, i) => {
    
    if (!returnObj.user_id) {
      newUserObj(currVal)
    } else {

      if (returnObj.user_id === currVal.user_id) {
        returnObj.portfolio_value += Number(currVal.portfolio_value)
        returnObj.amount_eth += Number(currVal.amount_eth)
      }

      if (i+1 === response[0].length || returnObj.user_id !== currVal.user_id) {
          returnObj.portfolio_value = returnObj.portfolio_value / 24
          returnObj.amount_eth = returnObj.amount_eth / 24
          acc.push(returnObj)

          //creating new acc for new user_id
          newUserObj(currVal)
        }
    }
    return acc

  },[])
}

function arrayOfBalancePromises(users) {
  return users.map( user => { //maps over users returns Promises
    return PerformanceHistoryHourly.getWindow(user.id,Time.aDayAgo())
      .then(response => {
        return response
      }).catch(err => {
        console.log('error!!!', err)
      })
  })
}

function getUsersAndBalanceForInsert() {
  return Auth.getAllUsers().then(users => {
    // console.log('here are all the users', users)
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

  // run balance of All addresses
  getUsersAndBalanceForInsert().then(response => {
    // get back the array of objects we will insert {user_id, value, amount_eth}
      console.log('final result!!!: ', averageToOneDailyValue(response))
    //
    //   const insertPromiseArr = response.map( priceObj => {
    //       // insert to db
    //       // console.log('what we send to save price', priceObj)
    //       return PerformanceHistoryDaily.savePrice(priceObj,dateMinRounded())
      // })
    })

    // execute all promises
    // Promise.all([insertPromiseArr]).then( (success, fail) => {
    //   if(fail) console.log('it failed!!!')
    //   else console.log('success!')
    // })
}

initiateTask()
