'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomSchema extends Schema {
  up () {
    this.table('customs', (table) => {
      table.dropColumn('order_id')
      table.integer('order_system_id').references('id').inTable('order_systems').onDelete('CASCADE')
    })
  }

  down () {
    this.table('customs', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CustomSchema
