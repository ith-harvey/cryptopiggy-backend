const Resource = require('./_Resource')('performance_history')

class Performancehistory extends Resource {

  static savePrice (data) {
    return super.create(`(user_id, portfolio_value)
      VALUES ('${data.user_id}', '${data.portfolio_value}');`)
  }

  static getPerformanceWindow() {
    return super.findWhere()
  }

}

module.exports = Performancehistory
