'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SystemsSchema extends Schema {
  up () {
    this.table('systems', (table) => {
      table.string('partnum').alter()
    })
  }

  down () {
    this.table('systems', (table) => {
      // reverse alternations
    })
  }
}

module.exports = SystemsSchema
