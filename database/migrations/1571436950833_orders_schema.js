'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      table.boolean('showcontact')
    })
  }

  down () {
    this.table('orders', (table) => {
      table.dropColumn('showcontact')
    })
  }
}

module.exports = OrdersSchema
