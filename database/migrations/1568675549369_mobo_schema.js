'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MoboSchema extends Schema {
  up () {
    this.create('mobos', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.integer('partnum')
      table.float('price')
      table.string('type')
      table.timestamps()
    })
  }

  down () {
    this.drop('mobos')
  }
}

module.exports = MoboSchema
