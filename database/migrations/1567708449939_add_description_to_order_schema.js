'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddDescriptionToOrderSchema extends Schema {
  up () {
    this.table('orders', (table) => {
      table.string('description')
    })
  }

  down () {
    this.table('orders', (table) => {
      table.dropColumn('description')
    })
  }
}

module.exports = AddDescriptionToOrderSchema
