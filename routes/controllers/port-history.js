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

    let whenCreated = Time.addHourReformatResetToZeros(response.created_at)

    console.log('when created after modification: ', whenCreated)

  PerformanceHistoryHourly.getWindow(id, whenCreated).then( hourlyResult => {
    PerformanceHistoryDaily.getWindow(id, whenCreated).then( dailyResult => {

      let weeklyResult = dataclean.avgDailyToWeekly(dailyResult)

      let whnCreateLstArg = undefined
      let xInterval, whenCreatedData


      console.log('when created', whenCreated)
      console.log('week ago', Time.oneWeekAgo())

      if (moment(Time.firstOfMonth(whenCreated)).isSameOrBefore(Time.firstOfMonth(Time.aYearAgo()))) {
        xInterval = 'yearly'
        whenCreatedData = weeklyResult
        whenCreated = Time.firstOfMonth(whenCreated)

      } else if (moment(Time.firstOfMonth(whenCreated)).isSameOrBefore(Time.firstOfMonth(Time.sixMonthsAgo()))) {
        xInterval = 'yearly'
        whenCreatedData = weeklyResult
        whenCreated = Time.firstOfMonth(whenCreated)

      } else if (moment(whenCreated).isSameOrBefore(Time.oneWeekAgo())) {
        xInterval = 'monthly'
        whenCreatedData = dailyResult

      } else {
        xInterval = 'hourly'
        whenCreatedData = hourlyResult
        whnCreateLstArg = () => true
      }

      const returnObj = {
        aDayAgo: dataclean.windowPerform(hourlyResult, Time.aDayAgo(),'hourly', () => true),

        oneWeekAgo: dataclean.windowPerform(dailyResult,Time.oneWeekAgo(),'monthly'),

        oneMonthAgo: dataclean.windowPerform(dailyResult, Time.oneMonthAgo(), 'monthly'),

        sixMonthsAgo: dataclean.windowPerform(weeklyResult, Time.firstOfMonth(Time.sixMonthsAgo()), 'yearly'),

        oneYearAgo: dataclean.windowPerform(weeklyResult, Time.firstOfMonth(Time.aYearAgo()), 'yearly'),

        whenCreated: dataclean.windowPerform(whenCreatedData, whenCreated, xInterval, whnCreateLstArg)
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
