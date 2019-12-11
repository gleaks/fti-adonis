'use strict'

const Order = use('App/Models/Order')
const Customer = use('App/Models/Customer')
const System = use('App/Models/System')
const Mobo = use('App/Models/Mobo')
const External = use('App/Models/External')
const Module = use('App/Models/Module')
const OrderSystem = use('App/Models/OrderSystem')
const MoboOrderSystem = use('App/Models/MoboOrderSystem')

class OrderController {
  async home({
    view
  }) {
    // Fetch all orders with their customer & products relationships
    const orders = await Order.query().with('customer').fetch()
    return view.render('index', {
      orders: orders.toJSON()
    })
  }

  async show({
    params,
    view
  }) {
    // Fetch order with its user, customer & products relationships
    const order = await Order.query().with('user').with('customer').where('id', params.id).first()
    const systems = await OrderSystem.query().with('system').with('externals').with('pivot.mobo').with('pivot.modules', (builder) => {
      builder.orderBy('slot', 'asc')
    }).where('order_id', params.id).fetch()
    // Cast date & break into multiple variables to make the Quote Number
    const date = new Date(order.date)
    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear().toString().substr(-2)
    // Get a full, properly formatted date for the "Date" portion of the work order
    const fulldate = date.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'})

    return view.render('orders/show', {
      order: order.toJSON(),
      systems: systems.toJSON(),
      loop: parseInt(0),
      day: day,
      month: month,
      year: year,
      fulldate: fulldate
    })
  }

  async workorder({
    params,
    view
  }) {
    // Fetch order with its user, customer & products relationships
    const order = await Order.query().with('user').with('customer').where('id', params.id).first()
    const systems = await OrderSystem.query().with('system').with('externals').with('pivot.mobo').with('pivot.modules').where('order_id', params.id).fetch()
    // Cast date & break into multiple variables to make the Quote Number
    const date = new Date(order.date)
    const day = ("0" + date.getDate()).slice(-2)
    const month = ("0" + (date.getMonth() + 1)).slice(-2)
    const year = date.getFullYear().toString().substr(-2)
    // Get a full, properly formatted date for the "Date" portion of the work order
    const fulldate = date.toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'})

    return view.render('orders/workorder', {
      order: order.toJSON(),
      systems: systems.toJSON(),
      loop: parseInt(0),
      day: day,
      month: month,
      year: year,
      fulldate: fulldate
    })
  }

  async new({
    view
  }) {
    const customers = await Customer.query().orderBy('name', 'asc').fetch()
    const systems = await System.query().orderBy('name', 'asc').fetch()
    const mobos = await Mobo.query().orderBy('name', 'asc').fetch()
    const externals = await External.query().orderBy('name', 'asc').fetch()
    const modules = await Module.query().orderBy('name', 'asc').fetch()
    const ac1modules = await Module.query().where('ac1', true).orderBy('name', 'asc').fetch()
    const ac2modules = await Module.query().where('ac2', true).orderBy('name', 'asc').fetch()
    const ac3modules = await Module.query().where('ac3', true).orderBy('name', 'asc').fetch()
    const ac4modules = await Module.query().where('ac4', true).orderBy('name', 'asc').fetch()
    const ac5modules = await Module.query().where('ac5', true).orderBy('name', 'asc').fetch()
    const dc1modules = await Module.query().where('dc1', true).orderBy('name', 'asc').fetch()
    const dc2modules = await Module.query().where('dc2', true).orderBy('name', 'asc').fetch()
    const dc3modules = await Module.query().where('dc3', true).orderBy('name', 'asc').fetch()
    const dc4modules = await Module.query().where('dc4', true).orderBy('name', 'asc').fetch()
    const dc5modules = await Module.query().where('dc5', true).orderBy('name', 'asc').fetch()
    const ic1modules = await Module.query().where('ic1', true).orderBy('name', 'asc').fetch()
    const ic2modules = await Module.query().where('ic2', true).orderBy('name', 'asc').fetch()
    const ic3modules = await Module.query().where('ic3', true).orderBy('name', 'asc').fetch()
    const ic4modules = await Module.query().where('ic4', true).orderBy('name', 'asc').fetch()
    const ic5modules = await Module.query().where('ic5', true).orderBy('name', 'asc').fetch()
    // const products = await Product.all()

    // Cast a new date of today to be used by the date form input
    const d = new Date(Date.now())
    const date = d.toLocaleDateString('en-US')

    return view.render('orders/new', {
      customers: customers.toJSON(),
      systems: systems.toJSON(),
      mobos: mobos.toJSON(),
      externals: externals.toJSON(),
      modules: modules.toJSON(),
      ac1modules: ac1modules.toJSON(),
      ac2modules: ac2modules.toJSON(),
      ac3modules: ac3modules.toJSON(),
      ac4modules: ac4modules.toJSON(),
      ac5modules: ac5modules.toJSON(),
      dc1modules: dc1modules.toJSON(),
      dc2modules: dc2modules.toJSON(),
      dc3modules: dc3modules.toJSON(),
      dc4modules: dc4modules.toJSON(),
      dc5modules: dc5modules.toJSON(),
      ic1modules: ic1modules.toJSON(),
      ic2modules: ic2modules.toJSON(),
      ic3modules: ic3modules.toJSON(),
      ic4modules: ic4modules.toJSON(),
      ic5modules: ic5modules.toJSON(),
      date: date
    })
  }

  async edit({
    params,
    view
  }) {
    const order = await Order.query().with('user').with('customer').where('id', params.id).first()
    const ordersystems = await OrderSystem.query().with('system').with('externals').with('pivot.mobo').with('pivot.modules').where('order_id', params.id).fetch()
    const customers = await Customer.query().orderBy('name', 'asc').fetch()
    const systems = await System.all()
    const mobos = await Mobo.all()
    const externals = await External.all()
    const modules = await Module.all()
    const ac1modules = await Module.query().where('ac1', true).orderBy('name', 'asc').fetch()
    const ac2modules = await Module.query().where('ac2', true).orderBy('name', 'asc').fetch()
    const ac3modules = await Module.query().where('ac3', true).orderBy('name', 'asc').fetch()
    const ac4modules = await Module.query().where('ac4', true).orderBy('name', 'asc').fetch()
    const ac5modules = await Module.query().where('ac5', true).orderBy('name', 'asc').fetch()
    const dc1modules = await Module.query().where('dc1', true).orderBy('name', 'asc').fetch()
    const dc2modules = await Module.query().where('dc2', true).orderBy('name', 'asc').fetch()
    const dc3modules = await Module.query().where('dc3', true).orderBy('name', 'asc').fetch()
    const dc4modules = await Module.query().where('dc4', true).orderBy('name', 'asc').fetch()
    const dc5modules = await Module.query().where('dc5', true).orderBy('name', 'asc').fetch()
    const ic1modules = await Module.query().where('ic1', true).orderBy('name', 'asc').fetch()
    const ic2modules = await Module.query().where('ic2', true).orderBy('name', 'asc').fetch()
    const ic3modules = await Module.query().where('ic3', true).orderBy('name', 'asc').fetch()
    const ic4modules = await Module.query().where('ic4', true).orderBy('name', 'asc').fetch()
    const ic5modules = await Module.query().where('ic5', true).orderBy('name', 'asc').fetch()
    // const products = await Product.all()

    // Cast a new date from the date in the database for the date form input
    const d = new Date(order.date)
    const date = d.toLocaleDateString('en-US')

    return view.render('orders/edit', {
      order: order.toJSON(),
      customers: customers.toJSON(),
      systems: systems.toJSON(),
      mobos: mobos.toJSON(),
      externals: externals.toJSON(),
      modules: modules.toJSON(),
      ordersystems: ordersystems.toJSON(),
      ac1modules: ac1modules.toJSON(),
      ac2modules: ac2modules.toJSON(),
      ac3modules: ac3modules.toJSON(),
      ac4modules: ac4modules.toJSON(),
      ac5modules: ac5modules.toJSON(),
      dc1modules: dc1modules.toJSON(),
      dc2modules: dc2modules.toJSON(),
      dc3modules: dc3modules.toJSON(),
      dc4modules: dc4modules.toJSON(),
      dc5modules: dc5modules.toJSON(),
      ic1modules: ic1modules.toJSON(),
      ic2modules: ic2modules.toJSON(),
      ic3modules: ic3modules.toJSON(),
      ic4modules: ic4modules.toJSON(),
      ic5modules: ic5modules.toJSON(),
      date: date
    })
  }

  async copy({
    response,
    session,
    params,
    request,
    auth
  }) {
    const old = await Order.query().with('user').with('customer').where('id', params.id).first()
    const systems = await OrderSystem.query().with('system').with('externals').with('pivot.mobo').with('pivot.modules', (builder) => {
      builder.orderBy('slot', 'asc')
    }).where('order_id', params.id).fetch()

    const oldorder = await old.toJSON()
    const oldsystems = await systems.toJSON()

    const d = new Date(Date.now())
    const today = d.toLocaleDateString('en-US')

    const neworder = await auth.user.orders().create({
      name: oldorder.name + ' (Copy)',
      customer_id: oldorder.customer.id,
      description: oldorder.description,
      date: d,
      status: oldorder.status,
      delivery: oldorder.delivery,
      shipping: oldorder.shipping,
      payment: oldorder.payment,
      showcontact: oldorder.showcontact
    })

    if((typeof oldsystems) != 'undefined') {
      for (var system in oldsystems) {
        const newsystem = await neworder.systems().attach(oldsystems[system].system.id, (row) => {
          row.price = oldsystems[system].price
        })

        const pivot = await OrderSystem.find(newsystem[0].id)

        for (var external in oldsystems[system].externals) {
          if (oldsystems[system].externals[external] != '') {
             await pivot.externals().attach(oldsystems[system].externals[external].id, (row) => {
               row.price = oldsystems[system].externals[external].pivot.price
             })
          }
        }

        for (var side in oldsystems[system].pivot) {
          const postedmb = await pivot.mobos().attach(oldsystems[system].pivot[side].mobo.id, (row) => {
            row.price = oldsystems[system].pivot[side].price
          })
          var pivotmb = await MoboOrderSystem.find(postedmb[0].id)
          for (var module in oldsystems[system].pivot[side].modules) {
            await pivotmb.modules().attach(oldsystems[system].pivot[side].modules[module].id, (row) => {
              row.slot = oldsystems[system].pivot[side].modules[module].pivot.slot,
              row.price = oldsystems[system].pivot[side].modules[module].pivot.price
            })
          }
        }
      }
    }

    const string = JSON.stringify(oldsystems[0].pivot[0].modules[0].pivot.price)

    session.flash({
      message: 'Quote #' + oldorder.id + ' was copied into this new quote!'
    })
    return response.redirect('/orders/edit/' + neworder.id)
  }

  async create({
    request,
    response,
    session,
    auth
  }) {
    const order = request.all()

    var showcontact = false
    if (order.showcontact == 'on') {
      showcontact = true
    }
    const posted = await auth.user.orders().create({
      name: order.name,
      customer_id: order.customer,
      description: order.description,
      date: order.date,
      status: order.status,
      delivery: order.delivery,
      shipping: order.shipping,
      payment: order.payment,
      showcontact: showcontact
    })
    var slot = 1
    // If there are actually some systems attached to the order do this
    if((typeof order.systems) != 'undefined') {
      // Loop through each system
      for (var system in order.systems) {
        // Attach a system
        const postedsystem = await posted.systems().attach(order.systems[system][0], (row) => {
          row.price = order.systems[system][1].replace(/,/g, ''),
          row.description = order.systems[system][2]
        })
        // Get the ID of the row from the order_system entry we just made
        const pivot = await OrderSystem.find(postedsystem[0].id)
        // Attach all externals
        for (var external in order.systems[system]['externals']) {
          if (order.systems[system]['externals'][external] != '') {
            if(order.systems[system]['externals'].length <= 1) {
              await pivot.externals().attach(order.systems[system]['externals'], (row) => {
                row.price = order.systems[system]['externalprices'].replace(/,/g, ''),
                row.description = order.systems[system]['externaldescriptions']
              })
            } else {
              await pivot.externals().attach(order.systems[system]['externals'][external], (row) => {
                row.price = order.systems[system]['externalprices'][external].replace(/,/g, ''),
                row.description = order.systems[system]['externaldescriptions'][external]
              })
            }
          }
        }
        // Loop through each level below system (motherboards then modules)
        for (var side in order.systems[system]) {
          if (side == 'motherboarda' || side == 'motherboardb') {
            // Attach the motherboard to the OrderSystem (the motherboard id is stored in [0], price in [1], description in [2])
            if (order.systems[system][side][0] != undefined) {
              const postedmb = await pivot.mobos().attach(order.systems[system][side][0], (row) => {
                row.price = order.systems[system][side][1].replace(/,/g, ''),
                row.description = order.systems[system][side][2]
              })
              // Get the ID of the row just created in MoboOrderSystem
              const pivotmb = await MoboOrderSystem.find(postedmb[0].id)
              slot = 1
              // Loop over the motherboards modules
              for (var module in order.systems[system][side]['modules']) {
                // If the result isn't empty (from a blank dropdown) then attach the module to the MoboOrderSystem
                if (order.systems[system][side]['modules'][module] != '') {
                  await pivotmb.modules().attach(order.systems[system][side]['modules'][module], (row) => {
                    row.slot = slot,
                    row.price = order.systems[system][side]['moduleprices'][module].replace(/,/g, ''),
                    row.description = order.systems[system][side]['moduledescriptions'][module]
                  })
                }
                slot++
              }
            }
          }
        }
      }
    }
    session.flash({
      message: 'Your Quote has been created!'
    })
    return response.redirect('/orders/' + posted.id)
  }

  async update({
    request,
    response,
    session,
    auth,
    params
  }) {
    const data = request.all()
    const order = await Order.find(params.id)

    var showcontact = false
    if (data.showcontact == 'on') {
      showcontact = true
    }

    const posted = await order.merge({
      name: data.name,
      customer_id: data.customer,
      description: data.description,
      date: data.date,
      status: data.status,
      delivery: data.delivery,
      shipping: data.shipping,
      payment: data.payment,
      showcontact: showcontact
    })
    var slot = 1
    await order.systems().detach()
    if((typeof data.systems) != 'undefined') {
      // Loop through each system
      for (var system in data.systems) {
        if (data.systems[system][0] != '') {
          // Attach a system
          const postedsystem = await order.systems().attach(data.systems[system][0], (row) => {
            row.price = data.systems[system][1].replace(/,/g, ''),
            row.description = data.systems[system][2]
          })
          // Get the ID of the row from the order_system entry we just made
          const pivot = await OrderSystem.find(postedsystem[0].id)
          // Attach all externals
          for (var external in data.systems[system]['externals']) {
            if (data.systems[system]['externals'][external] != '') {
              if(data.systems[system]['externals'].length <= 1) {
                await pivot.externals().attach(data.systems[system]['externals'], (row) => {
                  row.price = data.systems[system]['externalprices'].replace(/,/g, ''),
                  row.description = data.systems[system]['externaldescriptions']
                })
              } else {
                await pivot.externals().attach(data.systems[system]['externals'][external], (row) => {
                  row.price = data.systems[system]['externalprices'][external].replace(/,/g, ''),
                  row.description = data.systems[system]['externaldescriptions'][external]
                })
              }
            }
          }
          // Loop through each level below system (motherboards then modules)
          for (var side in data.systems[system]) {
            if (side == 'motherboarda' || side == 'motherboardb') {
              // Attach the motherboard to the OrderSystem (the motherboard id is stored in [0], its modules stored in [1])
              if (typeof data.systems[system][side]['modules'] !== 'undefined') {
                const postedmb = await pivot.mobos().attach(data.systems[system][side][0], (row) => {
                  row.price = data.systems[system][side][1].replace(/,/g, ''),
                  row.description = data.systems[system][side][2]
                })
                // Get the ID of the row just created in MoboOrderSystem
                const pivotmb = await MoboOrderSystem.find(postedmb[0].id)
                slot = 1
                if (data.systems[system][side] != undefined) {
                // Loop over the motherboards modules
                  for (var module in data.systems[system][side]['modules']) {
                    // If the result isn't empty (from a blank dropdown) then attach the module to the MoboOrderSystem
                    if (data.systems[system][side]['modules'][module] != '') {
                      await pivotmb.modules().attach(data.systems[system][side]['modules'][module], (row) => {
                        row.slot = slot,
                        row.price = data.systems[system][side]['moduleprices'][module].replace(/,/g, ''),
                        row.description = data.systems[system][side]['moduledescriptions'][module]
                      })
                    }
                    slot++
                  }
                }
              }
            }
          }
        }
      }
    }
    await order.save()

    session.flash({
      message: 'Your Quote has been edited!'
    })
    return response.redirect('/orders/' + order.id)
  }

  async delete({
    response,
    session,
    params,
    request
  }) {
    const order = await Order.find(params.id)

    await order.delete()
    session.flash({
      message: 'Your Quote has been archived!'
    })

    // If the source of the delete action came from the index stay there instead of refreshing
    // but if it came from another page then reload the root page
    if(params.from == 'index') {
      return response.redirect('back')
    } else {
      return response.redirect('/')
    }

  }
}

module.exports = OrderController
