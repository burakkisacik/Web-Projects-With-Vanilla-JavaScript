const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => (mouseDown = true));
progress.addEventListener('mouseup', () => (mouseDown = false));

skipButtons.forEach((button) => {
  button.addEventListener('click', skip);
});

ranges.forEach((range) => {
  range.addEventListener('change', handleRangeUpdate);
});

ranges.forEach((range) => {
  range.addEventListener('mousemove', handleRangeUpdate);
});

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  type() {
    const current = this.wordIndex % this.words.length;
    const fulltxt = this.words[current];
    if (this.isDeleting) {
      this.txt = fulltxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fulltxt.substring(0, this.txt.length + 1);
    }
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    let TypeSpeed = 200;
    if (this.isDeleting) {
      TypeSpeed /= 2;
    }
    if (!this.isDeleting && this.txt === fulltxt) {
      TypeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      TypeSpeed = 500;
    }
    setTimeout(() => this.type(), TypeSpeed);
  }
}

document.addEventListener('DOMContentLoaded', init);

function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  new TypeWriter(txtElement, words, wait);
}
