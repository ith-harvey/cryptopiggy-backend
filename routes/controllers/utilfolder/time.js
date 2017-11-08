class Time {
  constructor() {}

  static setup(modifier) {

    if (modifier) this.today = new Date(modifier)
    else this.today = new Date()

    this.time = this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
  }

  static aYearAgo() {
    this.setup()
    console.log('new attempting to get full year', this.today)
    let yearAgo = ((this.today.getFullYear()-1)+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate());
    return `'${yearAgo} ${this.time}'`;
  }

  static twoWeeksAgo() {
    this.setup(+new Date - 12096e5)
    console.log('new attempting to get two weeks year', this.today)
    let yearAgo = ((this.today.getFullYear())+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate());
    return `'${yearAgo} ${this.time}'`;
  }

  static oneMonthAgo() {
    this.setup()
    console.log('new attempting to one month ago', this.today)
    let yearAgo = ((this.today.getFullYear())+'-'+(this.today.getMonth())+'-'+this.today.getDate());
    return `'${yearAgo} ${this.time}'`;
  }

  static sixMonthsAgo() {
    this.setup()
    console.log('new attempting to get full year', this.today)
    let yearAgo = ((this.today.getFullYear())+'-'+(this.today.getMonth()-5)+'-'+this.today.getDate());
    return `'${yearAgo} ${this.time}'`;
  }
}

 module.exports = Time
