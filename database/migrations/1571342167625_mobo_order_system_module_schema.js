'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboOrderSystemModuleSchema extends Schema {
  up () {
    this.table('mobo_order_system_module', (table) => {
      table.float('price')
    })
  }

  down () {
    this.table('mobo_order_system_module', (table) => {
      table.dropColumn('price')
    })
  }
}

module.exports = MoboOrderSystemModuleSchema
