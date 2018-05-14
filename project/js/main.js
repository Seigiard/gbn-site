const infoBlockClass = 'info__content-visible';

[...document.querySelectorAll('.info')].forEach(block => {
  block.querySelector('.info--toggle').addEventListener('click', (e) => {
    if(block.classList.contains(infoBlockClass)) {
      block.classList.remove(infoBlockClass);
    } else {
      block.classList.add(infoBlockClass);
    }
  });
});