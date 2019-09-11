'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  // A Customer can have many different Orders
  orders() {
    return this.hasMany('App/Models/Order');
  }
}

module.exports = Customer
