'use strict'

class CreateProduct {
  get rules () {
    return {
      name: 'required'
    }
  }
  get messages() {
    return {
      'required': 'Hold up, the {{ field }} is required.'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateProduct
