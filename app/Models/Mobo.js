'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Mobo extends Model {
  // modules() {
  //   return this.belongsToMany('App/Models/Module').withPivot(['count'])
  // }
}

module.exports = Mobo
