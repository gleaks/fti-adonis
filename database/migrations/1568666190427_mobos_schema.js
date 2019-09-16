'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MobosSchema extends Schema {
  up () {
    this.create('mobos', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.string('category')
      table.integer('slots')
      table.float('price')
      table.string('partnum')
      table.timestamps()
    })
  }

  down () {
    this.drop('mobos')
  }
}

module.exports = MobosSchema
