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

    // let whenCreated = moment(response.created_at, 'YYYY-MM-DD').add(1,'h').minutes(0).format('MM/DD/YYYY hh:mm:ss')

    let whenCreated = Time.reformat(response.created_at)
    console.log('when created formated correctly: ', whenCreated)


  PerformanceHistoryHourly.getWindow(id, whenCreated).then( hourlyResult => {
    PerformanceHistoryDaily.getWindow(id, whenCreated).then( dailyResult => {

      let weeklyResult = dataclean.avgDailyToWeekly(dailyResult)

      let whnCreateLstArg = undefined
      let xInterval, whenCreatedData


      // if whenCreated is before 1 day ago -> track hourly
      // else -> track daily

      console.log('work for if', moment(Time.firstOfMonth(whenCreated)))

      console.log('time that gets us in trouble', Time.firstOfMonth(Time.sixMonthsAgo()))

      if (moment(Time.firstOfMonth(whenCreated)).isSameOrBefore(Time.firstOfMonth(Time.aYearAgo()))) {
        xInterval = 'yearly'
        whenCreatedData = weeklyResult
        whenCreated = Time.firstOfMonth(whenCreated)
        console.log('when created match 1:', whenCreated)

      } else if (moment(Time.firstOfMonth(whenCreated)).isSameOrBefore(Time.firstOfMonth(Time.sixMonthsAgo()))) {
        xInterval = 'yearly'
        whenCreatedData = weeklyResult
        whenCreated = Time.firstOfMonth(whenCreated)
        console.log('when created match 2:', whenCreated)

      } else if (moment(whenCreated).isSameOrBefore(Time.oneMonthAgo())) {
        xInterval = 'monthly'
        whenCreatedData = dailyResult
        console.log('when created match 3:', whenCreated)

      } else {
        xInterval = 'hourly'
        whenCreatedData = hourlyResult
        console.log('when created match 4:', whenCreated)
        whnCreateLstArg = () => true
      }


      const returnObj = {
        aDayAgo: dataclean.windowPerform(hourlyResult, Time.aDayAgo(),'hourly', () => true),

        oneWeekAgo: dataclean.windowPerform(dailyResult,Time.oneWeekAgo(),'monthly'),

        oneMonthAgo: dataclean.windowPerform(dailyResult, Time.oneMonthAgo(), 'monthly'),

        sixMonthsAgo: dataclean.windowPerform(weeklyResult, Time.firstOfMonth(Time.sixMonthsAgo()), 'yearly'),

        oneYearAgo: dataclean.windowPerform(weeklyResult, Time.firstOfMonth(Time.aYearAgo()), 'yearly'),

        whenCreated: dataclean.windowPerform(whenCreatedData, whenCreated, xInterval , whnCreateLstArg)
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
