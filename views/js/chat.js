const socket = window.io();

const messageForm = document.querySelector('#message-form');
const nicknameForm = document.querySelector('#nickname-form');
const messageInput = document.querySelector('#message-input');
const nicknameInput = document.querySelector('#nickname-input');
const nicknamesUl = document.querySelector('#nicknames');
const messagesUl = document.querySelector('#messages');

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

const changeClients = (clients) => {
  const sortedClients = [clients.find((client) => client.id === socket.id),
    ...clients.filter((client) => client.id !== socket.id)];
  const { nickname } = clients.find((client) => client.id === socket.id);
  sessionStorage.setItem('nickname', nickname);
  nicknamesUl.innerHTML = '';
  sortedClients.forEach(createNickname);
};

socket.on('changeOfClients', changeClients);
socket.on('message', createMessage);

window.onbeforeunload = (_event) => {
  socket.disconnect();
};