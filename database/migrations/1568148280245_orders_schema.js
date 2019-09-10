'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      table.integer('customer_id').references('id').inTable('customers').onDelete('CASCADE').alter()
    })
  }

  down () {
    this.table('orders', (table) => {
      table.integer('customer_id').alter()
    })
  }
}

module.exports = OrdersSchema
