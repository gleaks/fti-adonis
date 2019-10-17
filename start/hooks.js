const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersRegistered(() => {
  const View = use('View')

  View.global('priceString', function (text) {
    a = parseInt(text)
    return a.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  })

  View.global('multilineBreak', function (text) {
    return text.replace(/(?:\\[rn])+/g, '<br />').replace(/['"]+/g, '');
  })
})
