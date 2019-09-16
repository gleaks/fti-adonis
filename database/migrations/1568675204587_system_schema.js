'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SystemSchema extends Schema {
  up () {
    this.create('systems', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.integer('partnum')
      table.float('price')
      table.boolean('haspc')
      table.boolean('hasmobos')
      table.timestamps()
    })
  }

  down () {
    this.drop('systems')
  }
}

module.exports = SystemSchema
