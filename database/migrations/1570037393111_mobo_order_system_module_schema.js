'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboOrderSystemModuleSchema extends Schema {
  up () {
    this.table('mobo_order_system_module', (table) => {
      table.integer('slot')
    })
  }

  down () {
    this.table('mobo_order_system_module', (table) => {
      // reverse alternations
    })
  }
}

module.exports = MoboOrderSystemModuleSchema
