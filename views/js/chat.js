const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const nicknameForm = document.querySelector('#nicknameForm');
const messageInput = document.querySelector('#messageInput');
const nicknameInput = document.querySelector('#nicknameInput');

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
  nicknameInput.value = '';
  socket.emit('changeNickname', newNickname);
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createNickname = (nickname, id) => {
  const nicknamesUl = document.querySelector('#nicknames');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('id', id);
  li.innerText = nickname;
  nicknamesUl.appendChild(li);
};

socket.on('connection', ({ nickname, id }) => {
  sessionStorage.setItem('nickname', nickname);
  createNickname(nickname, id);
});

socket.on('message', (message) => createMessage(message));

socket.on('changeNickname', ({ newNickname, id }) => {
  const nickname = document.querySelector(`#${id}`);
  nickname.innerHTML = newNickname;
});