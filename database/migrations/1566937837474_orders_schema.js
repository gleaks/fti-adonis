'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.string('name')
      table.string('customer')
      table.date('date')
      table.float('total')
      table.string('status')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
