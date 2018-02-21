const Time = require('./time')
const moment = require('moment');


 let setWhnCreatedInfo = (whenCreated, data) => {

   // let data = {
   //   hourly: hourlyResult,
   //   daily: dailyResult,
   //   weekly: dataclean.avgDailyToWeekly(data.daily.slice(0))
   // }

   let returnObj = {
     xInterval: '',
     data: '',
     whnCreateLstArg: undefined,
     whenCreated: ''
   }

   if (moment(Time.firstOfMonth(whenCreated)).isSameOrBefore(Time.firstOfMonth(Time.aYearAgo()))) {
     returnObj.xInterval = 'yearly'
     returnObj.data = data.weekly
     // returnObj.whenCreated = Time.firstOfMonth(whenCreated)

   } else if (moment(Time.firstOfMonth(whenCreated)).isSameOrBefore(Time.firstOfMonth(Time.sixMonthsAgo()))) {
     returnObj.xInterval = 'yearly'
     returnObj.data = data.weekly
     // returnObj.whenCreated = Time.firstOfMonth(whenCreated)

   } else if (moment(whenCreated).isSameOrBefore(Time.aDayAgo())) {
     returnObj.xInterval = 'monthly'
     returnObj.data = data.daily

   } else {
     returnObj.xInterval = 'hourly'
     returnObj.data = data.hourly
     returnObj.whnCreateLstArg = () => true
   }
   return returnObj
 }



module.exports = {
  setWhnCreatedInfo
}
