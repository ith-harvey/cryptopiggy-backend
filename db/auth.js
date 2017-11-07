const Resource = require('./_Resource')('users')

class Auth extends Resource {

  static getAllUsers () {
    return super.all()
  }

  static getUserByUsername (username) {
    return super.findWhere(`username = '${username}'`)
  }

  static createUser (user) {
    console.log('user', user)
    return super.create(`(username, hash_pass)
      VALUES ('${user.username}', '${user.hash_pass}')`)
  }
}

module.exports = Auth
