'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboModuleSchema extends Schema {
  up () {
    this.create('mobo_modules', (table) => {
      table.increments()
      table.integer('module_id').references('id').inTable('modules').onDelete('CASCADE')
      table.integer('mobo_system_id').references('id').inTable('mobo_system').onDelete('CASCADE')
      table.integer('count')
      table.timestamps()
    })
  }

  down () {
    this.drop('mobo_modules')
  }
}

module.exports = MoboModuleSchema
