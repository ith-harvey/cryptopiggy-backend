var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = `"postgresql://postgres:postgres@cryptopiggy.chxcs4xgieuk.us-west-1.rds.amazonaws.com:5432/crypto_piggy";`
var db = pgp(connectionString);

function ResourceFactory (table) {
  class Resource {
    constructor () {}

    static all () {
      return db.any(`SELECT * FROM ${table}`)
    }

    static findById (body) {
      return db.one(`SELECT * FROM ${table} WHERE ${body}`)
    }

    static findWhere (body) {
      return db.any(`SELECT * FROM ${table} WHERE ${body}`)
    }

    static create (body) {
      return db.one(`INSERT INTO ${table}${body}`)
    }

    static createWhere (body, id) {
      // return db.none(`INSERT INTO ${table}${body} WHERE `)
    }

    static update (id, body) {
      // return db(table).update(body).where({ id }).returning('*')
    }

    static destroyById (id) {
      return db.none(`DELETE FROM ${table} WHERE id = ${id}`)
    }
  }

  return Resource
}

module.exports = ResourceFactory
