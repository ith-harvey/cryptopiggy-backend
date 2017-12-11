const bcrypt = require('bcryptjs')
const moment = require('moment');

const { jwtUtils } = require('./utilfolder')
const { ethscan } = require('./utilfolder')
const { dataclean } = require('./utilfolder')
const { Time } = require('./utilfolder')

const { PerformanceHistoryHourly } = require('../../db')
const { PerformanceHistoryDaily } = require('../../db')
const { Auth } = require('../../db')


function windowOfPerformance (req, res, next) {
  const id =  jwtUtils.parseToken(req.body.token).id.toString()
  Auth.getUserById(id).then( response => {
    console.log('whenCreated resp', response)

    let whenCreated = moment(response.created_at, 'YYYY-MM-DD').add(1,'h').minutes(0).format('MM/DD/YYYY hh:mm:ss')
    console.log('after adjust:', whenCreated)

  PerformanceHistoryHourly.getWindow(id, whenCreated).then( hourlyResult => {
    PerformanceHistoryDaily.getWindow(id, whenCreated).then( dailyResult => {
      console.log('daily result: ', dailyResult)
      let whnCreateLstArg

      // if whenCreated is before 2 weeks ago -> track hourly
      // else -> track daily
      if (moment(whenCreated).isSameOrBefore(Time.twoWeeksAgo())) {
        whnCreateLstArg = undefined
      } else {
        whnCreateLstArg = () => true
      }

      const returnObj = {
        aDayAgo: dataclean.windowPerform(hourlyResult, Time.aDayAgo(), () => true),

        oneWeekAgo: dataclean.windowPerform(dailyResult,Time.oneWeekAgo()),

        oneMonthAgo: dataclean.windowPerform(dailyResult, Time.oneMonthAgo()),

        sixMonthsAgo: dataclean.windowPerform(dailyResult, Time.sixMonthsAgo()),

        oneYearAgo: dataclean.windowPerform(dailyResult, Time.aYearAgo()),

        whenCreated: dataclean.windowPerform(hourlyResult, whenCreated, whnCreateLstArg)
      }

      res.send(returnObj)

      /*final returnObj = {
            twoWeeksAgo: {
              value: XXXX.XX / null,
              data: [[created_at, portfolio_value: 24333]]
            },
            oneMonthAgo: {
              value: XXXX.XX / null,
              data: [[created_at, portfolio_value: 24333]]
            }
            sixMonthsAgo: {
              value: XXXX.XX / null,
              data: [[created_at, portfolio_value: 24333]]
            }
            twelveMonthsAgo: {
              value: XXXX.XX / null,
              data: [[created_at, portfolio_value: 24333]]
            }
       }*/

      })
  })
  })
}


module.exports = {
  windowOfPerformance
}
