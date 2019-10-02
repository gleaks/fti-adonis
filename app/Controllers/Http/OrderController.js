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
    const systems = await OrderSystem.query().with('system').with('externals').with('pivot.mobo').with('pivot.modules').where('order_id', params.id).fetch()
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

  async new({
    view
  }) {
    const customers = await Customer.query().orderBy('name', 'asc').fetch()
    const systems = await System.all()
    const mobos = await Mobo.all()
    const externals = await External.all()
    const modules = await Module.all()
    const ac1modules = await Module.query().where('ac1', true).fetch()
    const ac2modules = await Module.query().where('ac2', true).fetch()
    const ac3modules = await Module.query().where('ac3', true).fetch()
    const ac4modules = await Module.query().where('ac4', true).fetch()
    const ac5modules = await Module.query().where('ac5', true).fetch()
    const dc1modules = await Module.query().where('dc1', true).fetch()
    const dc2modules = await Module.query().where('dc2', true).fetch()
    const dc3modules = await Module.query().where('dc3', true).fetch()
    const dc4modules = await Module.query().where('dc4', true).fetch()
    const dc5modules = await Module.query().where('dc5', true).fetch()
    const ic1modules = await Module.query().where('ic1', true).fetch()
    const ic2modules = await Module.query().where('ic2', true).fetch()
    const ic3modules = await Module.query().where('ic3', true).fetch()
    const ic4modules = await Module.query().where('ic4', true).fetch()
    const ic5modules = await Module.query().where('ic5', true).fetch()
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
      date: date
    })
  }

  async create({
    request,
    response,
    session,
    auth
  }) {
    const order = request.all()

    const posted = await auth.user.orders().create({
      name: order.name,
      customer_id: order.customer,
      description: order.description,
      date: order.date,
      status: order.status,
      delivery: order.delivery,
      shipping: order.shipping,
      payment: order.payment
    })
    var test = ''
    // If there are actually some systems attached to the order do this
    if((typeof order.systems) != 'undefined') {
      // Loop through each system
      for (var system in order.systems) {
        // Attach a system (split the text because data comes in as system-23)
        const postedsystem = await posted.systems().attach(order.systems[system][0])
        // Get the ID of the row from the order_system entry we just made
        const pivot = await OrderSystem.find(postedsystem[0].id)
        // Attach all externals
        for (var external in order.systems[system][1]['externals']) {
          if (external != '') {
             await pivot.externals().attach(order.systems[system][1]['externals'][external])
          }
        }
        // Loop through each level below system (motherboards & externals)
        for (var side in order.systems[system]) {
          if (side == 'motherboarda' || side == 'motherboardb') {
            // Attach the motherboard to the OrderSystem (the motherboard id is stored in [0], its modules stored in [1])
            if(order.systems[system][side][0] != undefined) {
              const postedmb = await pivot.mobos().attach(order.systems[system][side][0])
              // Get the ID of the row just created in MoboOrderSystem
              const pivotmb = await MoboOrderSystem.find(postedmb[0].id)
              // Loop over the motherboards modules
              for (var module in order.systems[system][side][1]['modules']) {
                // If the result isn't empty (from a blank dropdown) then attach the module to the MoboOrderSystem
                if (module != '') {
                  pivotmb.modules().attach(order.systems[system][side][1]['modules'][module])
                }
              }
            }
          }
        }
      }
    }
    session.flash({
      message: 'Your Work Order has been created!'
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

    const posted = await order.merge({
      name: data.name,
      customer_id: data.customer,
      description: data.description,
      date: data.date,
      status: data.status,
      delivery: data.delivery,
      shipping: data.shipping,
      payment: data.payment
    })
    await order.save()

    // De-associate all the old products with this order and associate all the new products in the form
    // await order.products().detach()
    // await order.products().attach(data.products)

    session.flash({
      message: 'Your Work Order has been edited!'
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
      message: 'Your Work Order has been archived!'
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
