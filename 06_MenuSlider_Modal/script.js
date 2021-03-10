const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

//Toggle nav
toggle.addEventListener('click', () => {
  console.log('burak');
  document.body.classList.toggle('show-nav');
});

//Show modal
open.addEventListener('click', () => {
  modal.classList.add('show-modal');
});

//Hide Modal
close.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

window.addEventListener('click', (e) =>
  e.target == modal ? modal.classList.remove('show-modal') : false
);

//the modal is not refering the form page but anything else in the page. we did
// make it like an overlay in css. go check the css.
