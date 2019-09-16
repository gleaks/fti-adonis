'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ModulesSchema extends Schema {
  up () {
    this.create('modules', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.string('mobo')
      table.integer('slot')
      table.float('price')
      table.string('partnum')
      table.timestamps()
    })
  }

  down () {
    this.drop('modules')
  }
}

module.exports = ModulesSchema
