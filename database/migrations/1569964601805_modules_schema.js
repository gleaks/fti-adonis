'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ModulesSchema extends Schema {
  up () {
    this.table('modules', (table) => {
      table.boolean('ac')
      table.boolean('dc')
      table.boolean('ic')
      table.boolean('ac1')
      table.boolean('ac2')
      table.boolean('ac3')
      table.boolean('ac4')
      table.boolean('ac5')
      table.boolean('dc1')
      table.boolean('dc2')
      table.boolean('dc3')
      table.boolean('dc4')
      table.boolean('dc5')
      table.boolean('ic1')
      table.boolean('ic2')
      table.boolean('ic3')
      table.boolean('ic4')
      table.boolean('ic5')
    })
  }

  down () {
    this.table('modules', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ModulesSchema
