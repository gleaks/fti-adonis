'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboOrderSystemSchema extends Schema {
  up () {
    this.table('mobo_order_system', (table) => {
      table.float('price')
    })
  }

  down () {
    this.table('mobo_order_system', (table) => {
      table.dropColumn('price')
    })
  }
}

module.exports = MoboOrderSystemSchema
