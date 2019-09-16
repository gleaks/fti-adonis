'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SystemsSchema extends Schema {
  up () {
    this.create('systems', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.string('category')
      table.float('price')
      table.string('partnum')
      table.timestamps()
    })
  }

  down () {
    this.drop('systems')
  }
}

module.exports = SystemsSchema
