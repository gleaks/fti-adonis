'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoreDetailsToOrdersSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      table.string('delivery')
      table.string('shipping')
      table.string('payment')
      table.text('description').alter()
    })
  }

  down () {
    this.table('orders', (table) => {
      table.dropColumn('delivery')
      table.dropColumn('shipping')
      table.dropColumn('payment')
      table.string('description').alter()
    })
  }
}

module.exports = MoreDetailsToOrdersSchema
