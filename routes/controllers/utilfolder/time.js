const moment = require('moment');
const { Auth } = require('../../../db')


class Time {
  constructor() {}

  static setup(modifier) {

    if (modifier) this.today = new Date(modifier)
    else this.today = new Date()
  }

  static aYearAgo() {
    this.setup()
    let yearAgo = ((this.today.getFullYear()-1)+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate());
    return `'${moment(yearAgo, 'YYYY-MM-DD').format('MM/DD/YYYY')}'`;
  }

  static twoWeeksAgo() {
    this.setup(+new Date - 12096e5)
    let twoWeekDate = ((this.today.getFullYear())+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate());
    return `'${moment(twoWeekDate, 'YYYY-MM-DD').format('MM/DD/YYYY')}'`;
  }

  static oneMonthAgo() {
    this.setup()
    let oneMonthDate = ((this.today.getFullYear())+'-'+(this.today.getMonth())+'-'+this.today.getDate());
    return `'${moment(oneMonthDate, 'YYYY-MM-DD').format('MM/DD/YYYY')}'`;
  }

  static sixMonthsAgo() {
    this.setup()
    let sixMonthDate = ((this.today.getFullYear())+'-'+(this.today.getMonth()-5)+'-'+this.today.getDate());
    return `'${moment(sixMonthDate, 'YYYY-MM-DD').format('MM/DD/YYYY')}'`;
  }

  static justDate(date) {
    date = date.toString().split(' ').splice(1,3).join(' ')
    return moment(date, "MMM DD YYYY").format('MM/DD/YYYY')
  }

}

 module.exports = Time
