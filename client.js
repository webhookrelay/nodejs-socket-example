const WebSocket = require('ws');

const ws = new WebSocket('wss://my.webhookrelay.com/v1/socket');

var apiKey = process.env.RELAY_KEY;
var apiSecret = process.env.RELAY_SECRET;

ws.on('open', function open() {
  console.log('connected, sending authentication request');
  ws.send(JSON.stringify({action: 'auth', key: apiKey, secret: apiSecret}));  
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('message', function incoming(data) {
  console.log(data)
  var msg = JSON.parse(data);
  if (msg.type === 'status' && msg.status === 'authenticated') {
    ws.send(JSON.stringify({action: 'subscribe', buckets: ['123']}));
  }
});