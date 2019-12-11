'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomSchema extends Schema {
  up () {
    this.create('customs', (table) => {
      table.increments()
      table.integer('order_id').references('id').inTable('orders').onDelete('CASCADE')
      table.string('name')
      table.decimal('price')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('customs')
  }
}

module.exports = CustomSchema
