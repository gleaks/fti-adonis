$(document).ready(function() {
  console.log($('.extended'))
  var price = 0
  var totalprice = 0
  var mtotalprice = 0
  for (moboprice of $('.moboprice')) {
    mobonumber = moboprice.classList[3].split('-')[1]
    moprice = parseInt(moboprice.textContent.replace(',', '').replace('$', '').replace('.00', ''))
    for (moduleprice of $('.mobo-' + mobonumber)) {
      mprice = parseInt(moduleprice.textContent.replace(',', '').replace('$', '').replace('.00', ''))
      if (mprice === mprice) {
        mtotalprice = mtotalprice + mprice
      }
    }
    mfinal = moprice + mtotalprice
    if(mfinal > 0) {
      $('.moboprice-' + mobonumber).text(mfinal.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      }))
    }
    mtotalprice = 0
  }
  for (extended of $('.extended')) {
    price = parseInt(extended.textContent.replace(',', '').replace('$', '').replace('.00', ''))
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
			let pdf = new jsPDF('p', 'mm', 'letter')
      var ratio = canvas.width/canvas.height
      var width = pdf.internal.pageSize.getWidth()
      var pageheight = pdf.internal.pageSize.getHeight()
      var height = width / ratio
      if(height > pageheight) {
        height = pageheight
        width = height * ratio
      }
			pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', 0, 0, width, height)
			pdf.save(filename)
		})
  })
})
