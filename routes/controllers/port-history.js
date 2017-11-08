const bcrypt = require('bcrypt')

const { jwtUtils } = require('./utilfolder')
const { ethscan } = require('./utilfolder')
const { dataclean } = require('./utilfolder')
const { Time } = require('./utilfolder')

const { Performancehistory } = require('../../db')


function windowOfPerformance (req, res, next) {
  const id =  jwtUtils.parseToken(req.body.token).id.toString()


  Performancehistory.getWindow(id, Time.aYearAgo()).then( result => {
    console.log('result', result)

    const returnObj = {
      twoWeeksAgo: dataclean.windowPerform(result, Time.twoWeeksAgo()),
      oneMonthAgo: dataclean.windowPerform(result, Time.oneMonthAgo()),
      sixMonthsAgo: dataclean.windowPerform(result, Time.oneMonthAgo()),
      oneYearAgo: dataclean.windowPerform(result, Time.aYearAgo())
    }


    // res.send(returnObj)

    // returnObj = {
    //       twoWeeksAgo: {
    //         value: 3000.00,
    //         data: [[created_at, portfolio_value: 24333]]
    //       },
    //       oneMonthAgo: {
    //         value: 3000.00,
    //         data: [[created_at, portfolio_value: 24333]]
    //       }
    //       sixMonthsAgo: {
    //         value: 3000.00,
    //         data: [[created_at, portfolio_value: 24333]]
    //       }
    //       twelveMonthsAgo: {
    //         value: 3000.00,
    //         data: [[created_at, portfolio_value: 24333]]
    //       }
    //  }

  })
}


module.exports = {
  windowOfPerformance
}
