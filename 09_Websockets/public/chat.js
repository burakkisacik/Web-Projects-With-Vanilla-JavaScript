//make connecion
const socket = io.connect('http://localhost:3000');

//dom elements
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

//Emit Evets
btn.addEventListener('click', () => {
  socket.emit('chatMessage', {
    message: message.value,
    handle: handle.value,
  });
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

//listen for events
socket.on('chatMessage', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += `<p><strong>${data.handle}</strong> ${data.message}</p>`;
});

socket.on('typing', (data) => {
  feedback.innerHTML = `<p><em>${data} is typing...</em></p>`;
});
