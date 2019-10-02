const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersRegistered(() => {
  const View = use('View')

  View.global('priceString', function (text) {
    return text.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  })
})
