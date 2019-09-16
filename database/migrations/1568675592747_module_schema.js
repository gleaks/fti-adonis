'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ModuleSchema extends Schema {
  up () {
    this.create('modules', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.integer('partnum')
      table.float('price')
      table.string('mobo')
      table.timestamps()
    })
  }

  down () {
    this.drop('modules')
  }
}

module.exports = ModuleSchema
