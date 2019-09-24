'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  // Add Order.date to the Adonis date formatter
  static get dates () {
    return super.dates.concat(['date'])
  }
  // Format & return Order.date as Sep 19th, 2019 as the default date style
  static castDates (field, value) {
    if (field === 'date') {
      return `${value.format('MMM Do, YYYY')}`
    }
    return super.formatDates(field, value)
  }
  // An order has a single user - that created it
  user() {
    return this.belongsTo('App/Models/User');
  }
  // An order has a single customer
  customer() {
    return this.belongsTo('App/Models/Customer')
  }
  systems() {
    return this.belongsToMany('App/Models/System').pivotModel('App/Models/OrderSystem')
  }
}

module.exports = Order
