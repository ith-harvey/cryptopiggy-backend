const moment = require('moment');
const { Auth } = require('../../../db')


class Time {
  constructor() {}

  static setup(modifier) {

    if (modifier) this.today = new Date(modifier)
    else this.today = new Date()
    this.time = '12:00:00'
  }

  static aYearAgo01() {
    // returns A Year ago but on the 1st
    this.setup()
    let yearAgo = ((this.today.getFullYear()-1)+'-'+(this.today.getMonth()+1)+'-'+this.today.setDate(1));
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

  static sixMonthsAgo01() {
    // returns 6 Months ago but on the 1st
    this.setup()
    let sixMonthDate = ((this.today.getFullYear())+'-'+(this.today.getMonth()-5)+'-'+this.today.setDate(2));
    console.log('should be the 1st!!', sixMonthDate)
    return moment(sixMonthDate, 'YYYY-MM-DD 00:00:00').format('MM/DD/YYYY HH:mm:ss');
  }

  static reformat(date) {
    date = date.toString().split(' ').splice(1,4).join(' ')
    return moment(date, "MMM DD YYYY HH:mm:ss").format('MM/DD/YYYY HH:mm:ss')
  }

  static justTime(date) {
    date = date.toString().split(' ').splice(1).join()
    return date
  }

}

 module.exports = Time
