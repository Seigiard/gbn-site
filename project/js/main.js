const infoBlockClass = 'info__content-visible';

function getDurationTime($component) {
  const height = $component.height();
  const minTime = 300;
  const maxTime = 700;
  const msPerHeight = 1;
  let time = height * msPerHeight

  time = Math.min(time, maxTime);
  time = Math.max(time, minTime);

  return time;
}

$(function() {
  $('.service-item').each((id, block) => {
    const $block = $(block);
    const $content = $('.info--content', $block);
    const duration = getDurationTime($content);

    $('.info--toggle', $block).click(() => {
      const fn = $block.hasClass(infoBlockClass) ? 'slideUp' : 'slideDown';
      $block.addClass('info__content-transition')
      $content[fn]({
        duration,
        complete: () => $block.removeClass('info__content-transition').toggleClass(infoBlockClass),
        // easing: "easeInOutSine",
      })
    })
  })

  $scrollContainer = $('.service-layout--container');
  $scrollContainer.scroll(() => {
    const fn = $scrollContainer.scrollTop() > 28 ? 'addClass' : 'removeClass';
    $scrollContainer[fn]('js-sticky');
  })
});

var elements = document.querySelectorAll('.service-header');
Stickyfill.add(elements)


function checkIsEmpty(event) {
  const input = event.target;
  const fn = !!input.value ? 'remove' : 'add';
  input.classList[fn]('is_empty');
}
[...document.querySelectorAll('input[type="text"], input[type="number"], input[type="email"]')].forEach(el => el.addEventListener('blur', checkIsEmpty));


function setOffsetForButton(el) {
  const button = el.querySelector('button');
  console.log(button.offsetWidth)
  el.querySelector('input').style.paddingRight = `${button.offsetWidth+8}px`;
}
[...document.querySelectorAll('.input-combined')].forEach(setOffsetForButton);