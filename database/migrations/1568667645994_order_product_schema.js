'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderProductSchema extends Schema {
  up () {
    this.drop('order_product')
  }

  down () {
  }
}

module.exports = OrderProductSchema
