const socket = new WebSocket('ws://localhost:3000/chat');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

socket.onopen = () => {
  console.log('Connected to the server');
};

socket.onmessage = (event) => {
  const message = document.createElement('p');
  message.textContent = event.data;
  messagesDiv.appendChild(message);
};

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  socket.send(message);
  messageInput.value = '';
});

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

socket.onclose = () => {
  console.log('Connection closed');
};
