'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MobosSchema extends Schema {
  up () {
    this.table('mobos', (table) => {
      table.string('mobotype')
      table.integer('slots')
    })
  }

  down () {
    this.table('mobos', (table) => {
      table.dropColumn('type')
      table.dropColumn('slots')
    })
  }
}

module.exports = MobosSchema
