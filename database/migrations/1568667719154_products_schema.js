'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.drop('products')
  }

  down () {
  }
}

module.exports = ProductsSchema
