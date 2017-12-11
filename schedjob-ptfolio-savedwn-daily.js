
process.env.POSTGRESQL_USERANDPASS = 'postgres:tacobelllilly'

const { Auth } = require('./db')
const { PerformanceHistoryHourly } = require('./db')
const { PerformanceHistoryDaily } = require('./db')
const { Time } = require('./routes/controllers/utilfolder')

const { addresses: ctrl } = require('./routes/controllers')




function averageUserValues(response) {

  return response.map( arrayOfUserData => {
    let returnObj = {}
    // console.log('arrayOfUserData', arrayOfUserData)
    // console.log('arrayOfUserData', arrayOfUserData.length)
    let reduce =  arrayOfUserData.reduce( (acc, currVal, i) => {

      let newUserObj = (currVal) => {
        returnObj = new Object()
        returnObj = {
          user_id : currVal.user_id,
          portfolio_value : Number(currVal.portfolio_value),
          amount_eth : Number(currVal.amount_eth)
        }
      }

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
      return reduce[0]
  })
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
    date.setHours(-6);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.toISOString().slice(0, 19).replace('T', ' ')
}

// initiate the price history save down for all users
function initiateTask() {

  // run balance of All addresses
  getUsersAndBalanceForInsert().then(response => {
    // console.log('what we pull', response)
    // get back the array of objects we will insert {user_id, value, amount_eth}
      response = averageUserValues(response)

    const insertPromiseArr = response.map( priceObj => {
        console.log('response', response)
        console.log('date of insert', dateMinRounded())
        // insert to db
        return PerformanceHistoryDaily.savePrice(priceObj,dateMinRounded())
    })

    // execute all promises
    Promise.all([insertPromiseArr]).then( (success, fail) => {
      if(fail) console.log('it failed!!!')
      else console.log('success!')
    })
  })
}

initiateTask()
