'use strict'

const Product = use('App/Models/Product')

class ProductController {
  async home({view}) {
    // Fetch orders
    const products = await Product.all();

    return view.render('products/index', {
      products: products.toJSON()
    });
  }

  async new({view}) {
    return view.render('products/new');
  }

  async edit({params, view}) {
    const product = await Product.find(params.id)
    return view.render('products/edit', {
      product: product.toJSON()
    });
  }


  async create({ request, response, session, auth}) {
        const product = request.all();

        const posted = await Product.create({
            name: product.name,
            description: product.description,
            price: product.price,
            partnum: product.partnum,
            category: product.category
        });

        session.flash({ message: 'Your Product has been created!' });
        return response.redirect('/products');
  }

  async update({ request, response, session, auth, params}) {
        const data = request.all();
        const product = await Product.find(params.id)

        const posted = await product.merge({
            name: data.name,
            description: data.description,
            price: data.price,
            partnum: data.partnum,
            category: data.category
        });
        product.save()

        session.flash({ message: 'Your Product has been edited!' });
        return response.redirect('/products');
  }

  async delete({ response, session, params}) {
        const product = await Product.find(params.id);

        await product.delete();
        session.flash({ message: 'Your Product has been removed'});
        return response.redirect('back');
    }
}

module.exports = ProductController
