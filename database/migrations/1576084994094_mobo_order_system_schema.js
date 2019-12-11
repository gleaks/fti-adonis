'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboOrderSystemSchema extends Schema {
  up () {
    this.table('mobo_order_system', (table) => {
      table.string('description')
    })
  }

  down () {
    this.table('mobo_order_system', (table) => {
      table.dropColumn('description')
    })
  }
}

module.exports = MoboOrderSystemSchema
