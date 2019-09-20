'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExternalsSchema extends Schema {
  up () {
    this.table('externals', (table) => {
      table.string('partnum').alter()
    })
  }

  down () {
    this.table('externals', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ExternalsSchema
