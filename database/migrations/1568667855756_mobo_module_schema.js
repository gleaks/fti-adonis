'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboModuleSchema extends Schema {
  up () {
    this.create('mobo_module', (table) => {
      table.increments()
      table.integer('mobo_id').references('id').inTable('mobos').onDelete('CASCADE')
      table.integer('module_id').references('id').inTable('modules').onDelete('CASCADE')
      table.integer('count')
      table.timestamps()
    })
  }

  down () {
    this.drop('mobo_modules')
  }
}

module.exports = MoboModuleSchema
