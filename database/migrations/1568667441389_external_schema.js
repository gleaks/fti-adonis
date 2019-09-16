'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExternalSchema extends Schema {
  up () {
    this.create('externals', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.string('category')
      table.float('price')
      table.timestamps()
    })
  }

  down () {
    this.drop('externals')
  }
}

module.exports = ExternalSchema
