$(document).ready(function() {
  console.log($('.extended'))
  var price = 0.0
  var totalprice = 0.0
  for (extended of $('.extended')) {
    price = parseFloat(extended.textContent.replace(',', '').replace('$', ''))
    if (price === price) {
      totalprice = totalprice + price
    }
  }
  $('.totalprice').text(totalprice.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  }))

  $('#printpdf').click(function(e) {
    e.preventDefault()
    const filename  = $('#quotenumber').text().trim() + '-quote.pdf'

		html2canvas(document.querySelector('#pdfpoint')).then(canvas => {
			let pdf = new jsPDF('p', 'mm', 'a3')
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0)
			pdf.save(filename)
		})
  })
})
