const bcrypt = require('bcryptjs')
const moment = require('moment');

const { jwtUtils } = require('./utilfolder')
const { ethscan } = require('./utilfolder')
const { dataclean } = require('./utilfolder')
const { dataFormat } = require('./utilfolder')
const { Time } = require('./utilfolder')

const { PerformanceHistoryHourly } = require('../../db')
const { PerformanceHistoryDaily } = require('../../db')
const { Auth } = require('../../db')


function windowOfPerformance (req, res, next) {
  const id =  jwtUtils.parseToken(req.body.token).id.toString()
  Auth.getUserById(id).then( response => {
    
    let whenCreated = Time.addHourResetToZeros(response.created_at)

  PerformanceHistoryHourly.getWindow(id, whenCreated.hr).then( hourlyResult => {
    PerformanceHistoryDaily.getWindow(id, whenCreated.day).then( dailyResult => {
      let data = {
        hourly: hourlyResult,
        daily: dailyResult,
        weekly: dataclean.avgDailyToWeekly(dailyResult.slice(0))
      }

      let whnCreatedInfo = dataFormat.setWhnCreatedInfo(whenCreated, data)

      const returnObj = {
        aDayAgo: dataclean.windowPerform(data.hourly, Time.aDayAgo(),'hourly', () => true),

        oneWeekAgo: dataclean.windowPerform(data.daily, Time.oneWeekAgo(),'monthly'),

        oneMonthAgo: dataclean.windowPerform(data.daily, Time.oneMonthAgo(), 'monthly'),

        sixMonthsAgo: dataclean.windowPerform(data.weekly, Time.firstOfMonth(Time.sixMonthsAgo()), 'yearly'),

        oneYearAgo: dataclean.windowPerform(data.weekly, Time.firstOfMonth(Time.aYearAgo()), 'yearly'),

        whenCreated: dataclean.windowPerform(whnCreatedInfo.data, whnCreatedInfo.whenCreated, whnCreatedInfo.xInterval, whnCreatedInfo.whnCreateLstArg)
      }

      res.send(returnObj)

      /*returnObj = {
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
