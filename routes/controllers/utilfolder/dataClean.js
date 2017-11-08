

function windowPerform(data, maxTimeWindow) {

  let justdate = date => {
    console.log('date being processed', date)
     Number(date).setHours(0,0,0,0)
  }

  let returnObj = data.reduce( (acum, priceHistObj) => {

    if (justdate(priceHistObj.created_at) === justdate(maxTimeWindow)) {
      acum.valueBackThen = priceHistObj.portfolio_value
    }

    if (!acum.windowData) acum.windowData = []

    if (maxTimeWindow <= priceHistObj.created_at) {
      acum.windowData.push(
        [ priceHistObj.created_at, priceHistObj.portfolio_value ]
      )
    }


    return acum
  }, {})

console.log('AFTER REDUCE!!!!! ???????//// ///', returnObj)

}


// {
//   value: 3000.00,
//   data: [[created_at, portfolio_value: 24333]]
//  },


module.exports = {
  windowPerform
}
