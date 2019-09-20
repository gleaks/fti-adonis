'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSystemSchema extends Schema {
  up () {
    this.raw('ALTER TABLE "order_system" RENAME TO "order_systems"')
  }

  down () {
  }
}

module.exports = OrderSystemSchema
