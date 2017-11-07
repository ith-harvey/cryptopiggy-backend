const Resource = require('./_Resource')('addresses')

class Address extends Resource {

  static getAddressesByUserID (id) {
    return super.findWhere(`user_id = '${id}'`)
  }

  static create (data) {
    return super.create(`(user_id, address)
      VALUES ('${data.user_id}', '${data.address}')`)
  }

  static delete (id) {
    return super.destroyById(id)
  }

}

module.exports = Address
