const Resource = require('./_Resource')('performance_history')
const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = `postgres://localhost/crypto_piggy`
const db = pgp(connectionString);


class Performancehistory extends Resource {

  static savePrice (data) {
    return super.create(`(user_id, portfolio_value)
      VALUES ('${data.user_id}', '${data.portfolio_value}');`)
  }

  static getWindow(user_id, maxPerfWindow) {
    return db.any(`SELECT * FROM performance_history
      WHERE user_id = ${user_id}
      AND created_at >= ${maxPerfWindow};`)
  }


}

module.exports = Performancehistory
