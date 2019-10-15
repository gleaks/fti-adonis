$(document).ready(function() {
    // Star Jquery-validation on the form
    $('#workOrderForm').validate()

    // Start the javascript datepicker plugin
    $('#newOrderDate').datepicker()

    // Start select2 javascript plugin on the Customer input
    $('.tab-pane:not(#system-example) .full-width').select2()

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
      num = 1 + Number($('.tab-pane:last').attr('id').split('-')[1])
      paneclass = ''
    }
    $('.tab-pane:last').after($('#system-example').prop('outerHTML'))
    $('.tab-pane:last').attr('id', 'system-' + num).addClass(paneclass)
    $('.system-dropdown:last').select2()

    $('#workOrderForm').on('select2:selecting', '.system-dropdown', function(e) {
      pane = $(e.target).closest('.tab-pane')
      if($(this).val() == '') {
        newpane = 'system-' + (parseInt(num) + 1)
        pane.after($('#system-example').prop('outerHTML'))
        $('.tab-pane:last').attr('id', newpane)
        $('.nav-tabs li:last a').text(e.params.args.data.text.slice(0,25))
        $('.nav-tabs li:last').after('<li><a data-toggle="tab" href="#' + newpane + '"><i class="pg-plus_circle"></i> Add a System</a></li>')
        $('.system-dropdown:last').select2()
        $(e.target).attr('name', 'systems[system-' + num + ']')
      } else {
        link = pane.attr('id')
        $('.nav-tabs a[href="#' + link + '"]').text(e.params.args.data.text.slice(0,25))
      }
      switch(e.params.args.data.element.getAttribute('data-hasmobos')) {
        case 'true':
          pane.find('.motherboards').show()
          pane.find('.motherboarda').show()
          pane.find('.motherboardb').show()
          pane.find('.motherboarda-dropdown').val('').trigger('change').attr('name', 'systems[system-' + num + '][motherboarda]').removeAttr('disabled').select2()
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
        case 'false':
          pane.find('.external').hide()
          pane.find('.motherboards').show()
          pane.find('.motherboardb').hide()
          pane.find('.motherboarda-dropdown').attr('name', 'systems[system-' + num + '][motherboarda]').attr('disabled', 'true').select2()
          pane.find('.motherboardaCollapse').show()
          break
      }
    num++
    })
    $('#workOrderForm').on('select2:selecting', '.motherboarda-dropdown', function(e) {
      pane = $(e.target).closest('.tab-pane')
      mobotype = e.params.args.data.element.getAttribute('data-mobotype').toLowerCase()
      thisnum = pane.attr('id').split('-')[1]
      modules = pane.find('.motherboardaModules')
      pane.find('.motherboardaCollapse').show()
      pane.find('#motherboardaCollapse').collapse('show')
      modules.show()
      modules.find('.module-dropdown').val('').trigger('change')
      modules.find('.acmodules').hide()
      modules.find('.dcmodules').hide()
      modules.find('.icmodules').hide()
      modules.find('.' + mobotype + 'modules').show()
      modules.find('.module-dropdown:hidden').attr('name', 'nothing')
      modules.find('.module-dropdown:visible').attr('name', 'systems[system-' + thisnum + '][motherboarda][modules]').select2()
    })
    $('#workOrderForm').on('select2:selecting', '.motherboardb-dropdown', function(e) {
      pane = $(e.target).closest('.tab-pane')
      mobotype = e.params.args.data.element.getAttribute('data-mobotype').toLowerCase()
      thisnum = Number(pane.attr('id').split('-')[1])
      modules = pane.find('.motherboardbModules')
      pane.find('.motherboardbCollapse').show()
      pane.find('#motherboardbCollapse').collapse('show')
      modules.show()
      modules.find('.module-dropdown').val('').trigger('change')
      modules.find('.acmodules').hide()
      modules.find('.dcmodules').hide()
      modules.find('.icmodules').hide()
      modules.find('.' + mobotype + 'modules').show()
      modules.find('.module-dropdown:visible').attr('name', 'systems[system-' + thisnum + '][motherboardb][modules]').select2()
    })
    $('#workOrderForm').on('select2:unselect', '.system-dropdown', function(e) {
      oldpane = $('.nav-tabs li:last a').attr('href')
      pane = $(e.target).closest('.tab-pane')
      $('.nav-tabs li:last').remove()
      $(oldpane).remove()
      $('.nav-tabs li:last a').html('<i class="pg-plus_circle"></i> Add a System')
      num--
      pane.find('.motherboards').hide()
      pane.find('.motherboarda-dropdown').val('').attr('name', 'nothing')
      pane.find('.motherboardb-dropdown').val('').attr('name', 'nothing')
      pane.find('.module-dropdown').val('').attr('name', 'nothing')
      pane.find('.external:not(:first)').remove()
      pane.find('.external-dropdown').val('').attr('name', 'nothing')
      pane.find('.external').hide()
    })
    $('#workOrderForm').on('select2:unselect', '.motherboarda-dropdown', function(e) {
      pane = $(e.target).closest('.tab-pane')
      modules = pane.find('.motherboardaModules')
      pane.find('.motherboardaCollapse').hide()
      pane.find('#motherboardaCollapse').collapse('hide')
      modules.hide()
      modules.find('.module-dropdown').val('').trigger('change').attr('name', 'nothing')
      modules.find('.acmodules').hide()
      modules.find('.dcmodules').hide()
      modules.find('.icmodules').hide()
    })
    $('#workOrderForm').on('select2:unselect', '.motherboardb-dropdown', function(e) {
      pane = $(e.target).closest('.tab-pane')
      modules = pane.find('.motherboardbModules')
      pane.find('.motherboardbCollapse').hide()
      pane.find('#motherboardbCollapse').collapse('hide')
      modules.hide()
      modules.find('.module-dropdown').val('').trigger('change').attr('name', 'nothing')
      modules.find('.acmodules').hide()
      modules.find('.dcmodules').hide()
      modules.find('.icmodules').hide()
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
      proceed = confirm('Are you sure you want to remove this External Module from the order?')
      if(proceed == true){
        $(this).closest('.row').remove()
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
