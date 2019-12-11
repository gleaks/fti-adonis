'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExternalOrderSystemSchema extends Schema {
  up () {
    this.table('external_order_system', (table) => {
      table.string('description')
    })
  }

  down () {
    this.table('external_order_system', (table) => {
      table.dropColumn('description')
    })
  }
}

module.exports = ExternalOrderSystemSchema
