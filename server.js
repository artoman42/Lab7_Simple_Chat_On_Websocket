const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const port = 3000;

// Статична тека для статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Створення сервера Express
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Створення WebSocket-сервера на основі сервера Express
const wss = new WebSocket.Server({ server });

// Обробка підключення до WebSocket-сервера
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Обробка повідомлень від клієнта
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Надіслати повідомлення всім підключеним клієнтам
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Обробка закриття з'єднання клієнтом
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
