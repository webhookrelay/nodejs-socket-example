# Webhook Relay websocket example

Webhook Relay's [Socket Server](https://webhookrelay.com/v1/guide/socket-server.html) allows users to receive webhooks inside their application without having public IP, domain or even running a web server themselves. `client.js` is a short example application written in JavaScript that subscribes to a stream of webhooks.

To run:

#### 1. Install websocket library `ws`:

```bash
npm i ws
```

#### 2. Set token key and secret (generate at [tokens page](https://my.webhookrelay.com/tokens)):

```bash
export RELAY_KEY=your-token-key
export RELAY_SECRET=your-token-secret
```

#### 3. Start it:

```bash
node client.js
```

Now, if you send a webhook to your public input endpoint, you should see something similar:

```bash
$ node client.js
{"type":"status","status":"authenticated","message":"connected successfully, subscribe to buckets"}
{"type":"status","status":"subscribed","message":"subscribed to buckets: 123"}
{"type":"webhook","meta":{"bucked_id":"89e44c32-27ff-4832-8655-8a42d3851b6f","bucket_name":"123","input_id":"ee4ac550-12a4-41a7-837d-dd3356ed1771","input_name":"Default public endpoint"},"headers":{"Content-Length":["15"],"User-Agent":["insomnia/6.0.2"],"Cookie":["__cfduid=dc244a014f0b1e2965544ddb483c3fe1b1525866866"],"Content-Type":["application/json"],"Accept":["*/*"]},"query":"","body":"{\"hi\": \"there\"}","method":"PUT"}
```