'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static get dates () {
    return super.dates.concat(['date'])
  }

  static castDates (field, value) {
    if (field === 'date') {
      return `${value.format('MMM Do, YYYY')}`
    }
    return super.formatDates(field, value)
  }
  user() {
    return this.belongsTo('App/Models/User');
  }
  customer() {
    return this.belongsTo('App/Models/Customer')
  }
  products() {
    return this.belongsToMany('App/Models/Product').withPivot(['count'])
  }
}

module.exports = Order
