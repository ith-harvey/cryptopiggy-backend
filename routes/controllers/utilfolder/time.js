const moment = require('moment');
const { Auth } = require('../../../db')


class Time {
  constructor() {}

  static setup(modifier) {

    if (modifier) this.today = new Date(modifier)
    else this.today = new Date()
    this.time = '12:00:00'
  }

  static aYearAgo() {
    // returns A Year ago but on the 1st
    this.setup()
    let yearAgo = ((this.today.getFullYear()-1)+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate());
    return moment(yearAgo, 'YYYY-MM-DD 00:00:00').format('MM/DD/YYYY HH:mm:ss');
  }

  static oneWeekAgo() {
    this.setup(+new Date - 604800000)
    let oneWeekAgo = ((this.today.getFullYear())+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate());
    return moment(oneWeekAgo, 'YYYY-MM-DD 00:00:00').format('MM/DD/YYYY HH:mm:ss');
  }

  static twoWeeksAgo() {
    this.setup(+new Date - 1209600000)
    let twoWeeksAgo = ((this.today.getFullYear())+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate());
    return moment(twoWeeksAgo, 'YYYY-MM-DD 00:00:00').format('MM/DD/YYYY HH:mm:ss');
  }

  static aDayAgo() {
    this.setup(+new Date - 864e5)
    let aDayAgo = ((this.today.getFullYear())+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate()+' '+this.today.getHours()+':'+this.today.getMinutes()+':'+this.today.getSeconds());

    return moment(aDayAgo, 'YYYY-MM-DD HH:mm:ss').startOf('hour').format('MM/DD/YYYY HH:mm:ss');
  }

  static oneMonthAgo() {
    this.setup()
    let oneMonthDate = ((this.today.getFullYear())+'-'+(this.today.getMonth())+'-'+this.today.getDate());
    return moment(oneMonthDate, 'YYYY-MM-DD 00:00:00').format('MM/DD/YYYY HH:mm:ss');
  }

  static sixMonthsAgo() {
    // returns 6 Months ago but on the 1st
    this.setup()
    let sixMonthDate = this.today.setMonth(this.today.getMonth() - 6)
     // ((this.today.getFullYear())+'-'+(this.today.getMonth()-5)+'-'+this.today.getDate());
    console.log('in month generator', sixMonthDate)
    console.log('in month generator', typeof sixMonthDate)
    return moment(sixMonthDate, 'x').format('MM/DD/YYYY HH:mm:ss');
  }

  static reformat(date) {
    date = date.toString().split(' ').splice(1,4).join(' ')
    return moment(date, "MMM DD YYYY HH:mm:ss").format('MM/DD/YYYY HH:mm:ss')
  }

  static justTime(date) {
    date = date.toString().split(' ').splice(1).join()
    return date
  }

  static firstOfMonth(date) {
    date = moment(date, "MM/DD/YYYY HH:mm:ss").startOf('month').format('MM/DD/YYYY HH:mm:ss')
    return date
  }

  static addHourReformatResetToZeros(date) {
    date = moment(date, 'YYYY-MM-DD').add(1,'h').minutes(0).seconds(0).milliseconds(0)
    return this.reformat(date)
  }

}

 module.exports = Time
