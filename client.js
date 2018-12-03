const WebSocket = require('ws');

var server = 'wss://my.webhookrelay.com/v1/socket';
var reconnectInterval = 1000 * 3;
var ws;

var apiKey = process.env.RELAY_KEY;
var apiSecret = process.env.RELAY_SECRET;

var connect = function(){
    ws = new WebSocket(server);
    ws.on('open', function() {        
        console.log('connected, sending authentication request');
        ws.send(JSON.stringify({ action: 'auth', key: 'aa', secret: apiSecret }));
    });

    ws.on('message', function incoming(data) {
      console.log(data)
      var msg = JSON.parse(data);
      if (msg.type === 'status' && msg.status === 'authenticated') {
        ws.send(JSON.stringify({ action: 'subscribe', buckets: ['123'] }));
      }
    });

    ws.on('error', function() {
        console.log('socket error');       
    });

    ws.on('close', function() {
        console.log('socket closed, reconnecting');
        setTimeout(connect, reconnectInterval);
    });
};

connect();