'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSystemsSchema extends Schema {
  up () {
    this.table('order_systems', (table) => {
      table.decimal('price')
    })
  }

  down () {
    this.table('order_systems', (table) => {
      table.dropColumn('price')
    })
  }
}

module.exports = OrderSystemsSchema
