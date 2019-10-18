'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExternalOrderSystemSchema extends Schema {
  up () {
    this.raw('ALTER TABLE "external_order_system" ALTER COLUMN "price" TYPE DECIMAL(10,2);')
  }

  down () {
  }
}

module.exports = ExternalOrderSystemSchema
