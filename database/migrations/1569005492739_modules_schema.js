'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ModulesSchema extends Schema {
  up () {
    this.table('modules', (table) => {
      table.string('partnum').alter()
    })
  }

  down () {
    this.table('modules', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ModulesSchema
