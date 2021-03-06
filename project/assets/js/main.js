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
  const $body = $('body');
  const $menu = $('.menu ul');
  const $footer = $('.site-footer');

  function onScrollFunc() {
    const fn = $scrollContainer.scrollTop() > 29 ? 'addClass' : 'removeClass';
    $body[fn]('js-sticky');

    const minMenuOffset = 20;
    const bottomOffset = $scrollContainer[0].scrollHeight - $scrollContainer.scrollTop() - $body.height() - minMenuOffset;
    const fnFooter = bottomOffset > minMenuOffset ? 'removeClass' : 'addClass';
    $footer[fnFooter]('site-footer__visible');
  }
  const onScrollFuncThrottled = rafThrottle(onScrollFunc);
  $scrollContainer.scroll(onScrollFuncThrottled);
  onScrollFuncThrottled();

  $('form').each(initForm);

  $('[focus-on-load]').focus();

  $('[scroll-one-page]').click(function(e){
    e.preventDefault();
    $scrollContainer.animate({ scrollTop: $body.height() }, 500);
  });
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