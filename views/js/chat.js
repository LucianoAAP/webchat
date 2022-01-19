const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const nicknameForm = document.querySelector('#nicknameForm');
const messageInput = document.querySelector('#messageInput');
const nicknameInput = document.querySelector('#nicknameInput');
const nicknamesUl = document.querySelector('#nicknames');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('message', { chatMessage: messageInput.value, nickname });
  messageInput.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newNickname = nicknameInput.value;
  sessionStorage.setItem('nickname', newNickname);
  socket.emit('changeNickname', newNickname);
  nicknameInput.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createNickname = ({ nickname, id }) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('id', id);
  li.innerText = nickname;
  nicknamesUl.appendChild(li);
};

socket.on('changeOfClients', (clients) => {
  const sortedClients = [clients.find((client) => client.id === socket.id),
    ...clients.filter((client) => client.id !== socket.id)];
  const { nickname } = clients.find((client) => client.id === socket.id);
  sessionStorage.setItem('nickname', nickname);
  nicknamesUl.innerHTML = '';
  sortedClients.forEach(createNickname);
});

socket.on('message', (message) => createMessage(message));

window.onbeforeunload = (_event) => {
  socket.disconnect();
};