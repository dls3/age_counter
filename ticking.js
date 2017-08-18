// Zero pad date related numbers
function zero_pad(num) {
  if (num<10) {
    result = "0" + num.toString();
  }
    else {
      result = num.toString();
  } return result;
}

var current_year = moment().year();

// Must pick year and month before date (because of leap year)
// Year
for (var i = current_year; i >= 1900; i--){
  $('#year').append('<option class="selector_years">'+i+'</option>');
}

// Month
$('#year').change(function(){     //allow month selection after year
  $('.selector_days').remove();
  if (!isNaN($('#year option:selected').text())) {
    $('#month').prop("disabled", false);
    if ($('.selector_months').length == 0) {
      for (var i=1; i<=12; i++){
        i = zero_pad(i);
        $('#month').append('<option class="selector_months">'+i+'</option>');
      }
    }
    else {
      $('#month').trigger('change');
    }
  }
  else {
    $('#month').prop("disabled", true);
  }
})

// Day
$('#month').change(function(){     //allow day selection after month
  if (!isNaN($('#month option:selected').text())) {
    $('.selector_days').remove();
    $('#day').prop("disabled", false);
    year = $('#year option:selected').text();
    month = $('#month option:selected').text();
    str = year + "-" + month + "-" + "01";
    last_date = moment(str).endOf('month').date();
    for (var i = 1; i <= last_date; i++){
      i = zero_pad(i);
      $('#day').append('<option class="selector_days">'+i+'</option>');
    }
  }
  else {
    $('#day').val(1).attr('selected','selected');
    $('#select2_day_container').text("Day");
    $('.selector_days').remove();
    $('#day').prop("disabled", true);
  }
})

// Hour
for (var i = 1; i <= 12; i++){
  i = zero_pad(i);
  $('#hour').append("<option>"+i+"</option>")
}
// Minute
for (var i = 0; i <= 59; i++){
  i = zero_pad(i);
  $('#minute').append("<option>"+i+"</option>");
}

// Submit selection
$('#go_button').click(function(){
  year = $('#year option:selected').text();
  month = $('#month option:selected').text();
  day = $('#day option:selected').text();
  hour = $('#hour option:selected').text();
  minute = $('#minute option:selected').text();
  am_pm = $('#am_pm option:selected').text();
  if (am_pm == "PM") {
    hour = hour + 12;
  }
var date_str = year + month + day + "T" + hour + minute;

  // Alert if fields are not filled
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    alert("Oops! Please fill in all of the fields")
  }

  else if (moment(date_str) > moment() ) {
    alert("Oops! You weren't born in the future, were you?")
  }

  else {
    date_str = year + month + day + "T" + hour + minute;

    var birthday = moment(date_str);

    $(".date_select").css('display','none')
    update_birthday(birthday);
    $(".phrase").css('display','table-cell')
  }
});

var ms_to_year = moment.duration(1, 'years') / moment.duration(1);    // ms in a year (divide moment by this var to get years)

function update_birthday(birthday) {
  var age = moment().diff(birthday) / ms_to_year;
  $("#age").text(age.toFixed(9));
  setTimeout(update_birthday, 10, birthday);
}

// move age down for style
function update_height() {
  var viewportHeight = $(window).height();
  $(".main").css('height', viewportHeight * .6);
  setTimeout(update_height, 15);
}

$(document).ready(update_height())
