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
    // console.log('weekly result maxt window', maxTimeWindow)
    // console.log('weekly result sn time', snapshotTime)
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
  console.log('avg to weekly')
  let returnObj = {}
  let daysInMonth = 0

  return dailyAvgData.reduce( (acc, currVal, i) => {

    let newWeeklyObj = (currVal) => {
      daysInMonth = 0
      returnObj = new Object()
      returnObj = {
        user_id : currVal.user_id,
        portfolio_value : Number(currVal.portfolio_value),
        amount_eth : Number(currVal.amount_eth),
        created_at: currVal.created_at
      }
    }

    if (!returnObj.user_id) {
      newWeeklyObj(currVal)

    } else {

      if (returnObj.created_at.getMonth() === currVal.created_at.getMonth()) {
        returnObj.portfolio_value += Number(currVal.portfolio_value)
        returnObj.amount_eth += Number(currVal.amount_eth)
        daysInMonth += 1
      }

      if (i+1 === dailyAvgData.length || returnObj.created_at.getMonth() !== currVal.created_at.getMonth()) {

        returnObj.portfolio_value = returnObj.portfolio_value / daysInMonth
        returnObj.amount_eth = returnObj.amount_eth / daysInMonth
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
