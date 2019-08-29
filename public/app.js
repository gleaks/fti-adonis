$(document).ready(function() {
  if ($('#flashmessage').length) {
    $('body').pgNotification({message: $('#flashmessage').text()}).show();
  }
});
