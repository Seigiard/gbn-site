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
});