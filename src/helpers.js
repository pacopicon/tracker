export function mountNumberInput() {
  return componentDidMount() {

    $('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    $('.quantity').each(function() {
      var spinner = $(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max'),
        step = input.attr('step');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          // if(oldValue < 10) {
            // var newVal = '0' + min;
            var newVal = min;
          // } else {
            // var newVal = min;
          // }
        } else {
          // if(oldValue < 10 && oldValue != step) {
          if(oldValue == 0 && step == 5) {
            var newVal = '0' + (oldValue + 1 * step);
          } else {
            var newVal = oldValue + 1 * step;
          }
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          // if(oldValue < 10) {
            // var newVal = '0' + max;
          // } else {
            var newVal = max;
          // }
        } else {
          // if(oldValue < 10) {
          if((oldValue == 10 || oldValue == 5) && step == 5) {
            var newVal = '0' + (oldValue - 1 * step);
          } else {
            var newVal = oldValue - 1 * step;
          }
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });
  }

export function processTime(unprocessedTime, hourOption) {
    unprocessedTimeObj = new Date(unprocessedTime);
    unprocessedHour = unprocessedTimeObj.getHours();
    processedHour = unprocessedHour - hourOption;
    var processedTime = unprocessedTimeObj.setHours(processedHour);
    return processedTime;
  }

export function addHoursAndMinutes(hours, minutes) {
  var timeInMillisecs = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
  return timeInMillisecs;
}

export function parseTime(timeInMillisecs) {
  // 'time' has to be in milliseconds
  // var millisecsInYear = 12 * 30.4166 * 24 * 60 * 60 * 1000;
  var millisecsInYear = 31535930880;
  // var millisecsInMonth = 30.4166 * 24 * 60 * 60 * 1000;
  var millisecsInMonth = 2627994239.9999995;
  // var millisecsInDay = 24 * 60 * 60 * 1000;
  var millisecsInDay = 86400000;
  // var millisecsInHour = 60 * 60 * 1000;
  var millisecsInHour = 3600000;
  // var millisecsInMinute = 60 * 1000;
  var millisecsInMinute = 60000;
  var millisecsInSecs = 1000;

  if (timeInMillisecs < 0) {
    var years = Math.abs(timeInMillisecs / millisecsInYear);
    var lessThanYear = Math.abs(timeInMillisecs % millisecsInYear);
    var months = Math.abs(lessThanYear / millisecsInMonth);
    var lessThanMonth = Math.abs(lessThanYear % millisecsInMonth);
    var days = Math.abs(lessThanMonth / millisecsInDay);
    var lessThanDay = Math.abs(lessThanMonth % millisecsInDay);
    var hours = Math.abs(lessThanDay / millisecsInHour);
    var lessThanHour = Math.abs(lessThanDay % millisecsInHour);
    var minutes = Math.abs(lessThanHour / millisecsInMinute);
    var lessThanMinute = Math.abs(lessThanHour % millisecsInMinute);
    var seconds = Math.abs(Math.round(lessThanMinute / millisecsInSecs));
  } else {
    var years = Math.floor(timeInMillisecs / millisecsInYear);
    var lessThanYear = timeInMillisecs % millisecsInYear;
    var months = Math.floor(lessThanYear / millisecsInMonth);
    var lessThanMonth = lessThanYear % millisecsInMonth;
    var days = Math.floor(lessThanMonth / millisecsInDay);
    var lessThanDay = lessThanMonth % millisecsInDay;
    var hours = Math.floor(lessThanDay / millisecsInHour);
    var lessThanHour = lessThanDay % millisecsInHour;
    var minutes = Math.floor(lessThanHour / millisecsInMinute);
    var lessThanMinute = lessThanHour % millisecsInMinute;
    var seconds = Math.round(lessThanMinute / millisecsInSecs);

    var addZero = function(timeUnit) {
      if (timeUnit == 0 || timeUnit == 1 || timeUnit == 2 || timeUnit == 3 || timeUnit == 4 || timeUnit == 5 || timeUnit == 6 || timeUnit == 7 || timeUnit == 8 || timeUnit == 9) {
        return "0" + timeUnit;
      // } else if (timeUnit == 60) {
      //   return "00";
      } else {
        return timeUnit;
      }
    };

    // var addZero = function(timeUnit) {
    //
    //   timeUnit = timeUnit - 1;
    //
    //   if (timeUnit == 0 || timeUnit == 1 || timeUnit == 2 || timeUnit == 3 || timeUnit == 4 || timeUnit == 5 || timeUnit == 6 || timeUnit == 7 || timeUnit == 8 || timeUnit == 9) {
    //     return "0" + timeUnit;
    //   } else {
    //     return timeUnit;
    //   }
    // };
  }

  return {
    total: timeInMillisecs,
    year: years,
    month: months,
    day: days,
    hour: hours,
    minute: addZero(minutes),
    second: addZero(seconds),
    hourMinSec: (timeInMillisecs > 0 || typeof timeInMillisecs != "undefined") ? hours + ":" + addZero(minutes) + ":" + addZero(seconds) : "00:00:00"
  };
}
