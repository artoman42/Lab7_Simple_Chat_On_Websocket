const express = require('express');
const expressWs = require('express-ws');
const path = require('path');

const app = express();
const wsInstance = expressWs(app);
const aWss = wsInstance.getWss();


app.use(express.static(path.join(__dirname, 'public')));

app.ws('/chat', (ws, req) => {
  ws.on('message', (msg) => {
    aWss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(msg);
      }
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
