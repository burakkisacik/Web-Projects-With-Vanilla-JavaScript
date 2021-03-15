const panels = document.querySelectorAll('.panel');
console.log(panels);

panels.forEach((panel) => {
  panel.addEventListener('click', () => {
    panel.classList.toggle('active');
  });
});
