'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExternalSystemSchema extends Schema {
  up () {
    this.create('external_system', (table) => {
      table.increments()
      table.integer('external_id').references('id').inTable('externals').onDelete('CASCADE')
      table.integer('order_system_id').references('id').inTable('order_system').onDelete('CASCADE')
      table.integer('count')
      table.timestamps()
    })
  }

  down () {
    this.drop('external_system')
  }
}

module.exports = ExternalSystemSchema
