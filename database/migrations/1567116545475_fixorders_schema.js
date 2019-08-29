'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      table.dropColumn('customer')
      table.integer('customer_id')
    })
  }

  down () {
    this.table('orders', (table) => {
      // reverse alternations
    })
  }
}

module.exports = OrdersSchema
