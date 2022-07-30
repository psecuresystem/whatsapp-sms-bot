const express = require('express');
const { config } = require('dotenv');
const setupBot = require('./utils/setupBot');

config();
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(process.env.PORT || 3000, () => {
  setupBot();
});
