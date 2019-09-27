'use strict'

const Customer = use('App/Models/Customer')

class CustomerController {
  async home({view}) {
    // Fetch orders
    const customers = await Customer.all()

    return view.render('customers/index', {
      customers: customers.toJSON()
    })
  }

  async new({view}) {
    return view.render('customers/new')
  }

  async edit({params, view}) {
    const customer = await Customer.find(params.id)
    return view.render('customers/edit', {
      customer: customer.toJSON()
    })
  }

  async create({ request, response, session, auth}) {
        const customer = request.all()

        const posted = await Customer.create({
            name: customer.name,
            address: customer.address,
            contact: customer.contact,
            email: customer.email,
            phone: customer.phone
        })

        session.flash({ message: 'Your Customer has been created!' })
        return response.redirect('/customers')
  }

  async update({ request, response, session, auth, params }) {
        const data = request.all()
        const customer = await Customer.find(params.id)

        const posted = await customer.merge({
            name: data.name,
            address: data.address,
            contact: data.contact,
            email: data.email,
            phone: data.phone
        })

        await customer.save()

        session.flash({ message: 'Your Customer has been edited!' })
        return response.redirect('/customers')
  }

  async delete({ response, session, params}) {
        const customer = await Customer.find(params.id)

        await customer.delete()
        session.flash({ message: 'Your Customer has been removed'})
        return response.redirect('back')
  }

  async remote({ request, response, session, params }) {
    const customer = request.all()

    const posted = await Customer.create({
        name: customer.name,
        address: customer.address,
        contact: customer.contact,
        email: customer.email,
        phone: customer.phone
    })

    // session.flash({ message: 'Your Customer has been created!' })
    return response.send(posted)
  }
}

module.exports = CustomerController
