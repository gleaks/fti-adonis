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

  async edit({view, params}) {
    var product = ''
    var text = ''
    switch(params.table) {
      case 'systems':
        product = await System.find(params.id)
        text = 'Base System'
        break
      case 'mobos':
        product = await Mobo.find(params.id)
        text = 'Motherboard'
        break
      case 'externals':
        product = await External.find(params.id)
        text = 'External Module / Accessory'
        break
      case 'modules':
        product = await Module.find(params.id)
        text = 'Internal Module'
        break
    }
    return view.render('products/edit', {
      product: product.toJSON(),
      table: params.table,
      text: text
    })
  }


  async create({ request, response, session, auth}) {
        const data = request.all()
        var product = ''
        var hasmobos = ''
        var ac = ''
        var ac1 = ''
        var ac2 = ''
        var ac3 = ''
        var ac4 = ''
        var ac5 = ''
        var dc = ''
        var dc1 = ''
        var dc2 = ''
        var dc3 = ''
        var dc4 = ''
        var dc5 = ''
        var ic = ''
        var ic1 = ''
        var ic2 = ''
        var ic3 = ''
        var ic4 = ''
        var ic5 = ''
        var ic6 = ''
        if(data.dc == 'on') {
          dc = true
        } else {
          dc = false
        }
        if(data.dc1 == 'on') {
          dc1 = true
        } else {
          dc1 = false
        }
        if(data.dc2 == 'on') {
          dc2 = true
        } else {
          dc2 = false
        }
        if(data.dc3 == 'on') {
          dc3 = true
        } else {
          dc3 = false
        }
        if(data.dc4 == 'on') {
          dc4 = true
        } else {
          dc4 = false
        }
        if(data.dc5 == 'on') {
          dc5 = true
        } else {
          dc5 = false
        }
        if(data.ac == 'on') {
          ac = true
        } else {
          ac = false
        }
        if(data.ac1 == 'on') {
          ac1 = true
        } else {
          ac1 = false
        }
        if(data.ac2 == 'on') {
          ac2 = true
        } else {
          ac2 = false
        }
        if(data.ac3 == 'on') {
          ac3 = true
        } else {
          ac3 = false
        }
        if(data.ac4 == 'on') {
          ac4 = true
        } else {
          ac4 = false
        }
        if(data.ac5 == 'on') {
          ac5 = true
        } else {
          ac5 = false
        }
        if(data.ic == 'on') {
          ic = true
        } else {
          ic = false
        }
        if(data.ic1 == 'on') {
          ic1 = true
        } else {
          ic1 = false
        }
        if(data.ic2 == 'on') {
          ic2 = true
        } else {
          ic2 = false
        }
        if(data.ic3 == 'on') {
          ic3 = true
        } else {
          ic3 = false
        }
        if(data.ic4 == 'on') {
          ic4 = true
        } else {
          ic4 = false
        }
        if(data.ic5 == 'on') {
          ic5 = true
        } else {
          ic5 = false
        }
        if(data.ic6 == 'on') {
          ic6 = true
        } else {
          ic6 = false
        }
        if(data.hasmobos == 'on') {
          hasmobos = true
        } else {
          hasmobos = false
        }
        switch(data.category) {
          case 'System':
            product = new System()
            product.hasmobos = hasmobos
            break
          case 'Mobo':
            product = new Mobo()
            product.mobotype = data.mobotype
            product.slots = data.slots
            break
          case 'External':
            product = new External()
            break
          case 'Module':
            product = new Module()
            product.dc = dc
            product.dc1 = dc1
            product.dc2 = dc2
            product.dc3 = dc3
            product.dc4 = dc4
            product.dc5 = dc5
            product.ac = ac
            product.ac1 = ac1
            product.ac2 = ac2
            product.ac3 = ac3
            product.ac4 = ac4
            product.ac5 = ac5
            product.ic = ic
            product.ic1 = ic1
            product.ic2 = ic2
            product.ic3 = ic3
            product.ic4 = ic4
            product.ic5 = ic5
            break
        }
        product.name = data.name
        product.description = data.description
        product.price = data.price
        product.partnum = data.partnum


        await product.save()

        session.flash({ message: 'Your Product has been created!'})
        return response.redirect('/products')
  }

  async update({ request, response, session, auth, params}) {
        const data = request.all()
        var product = ''
        var hasmobos = ''
        var ac = ''
        var ac1 = ''
        var ac2 = ''
        var ac3 = ''
        var ac4 = ''
        var ac5 = ''
        var dc = ''
        var dc1 = ''
        var dc2 = ''
        var dc3 = ''
        var dc4 = ''
        var dc5 = ''
        var ic = ''
        var ic1 = ''
        var ic2 = ''
        var ic3 = ''
        var ic4 = ''
        var ic5 = ''
        var ic6 = ''
        if(data.dc == 'on') {
          dc = true
        } else {
          dc = false
        }
        if(data.dc1 == 'on') {
          dc1 = true
        } else {
          dc1 = false
        }
        if(data.dc2 == 'on') {
          dc2 = true
        } else {
          dc2 = false
        }
        if(data.dc3 == 'on') {
          dc3 = true
        } else {
          dc3 = false
        }
        if(data.dc4 == 'on') {
          dc4 = true
        } else {
          dc4 = false
        }
        if(data.dc5 == 'on') {
          dc5 = true
        } else {
          dc5 = false
        }
        if(data.ac == 'on') {
          ac = true
        } else {
          ac = false
        }
        if(data.ac1 == 'on') {
          ac1 = true
        } else {
          ac1 = false
        }
        if(data.ac2 == 'on') {
          ac2 = true
        } else {
          ac2 = false
        }
        if(data.ac3 == 'on') {
          ac3 = true
        } else {
          ac3 = false
        }
        if(data.ac4 == 'on') {
          ac4 = true
        } else {
          ac4 = false
        }
        if(data.ac5 == 'on') {
          ac5 = true
        } else {
          ac5 = false
        }
        if(data.ic == 'on') {
          ic = true
        } else {
          ic = false
        }
        if(data.ic1 == 'on') {
          ic1 = true
        } else {
          ic1 = false
        }
        if(data.ic2 == 'on') {
          ic2 = true
        } else {
          ic2 = false
        }
        if(data.ic3 == 'on') {
          ic3 = true
        } else {
          ic3 = false
        }
        if(data.ic4 == 'on') {
          ic4 = true
        } else {
          ic4 = false
        }
        if(data.ic5 == 'on') {
          ic5 = true
        } else {
          ic5 = false
        }
        if(data.ic6 == 'on') {
          ic6 = true
        } else {
          ic6 = false
        }
        if(data.hasmobos == 'on') {
          hasmobos = true
        } else {
          hasmobos = false
        }
        switch(params.table) {
          case 'systems':
            product = await System.find(params.id)
            await product.merge({
                name: data.name,
                description: data.description,
                price: data.price,
                partnum: data.partnum,
                hasmobos: hasmobos
            })
            break
          case 'mobos':
            product = await Mobo.find(params.id)
            await product.merge({
                name: data.name,
                description: data.description,
                price: data.price,
                partnum: data.partnum,
                mobotype: data.mobotype,
                slots: data.slots
            })
            break
          case 'externals':
            product = await External.find(params.id)
            await product.merge({
                name: data.name,
                description: data.description,
                price: data.price,
                partnum: data.partnum
            })
            break
          case 'modules':
            product = await Module.find(params.id)
            await product.merge({
                name: data.name,
                description: data.description,
                price: data.price,
                partnum: data.partnum,
                dc: dc,
                dc1: dc1,
                dc2: dc2,
                dc3: dc3,
                dc4: dc4,
                dc5: dc5,
                ac: ac,
                ac1: ac1,
                ac2: ac2,
                ac3: ac3,
                ac4: ac4,
                ac5: ac5,
                ic: ic,
                ic1: ic1,
                ic2: ic2,
                ic3: ic3,
                ic4: ic4,
                ic5: ic5
            })
            break
        }
        await product.save()

        session.flash({ message: 'Your Product has been edited!'})
        return response.redirect('/products')
  }

  async delete({ response, session, params}) {
    var product = ''
    switch(params.table) {
      case 'systems':
        product = await System.find(params.id)
        break
      case 'mobos':
        product = await Mobo.find(params.id)
        break
      case 'externals':
        product = await External.find(params.id)
        break
      case 'modules':
        product = await Module.find(params.id)
        break
    }
        await product.delete()
        session.flash({ message: 'Your Product has been removed'})
        return response.redirect('back')
    }
}

module.exports = ProductController
