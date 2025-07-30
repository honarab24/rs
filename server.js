// server.js
const express = require('express');
const request = require('request');
const app = express();

app.get('/stream', (req, res) => {
  const streamUrl = 'https://example.com/stream.m3u8'; // 🔁 replace with your actual URL

  const headers = {
    'User-Agent': 'Mozilla/5.0',
    'Accept': '*/*',
    'Connection': 'keep-alive'
  };

  request({ url: streamUrl, headers }).pipe(res);
});

app.get('/', (req, res) => {
  res.send('✅ IPTV Proxy Running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
