'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboSystemSchema extends Schema {
  up () {
    this.create('mobo_system', (table) => {
      table.increments()
      table.integer('mobo_id').references('id').inTable('mobos').onDelete('CASCADE')
      table.integer('order_system_id').references('id').inTable('order_system').onDelete('CASCADE')
      table.integer('count')
      table.timestamps()
    })
  }

  down () {
    this.drop('mobo_system')
  }
}

module.exports = MoboSystemSchema
