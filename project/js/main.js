const infoBlockClass = 'info__content-visible';

function getDurationTime($component) {
  const height = $component.height();
  const minTime = 300;
  const maxTime = 900;
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
      $content[fn]({
        duration,
        complete: () => $block.toggleClass(infoBlockClass),
        // easing: "easeInOutSine",
      })
    })
  })

  $scrollContainer = $('.service-layout--container');
  $scrollContainer.scroll(() => {
    const fn = $scrollContainer.scrollTop() > 33 ? 'addClass' : 'removeClass';
    $scrollContainer[fn]('js-sticky');
  });
});


$(function() {
  const $asides = $('.service-item__feeedback');

  function placeAsideToTopOfPrevSibling(i, e) {
    $el = $(e);
    $el.addClass('feedback__positioned');

    $prev = $el.prev('.service-item');

    if (!$prev[0]) {
      return;
    }
    const prevOffsetTop = parseInt($prev.position().top, 10);
    $el.css('top', prevOffsetTop + 'px');
  }

  function plaseAsides() {
    $asides.each(placeAsideToTopOfPrevSibling);
  }

  const ro = new ResizeObserver(plaseAsides);
  ro.observe(document.querySelector('.service-list'));
});