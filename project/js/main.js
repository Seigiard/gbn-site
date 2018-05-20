'use strict';

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

var infoBlockClass = 'info__content-visible';

function getDurationTime($component) {
  var height = $component.height();
  var minTime = 300;
  var maxTime = 700;
  var msPerHeight = 1;
  var time = height * msPerHeight;

  time = Math.min(time, maxTime);
  time = Math.max(time, minTime);

  return time;
}

function convertFormToJSON(form){
  var array = jQuery(form).serializeArray();
  var json = {};

  jQuery.each(array, function() {
    if (this.name.includes('[]')) {
      const name = this.name.slice(0, -2);
      if(!json[name]) {
        json[name] = [];
      }
      json[name].push(this.value || '');
      return;
    }
    json[this.name] = this.value || '';
  });

  return json;
}

$(function () {
  $('.service-item').each(function (id, block) {
    var $block = $(block);
    var $content = $('.info--content', $block);
    var duration = getDurationTime($content);

    $('.info--toggle', $block).click(function () {
      var fn = $block.hasClass(infoBlockClass) ? 'slideUp' : 'slideDown';
      $block.addClass('info__content-transition');
      $content[fn]({
        duration: duration,
        complete: function complete() {
          return $block.removeClass('info__content-transition').toggleClass(infoBlockClass);
        }
        // easing: "easeInOutSine",
      });
    });
  });

  const $scrollContainer = $('.layout--content');
  $scrollContainer.scroll(function () {
    var fn = $scrollContainer.scrollTop() > 28 ? 'addClass' : 'removeClass';
    $scrollContainer[fn]('js-sticky');
  });

  $('form').submit(function (event) {
    event.preventDefault();
    $.each(convertFormToJSON($(event.target)), function(key, prop) {
      console.group(key)
      prop = $.isArray(prop) ? prop : [prop]
      $.each(prop, function(k, val) { console.log(val); });
      console.groupEnd(key);
    });
    const text = [
      'Форма отправки не работает.',
      'В консоли можно увидеть список отправленных данных.'
    ].join('\n');
    alert(text);
  })
});

var elements = document.querySelectorAll('.service-header');
Stickyfill.add(elements);

function checkIsEmpty(event) {
  var input = event.target;
  var fn = !!input.value ? 'remove' : 'add';
  input.classList[fn]('is_empty');
}
[].concat(_toConsumableArray(document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"]'))).forEach(function (el) {
  return el.addEventListener('blur', checkIsEmpty);
});

function setOffsetForButton(el) {
  var button = el.querySelector('button');
  el.querySelector('input').style.paddingRight = button.offsetWidth + 8 + 'px';
}
[].concat(_toConsumableArray(document.querySelectorAll('.input-combined'))).forEach(setOffsetForButton);