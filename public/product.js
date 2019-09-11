$(document).ready(function() {
  // Star Jquery-validation on the form
  $('#productForm').validate();

  // When form fails check to see if the Category input has a previously set
  // value and apply it to the select2 input if it exists.
  var value = $('.oldcategory').data('value');
  if (value != '') {
    $('#categoryInput').val(value).trigger('change');
  }
});
