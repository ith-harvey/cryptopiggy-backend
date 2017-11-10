const Time = require('./time')
const moment = require('moment');

function windowPerform(data, maxTimeWindow) {

  return data.reduce( (acum, priceHistObj) => {
    // initialize the object
    if (!acum.valueBackThen) acum.valueBackThen = null
    if (!acum.windowData) acum.windowData = []

    // if the maxTimewindow === the created_at price window set value
    if (moment(Time.justDate(priceHistObj.created_at)).isSame(maxTimeWindow)) {
      acum.valueBackThen = priceHistObj.portfolio_value
    }

    // if the maxTimewindow <= created_at price window, push into arr
    if (moment(maxTimeWindow).isBefore(Time.justDate(priceHistObj.created_at))) {
      acum.windowData.push(
        { day: Time.justDate(priceHistObj.created_at),
          value: Number(priceHistObj.portfolio_value),
          amount_eth: Number(priceHistObj.amount_eth)}
      )
    }
    return acum
  }, {})
}

module.exports = {
  windowPerform
}
