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

    var num = 0
    var paneclass = 'active'
    if($('.tab-pane:last').attr('id') != 'system-example') {
      console.log('last is not system-example and the num is' + num)
      num = 1 + Number($('.tab-pane:last').attr('id').split('-')[1])
      paneclass = ''
    }
    $('.tab-pane:last').after($('#system-example').prop('outerHTML'))
    console.log('the number is now' + num)
    $('.tab-pane:last').attr('id', 'system-' + num).addClass(paneclass)
    $('.system-dropdown:last').select2()

    $('#workOrderForm').on('select2:selecting', '.system-dropdown', function(e) {
      pane = $(e.target).closest('.tab-pane')
      if($(this).val() == '') {
        newpane = 'system-' + (parseInt(num) + 1)
        pane.after($('#system-example').prop('outerHTML'))
        $('.tab-pane:last').attr('id', newpane)
        $('.nav-tabs li:last a').text(e.params.args.data.text)
        $('.nav-tabs li:last').after('<li><a data-toggle="tab" href="#' + newpane + '"><i class="pg-plus_circle"></i> Add a System</a></li>')
        $('.system-dropdown:last').select2()
        $(e.target).attr('name', 'systems[system-' + num + ']')
      } else {
        link = pane.attr('id')
        console.log(link)
        $('.nav-tabs a[href="#' + link + '"]').text(e.params.args.data.text)
      }
      switch(e.params.args.data.text) {
        case '2 Channel Testhead':
        case 'Upgrade Only':
          pane.find('.motherboards').show()
          pane.find('.motherboarda-dropdown').val('').trigger('change').attr('name', 'systems[system-' + num + '][motherboarda]').select2()
          pane.find('.motherboardb-dropdown').val('').trigger('change').attr('name', 'systems[system-' + num + '][motherboardb]').select2()
          pane.find('.external').show()
          pane.find('.external-dropdown').val('').trigger('change').attr('name', 'systems[system-' + num + '][externals]').select2()
          pane.find('.external:not(:first)').remove()
          pane.find('.module-dropdown').val('').trigger('change')
          pane.find('#motherboardaCollapse').collapse('hide')
          pane.find('.motherboardaCollapse').hide()
          pane.find('#motherboardbCollapse').collapse('hide')
          pane.find('.motherboardbCollapse').hide()
          break
        default:
          console.log('Dropdown case did not match any selectors')
          break
      }
    num++
    })
    $('#workOrderForm').on('select2:selecting', '.motherboarda-dropdown', function(e) {
      pane = $(e.target).closest('.tab-pane')
      thisnum = Number(pane.attr('id').split('-')[1])
      modules = pane.find('.motherboardaModules')
      pane.find('.motherboardaCollapse').show()
      pane.find('#motherboardaCollapse').collapse('show')
      modules.show()
      modules.find('.module-dropdown').val('').trigger('change').attr('name', 'systems[system-' + thisnum + '][motherboarda][modules]').select2()
    })

    $('#workOrderForm').on('select2:selecting', '.motherboardb-dropdown', function(e) {
      pane = $(e.target).closest('.tab-pane')
      thisnum = Number(pane.attr('id').split('-')[1])
      modules = pane.find('.motherboardbModules')
      pane.find('.motherboardbCollapse').show()
      pane.find('#motherboardbCollapse').collapse('show')
      modules.show()
      modules.find('.module-dropdown').val('').trigger('change').attr('name', 'systems[system-' + thisnum + '][motherboarda][modules]').select2()
    })

    $('#workOrderForm').on('click', '.addExternal', function(e) {
      e.preventDefault()
      pane = $(e.target).closest('.tab-pane')
      thisnum = Number(pane.attr('id').split('-')[1])
      pane.find('.external').after($('#system-example .external').prop('outerHTML'))
      pane.find('.external:last').show()
      pane.find('.addExternal:last').toggleClass('addExternal btn-info removeExternal btn-danger').html('<i class="pg-minus_circle"></i> DEL')
      pane.find('.external-dropdown:last').attr('name', 'systems[system-' + thisnum + '][externals]').select2()
    })

    $('#workOrderForm').on('click', '.removeExternal', function(e){
      e.preventDefault()
      $(this).closest('.row').remove()
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
