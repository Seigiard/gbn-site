const infoBlockClass = '.info__content-visible';

$(function() {
  $('.service-item').each((id, block) => {
    const $block = $(block);
    $('.info--toggle', $block).click(() => {
      const fn = $block.hasClass(infoBlockClass) ? 'slideUp' : 'slideDown';
      $('.info--content', $block)[fn]({
        duration: 300,
        // easing: "easeInOutSine",
        complete: () => $block.toggleClass(infoBlockClass)
      })
    })
  })
});