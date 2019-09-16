'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Mobo extends Model {
  modules() {
    return this.hasMany('App/Models/Module')
  }
}

module.exports = Mobo
