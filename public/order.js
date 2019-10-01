$(document).ready(function() {
    // Star Jquery-validation on the form
    $('#workOrderForm').validate()

    // Start the javascript datepicker plugin
    $('#newOrderDate').datepicker()

    // Start select2 javascript plugin on the Customer input
    $('.full-width:visible').select2()

    // Apply a jquery listener to dynamically added Delete buttons on each
    // row to remove the entire row.
    $('#workOrderForm').on('click', '.collapseToggle', function(e){
      e.preventDefault()
      target = $(this).attr('href')
      pane = $(this).closest('.tab-pane')
      pane.find(target).collapse('toggle')
      $(this).find('i').toggleClass('pg-arrow_minimize pg-arrow_right')
    })

    $('#workOrderForm').on('click', '.removeExternal', function(e){
      e.preventDefault()
      $(this).closest('.row').remove()
    })

    var num = 0
    var paneclass = 'active'
    if($('.tab-pane:last').attr('id') != 'system-example') {
      num = 1 + Number($('.tab-pane:last').attr('id').split('-')[1])
      paneclass = ''
    }
    $('.tab-pane:last').after($('#system-example').prop('outerHTML'))
    $('.tab-pane:last').attr('id', 'system-' + num).addClass(paneclass)
    $('.system-dropdown:last').select2()
    $('#workOrderForm').on('select2:select', '.system-dropdown', function(e) {
      num++
      newpane = 'system-' + num
      pane = $(e.target).closest('.tab-pane')
      pane.after($('#system-example').prop('outerHTML'))
      $('.tab-pane:last').attr('id', newpane)
      $('.nav-tabs li:last a').text(e.params.data.text)
      $('.nav-tabs li:last').after('<li><a data-toggle="tab" href="#' + newpane + '"><i class="pg-plus_circle"></i> Add a System</a></li>')
      newselect = $('.system-dropdown:last').select2({
        placeholder: 'System Type',
        allowClear: false
      })
      $(e.target).attr('name', 'systems[system-' + e.params.data.id + ']')
      switch(e.params.data.text) {
        case '2 Channel Testhead':
        case 'Upgrade Only':
          pane.find('.motherboards').show()
          // pane.find('#motherboardbCollapse').collapse()
          mba = pane.find('.motherboarda-dropdown').select2({
            placeholder: 'Motherboard Side A',
            allowClear: true
          })
          mba.on('select2:select', function(a) {
            $(a.target).attr('name', 'systems[system-' + e.params.data.id + '][motherboarda]')
            modules = pane.find('.motherboardaModules')
            pane.find('.motherboardaCollapse').show()
            modules.show()
            pane.find('#motherboardaCollapse').collapse('show')
            modules.find('.module-dropdown').attr('name', 'systems[system-' + e.params.data.id + '][motherboarda][modules]').select2({
              allowClear: true
            })
          })
          mbb = pane.find('.motherboardb-dropdown').select2({
            placeholder: 'Motherboard Side B',
            allowClear: true
          })
          mbb.on('select2:select', function(b) {
            $(b.target).attr('name', 'systems[system-' + e.params.data.id + '][motherboardb]')
            modules = pane.find('.motherboardbModules')
            pane.find('.motherboardbCollapse').show()
            modules.show()
            pane.find('#motherboardbCollapse').collapse('show')
            modules.find('.module-dropdown').attr('name', 'systems[system-' + e.params.data.id + '][motherboardb][modules]').select2({
              allowClear: true
            })
          })
          pane.find('.external').show()
          pane.find('.external-dropdown').attr('name', 'systems[system-' + e.params.data.id + '][externals]').select2({
            placeholder: 'External Module',
            allowClear: true
          })
          $('.addExternal').click(function(c){
            c.preventDefault()
            pane.find('.external').after($('#system-example .external').prop('outerHTML'))
            pane.find('.external:last').show()
            pane.find('.addExternal:last').removeClass('addExternal btn-info').addClass('removeExternal btn-danger').html('<i class="pg-minus_circle"></i> DEL')
            pane.find('.external-dropdown:last').attr('name', 'systems[system-' + e.params.data.id + '][externals]').select2({
              placeholder: 'External Module',
              allowClear: false
            })
          })
          break
        case 'Spares Kit':
          $('.motherboarda-dropdown:last').val('6').trigger('change').attr('name', 'systems[system-' + e.params.data.id + '][motherboarda]')
          $('.amodules:last').show()
          $('.amodules:last .module-dropdown').attr('name', 'systems[system-' + e.params.data.id + '][motherboarda][modules]')
          $('.amodules:last .module-dropdown').select2({
            placeholder: 'Select a Module',
            allowClear: true
          })
          break
        default:
          console.log('something went wrong')
          break
      }
    })
    $('#customerModalForm').submit(function(e){
      e.preventDefault()
      var form = $(this)
      var url = form.attr('action')

      $.ajax({
        type: 'POST',
        url: url,
        data: form.serialize(),
        success: function(data) {
          form.find('input[type=text], input[type=email], textarea').val('')
          $('#myModal').modal('hide')
          var newCustomer = new Option(data.name, data.id, true, true)
          $('#customerSelect').append(newCustomer).trigger('change')
          $('body').pgNotification({message: 'Your Customer has been created!'}).show()
        }
      })
    })
    $('#customerModalCancel').click(function(e){
      $(this).closest('form').find('input[type=text], input[type=email], textarea').val('')
    })
})
