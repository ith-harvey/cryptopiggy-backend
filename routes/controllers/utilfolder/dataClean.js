const Time = require('./time')
const moment = require('moment');

/**
   * windowPerform()
   * @param {Array} data - The performance data pulled from DB.
   * @param {String} maxTimeWindow - date of the time window we capture.
   *    i.e: 1 week, 24 hours, 1 month
   * @param {String} xAxisInterval - the x axis interval we will be graphing.
   *    i.e: 'hourly', 'monthly', 'yearly'
   * @param {undefined || () => true} comparisonDaysVsHours -
   *
   * @returns {Object} acum - the windowData, the value of the portfolio back then and the xAxisInterval
   *    acum: {
   *      valueBackThen: null || 'yearly'
   *      windowData: [{
   *        day: string,
   *        value: number || null,
   *        amount_eth: number
   *        },
   *        {} ...]
   *      xAxisInterval: 'hourly' || 'monthly' || 'yearly'
   *    }
   */


// two cases:
// 1. for week/year/month/6month
// 2. 24 hours

function monthlywindowPerform(data, maxTimeWindow, xAxisInterval, comparisonDaysVsHours) {
  let snapshotTime
  console.log(' //// ///// //// data', JSON.stringify(data))

  return data.reduce( (acum, priceHistObj) => {
    snapshotTime = Time.reformat(priceHistObj.created_at)

    // initialize the object
    if (!acum.valueBackThen) acum.valueBackThen = null
    if (!acum.windowData) acum.windowData = []
    if (!acum.xAxisInterval) acum.xAxisInterval = xAxisInterval


    // if the maxTimewindow === the created_at price window, assign value
    if (moment(snapshotTime).isSame(maxTimeWindow)) {
      acum.valueBackThen = Number(priceHistObj.portfolio_value).toFixed(2)
    }

    // if the maxTimewindow is before created_at price window, push into arr
    if (moment(maxTimeWindow).isSameOrBefore(snapshotTime)) {
      console.log('snaptime', snapshotTime)

      if (comparisonDaysVsHours === undefined) {
        comparisonDaysVsHours = () => (Time.justTime(snapshotTime) === '00:00:00')
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




function windowPerform(data, maxTimeWindow, xAxisInterval, comparisonDaysVsHours) {
  let snapshotTime

  return data.reduce( (acum, priceHistObj) => {
    snapshotTime = Time.reformat(priceHistObj.created_at)

    // initialize the object
    if (!acum.valueBackThen) acum.valueBackThen = null
    if (!acum.windowData) acum.windowData = []
    if (!acum.xAxisInterval) acum.xAxisInterval = xAxisInterval


    // if the maxTimewindow === the created_at price window, assign value
    if (moment(snapshotTime).isSame(maxTimeWindow)) {
      acum.valueBackThen = Number(priceHistObj.portfolio_value).toFixed(2)
    }

    // if the maxTimewindow is before created_at price window, push into arr
    if (moment(maxTimeWindow).isSameOrBefore(snapshotTime)) {

      if (comparisonDaysVsHours === undefined) {
        comparisonDaysVsHours = () => (Time.justTime(snapshotTime) === '00:00:00')
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
        created_at: new Date(currVal.created_at.setDate(1))
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
  monthlywindowPerform,
  avgDailyToWeekly
}
