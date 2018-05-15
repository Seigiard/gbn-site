const infoBlockClass = '.info__content-visible';
console.log(123123);
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

// [...document.querySelectorAll('.info')].forEach(block => {
//   block.querySelector('.info--toggle').addEventListener('click', (e) => {
//     if(block.classList.contains(infoBlockClass)) {
//       block.classList.remove(infoBlockClass);
//     } else {
//       block.classList.add(infoBlockClass);
//     }
//   });
// });