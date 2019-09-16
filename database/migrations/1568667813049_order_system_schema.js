'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSystemSchema extends Schema {
  up () {
    this.create('order_system', (table) => {
      table.increments()
      table.integer('order_id').references('id').inTable('orders').onDelete('CASCADE')
      table.integer('system_id').references('id').inTable('systems').onDelete('CASCADE')
      table.integer('count')
      table.timestamps()
    })
  }

  down () {
    this.drop('order_systems')
  }
}

module.exports = OrderSystemSchema
