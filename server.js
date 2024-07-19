const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');

// Configura o servidor HTTPS
const server = https.createServer({
  cert: fs.readFileSync('path/to/your/certificate.crt'),
  key: fs.readFileSync('path/to/your/private.key')
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (message) => {
    console.log(`Recebido: ${message}`);
    const jsonMessage = JSON.stringify({ message });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(jsonMessage);
      }
    });
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(8080, () => {
  console.log('Servidor WebSocket seguro ouvindo na porta 8080');
});
