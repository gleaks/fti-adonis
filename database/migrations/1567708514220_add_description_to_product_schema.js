'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddDescriptionToProductSchema extends Schema {
  up () {
    this.table('products', (table) => {
      table.string('description')
      table.string('partnum')
    })
  }

  down () {
    this.table('products', (table) => {
      table.dropColumn('description')
      table.dropColumn('partnum')
    })
  }
}

module.exports = AddDescriptionToProductSchema
