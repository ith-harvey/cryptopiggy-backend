const Resource = require('./_Resource')('users')

class Auth extends Resource {

  static getAllUsers () {
    return super.all()
  }

  static getUserByUsername (username) {
    return super.findWhere(`username = '${username}'`)
  }

  static getUserById (id) {
    return super.findById(`id = ${id}`)
  }

  static createUser (user) {
    return super.create(`(username, hash_pass)
      VALUES ('${user.username}', '${user.hash_pass}') RETURNING ID`)
  }
}

module.exports = Auth
