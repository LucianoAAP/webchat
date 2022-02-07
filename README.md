# The project

This is a slightly modified version of a project I had to develop during my studies at the "Trybe" web development course. It is a public chat room with which multiple users can send messages freely. This project was made using Express.js, MongoDB and EJS and uses sockets to establish the connection between the server and the clients.

# Features

- [x] back-end for simultaneous connections and message delivery
- [x] front-end for interaction with the public chat
- [x] chat history storage
- [x] shows which users are currently online
- [x] customizable nicknames

# Getting started

This project requires Node.js and MongoDB.

## Installation

1. First, clone the repository:
- `git clone git@github.com:LucianoAAP/webchat.git`
2. Then, enter the repository:
- `cd webchat`
3. Finally, install dependencies:
- `npm install`

## Starting the application

1. First, start your MongoDB service:
- `sudo service mongod start`
2. Then, just run the application
- `npm start`