'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      table.string('notes')
    })
  }

  down () {
    this.table('orders', (table) => {
      table.dropColumn('notes')
    })
  }
}

module.exports = OrderSchema
