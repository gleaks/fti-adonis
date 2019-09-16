'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class System extends Model {
  mobos() {
    return this.hasMany('App/Models/Mobo')
  }
  externals() {
    return this.hasMany('App/Models/External')
  }
  modules () {
    return this.manyThrough('App/Models/Mobo', 'modules')
  }
}

module.exports = System
