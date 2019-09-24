'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class System extends Model {
  mobos () {
    return this.manyThrough('App/Models/OrderSystem', 'mobos')
  }
}

module.exports = System
