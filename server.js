const WebSocket = require('ws');
const http = require('http');

// Cria um servidor HTTP
const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (message) => {
    console.log(`Recebido: ${message}`);
    // Envia a mensagem como JSON para todos os clientes conectados
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
  console.log('Servidor WebSocket ouvindo na porta 8080');
});
