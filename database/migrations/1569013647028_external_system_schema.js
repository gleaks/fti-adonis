'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExternalSystemSchema extends Schema {
  up () {
    this.raw('ALTER TABLE "external_system" RENAME TO "external_order_system"')
  }

  down () {
  }
}

module.exports = ExternalSystemSchema
