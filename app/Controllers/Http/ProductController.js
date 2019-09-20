'use strict'

const System = use('App/Models/System')
const Mobo = use('App/Models/Mobo')
const Module = use('App/Models/Module')
const External = use('App/Models/External')

class ProductController {
  async home({view}) {
    // Fetch orders
    const systems = await System.all()
    const mobos = await Mobo.all()
    const modules = await Module.all()
    const externals = await External.all()

    return view.render('products/index', {
      systems: systems.toJSON(),
      mobos: mobos.toJSON(),
      modules: modules.toJSON(),
      externals: externals.toJSON()
    })
  }

  async new({view}) {
    return view.render('products/new')
  }

  async edit({params, view}) {
    const product = await Product.find(params.id)
    return view.render('products/edit', {
      product: product.toJSON()
    })
  }


  async create({ request, response, session, auth}) {
        const data = request.all()
        var product = ''
        switch(data.category) {
          case 'System':
            product = new System()
            break
          case 'Mobo':
            product = new Mobo()
            break
          case 'External':
            product = new External()
            break
          case 'Module':
            product = new Module()
            break
        }
        product.name = data.name
        product.description = data.description
        product.price = data.price
        product.partnum = data.partnum

        await product.save()

        session.flash({ message: 'Your Product has been created!' })
        return response.redirect('/products')
  }

  async update({ request, response, session, auth, params}) {
        const data = request.all()
        const product = await Product.find(params.id)

        const posted = await product.merge({
            name: data.name,
            description: data.description,
            price: data.price,
            partnum: data.partnum,
            category: data.category
        })
        product.save()

        session.flash({ message: 'Your Product has been edited!' })
        return response.redirect('/products')
  }

  async delete({ response, session, params}) {
        const product = await Product.find(params.id)

        await product.delete()
        session.flash({ message: 'Your Product has been removed'})
        return response.redirect('back')
    }
}

module.exports = ProductController
