$(function() {

  var result;

  $('form').on('submit', function(e) {
    e.preventDefault();

    var $val1 = +$('#val1').val();
    var $val2 = +$('#val2').val();
    var $operator = $('.operator').val();

    if ($operator === "+") {
      result = $val1 + $val2;
    }
    else if ($operator === "-") {
      result = $val1 - $val2;
    }
    else if ($operator === "*") {
      result = $val1 * $val2;
    }
    else if ($operator === "/") {
      result = $val1 / $val2;
    }

    $('.result').text(result);
  });

});
