'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MobosSchema extends Schema {
  up () {
    this.table('mobos', (table) => {
      table.string('partnum').alter()
    })
  }

  down () {
    this.table('mobos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = MobosSchema
