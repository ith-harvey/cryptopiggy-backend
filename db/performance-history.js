const Resource = require('./_Resource')('performance_history')
const promise = require('bluebird');
require('dotenv').config()

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);

// const connectionString = `postgres://localhost/crypto_piggy`
const connectionString = `postgresql://${process.env.POSTGRESQL_USERANDPASS}@cryptopiggy.chxcs4xgieuk.us-west-1.rds.amazonaws.com:5432/crypto_piggy`


const db = pgp(connectionString);

class Performancehistory extends Resource {

  static savePrice (data, created_at) {
    console.log('data coming in!! ', data)
    return super.create(`(user_id, portfolio_value, amount_eth, created_at)
      VALUES ('${data.user_id}', '${data.portfolio_value}', '${data.amount_eth}', '${created_at}');`)
  }

  static getWindow(user_id, maxPerfWindow) {
    return db.any(`SELECT * FROM performance_history
      WHERE user_id = ${user_id}
      AND created_at >= '${maxPerfWindow}';`)
  }


}

module.exports = Performancehistory
