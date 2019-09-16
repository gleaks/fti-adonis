'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboSystemSchema extends Schema {
  up () {
    this.create('mobo_system', (table) => {
      table.increments()
      table.integer('mobo_id').references('id').inTable('mobos').onDelete('CASCADE')
      table.integer('system_id').references('id').inTable('systems').onDelete('CASCADE')
      table.integer('count')
      table.timestamps()
    })
  }

  down () {
    this.drop('mobo_systems')
  }
}

module.exports = MoboSystemSchema
