'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSystemsSchema extends Schema {
  up () {
    this.table('order_systems', (table) => {
      table.string('description')
    })
  }

  down () {
    this.table('order_systems', (table) => {
      table.dropColumn('description')
    })
  }
}

module.exports = OrderSystemsSchema
