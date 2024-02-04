const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

const clients = new Map();

wss.on('connection', (ws) => {
  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      switch (data.type) {
        case 'join':
          // Handle user joining
          handleJoin(ws, data);
          break;
        case 'message':
          // Handle public messages
          broadcastMessage(ws, data);
          break;
        case 'privateMessage':
          // Handle private messages
          sendPrivateMessage(ws, data);
          break;
        default:
          break;
      }
    } catch(e) {
      console.error('Error parsing JSON:', error);
    }
  });
});

function handleJoin(ws, data) {
  // Broadcast to all users that a new user has joined
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'notification',
        content: `${data.username} has joined the chat.`,
      }));
    }
  });

  ws.username = data.username;
  clients.set(ws, data.username);
}

function broadcastMessage(ws, data) {
  // Broadcast the public message to all users
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'message',
        username: data.username,
        content: data.content,
      }));
    }
  });
}

function sendPrivateMessage(ws, data) {
  // Find the target user and send the private message
  const targetUsername = data.targetUsername;
  const senderUsername = clients.get(ws);

  const targetClient = Array.from(wss.clients).find((client) => client.username === targetUsername);

  if (targetClient && targetClient.readyState === WebSocket.OPEN) {
    targetClient.send(JSON.stringify({
      type: 'privateMessage',
      senderUsername: senderUsername,
      content: data.content,
    }));
  } else {
    // Notify the sender if the target user is not found or not connected
    ws.send(JSON.stringify({
      type: 'notification',
      content: `User ${targetUsername} not found or is not connected.`,
    }));
  }
}

server.listen(1050, () => {
  console.log('Server listening on http://localhost:1050');
});
