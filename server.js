const WebSocket = require('ws');
const http = require('http');

// Cria um servidor HTTP
const server = http.createServer();
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

// Escuta em todas as interfaces de rede
server.listen(8080, '0.0.0.0', () => {
  console.log('Servidor WebSocket ouvindo na porta 8080');
});
