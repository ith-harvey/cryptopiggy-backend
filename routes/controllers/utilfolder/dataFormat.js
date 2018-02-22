const Time = require('./time')
const moment = require('moment');


 let setWhnCreatedInfo = (whenCreated, data) => {

   // below function is correct. However, I discovered an issue with the cronjob. The day the account is created we need to be averaging and storing that day's values

   // Yes I can confirm there is an issue in cronjobs when the day of the account creation happens we are not averaging the 'daily' values and storing them.

   

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
