'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboOrderSystemModuleSchema extends Schema {
  up () {
    this.table('mobo_order_system_module', (table) => {
      table.dropColumn('mobo_system_id')
      table.integer('mobo_order_system_id').references('id').inTable('mobo_order_system').onDelete('CASCADE')
    })
  }

  down () {
    this.table('mobo_order_system_module', (table) => {
      // reverse alternations
    })
  }
}

module.exports = MoboOrderSystemModuleSchema
