const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const Blockchain = require('./blockchain');

const app = express();
app.use(express.json());
app.use(cors());

const blockchain = new Blockchain();

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    if (data.type === 'transaction') {
      const transaction = data.payload;
      blockchain.addTransaction(transaction);
      blockchain.minePendingTransactions();
    }
    
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'blockchain',
          payload: blockchain.chain
        }));
      }
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
