const promise = require('bluebird');

require('dotenv').config()

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);

const connectionString = `postgres://localhost/crypto_piggy`

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
      return db.any(`INSERT INTO ${table}${body}`)
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
