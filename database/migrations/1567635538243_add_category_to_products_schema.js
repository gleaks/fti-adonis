'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddCategoryToProductsSchema extends Schema {
  up () {
    this.table('products', (table) => {
      table.string('category')
    })
  }

  down () {
    this.table('products', (table) => {
      table.dropColumn('category')
    })
  }
}

module.exports = AddCategoryToProductsSchema
