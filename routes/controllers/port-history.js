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
      // console.log('daily result: ', dailyResult)
      let whnCreateLstArg

      // if whenCreated is before 2 weeks ago -> track hourly
      // else -> track daily
      if (moment(whenCreated).isSameOrBefore(Time.twoWeeksAgo())) {
        whnCreateLstArg = undefined
      } else {
        whnCreateLstArg = () => true
      }

      let weeklyResult = dataclean.avgDailyToWeekly(dailyResult)
      console.log('the time 6 m', Time.aYearAgo01())
      const returnObj = {
        aDayAgo: dataclean.windowPerform(hourlyResult, Time.aDayAgo(),'hourly', () => true),

        oneWeekAgo: dataclean.windowPerform(dailyResult,Time.oneWeekAgo(),'monthly'),

        oneMonthAgo: dataclean.windowPerform(dailyResult, Time.oneMonthAgo(), 'monthly'),

        sixMonthsAgo: dataclean.windowPerform(weeklyResult, Time.sixMonthsAgo01(), 'monthly'),

        oneYearAgo: dataclean.windowPerform(weeklyResult, Time.aYearAgo01(), 'yearly'),

        whenCreated: dataclean.windowPerform(hourlyResult, whenCreated,'hourly', whnCreateLstArg)
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
