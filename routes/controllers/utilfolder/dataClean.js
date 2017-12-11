const Time = require('./time')
const moment = require('moment');

// two cases:
// 1. for week/year/month/6month
// 2. 24 hours

function windowPerform(data, maxTimeWindow, comparisonDaysVsHours) {
  console.log('running!!!')

  let snapshotTime

  return data.reduce( (acum, priceHistObj) => {
    snapshotTime = Time.reformat(priceHistObj.created_at)

    // initialize the object
    if (!acum.valueBackThen) acum.valueBackThen = null
    if (!acum.windowData) acum.windowData = []
    if (!acum.xAxisInterval) acum.xAxisInterval = 'hourly'


    // if the maxTimewindow === the created_at price window set value
    if (moment(snapshotTime).isSame(maxTimeWindow)) {
      acum.valueBackThen = priceHistObj.portfolio_value
    }

    // if the maxTimewindow is before created_at price window, push into arr
    if (moment(maxTimeWindow).isSameOrBefore(snapshotTime)) {

      if (comparisonDaysVsHours === undefined) {
        console.log('time call in dataclean:',Time.justTime(snapshotTime))
        comparisonDaysVsHours = () => (Time.justTime(snapshotTime) === '00:00:00')
        if (acum.xAxisInterval === 'hourly') acum.xAxisInterval = 'monthly'
      }

      if (comparisonDaysVsHours()) { //return arr filled with days or hours

        acum.windowData.push({
            day: snapshotTime,
            value: Number(priceHistObj.portfolio_value),
            amount_eth: Number(priceHistObj.amount_eth)
          })
      }
    }
    return acum
  }, {})
}

function avgDailyToWeekly(dailyAvgData) {
  console.log('avg to weekly', dailyAvgData)
  let returnObj = {}

  let reduce =  arrayOfUserData.reduce( (acc, currVal, i) => {

    let newWeeklyObj = (currVal) => {
      returnObj = new Object()
      returnObj = {
        user_id : currVal.user_id,
        portfolio_value : Number(currVal.portfolio_value),
        amount_eth : Number(currVal.amount_eth)
      }
    }

    if (!returnObj.user_id) {
      newWeeklyObj(currVal)

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
        newWeeklyObj(currVal)
      }
    }
    return acc
    },[])
}



module.exports = {
  windowPerform,
  avgDailyToWeekly
}
