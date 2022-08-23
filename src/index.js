const express = require('express');
const { config } = require('dotenv');
const CommandHandler = require('./services/commandHandler');
const db_client = require('./db');
const DbHandler = require('./services/dbHandler');
const SmsHandler = require('./services/messageHandler');

config();
const app = express();
const smsHandler = new SmsHandler();
const dbHandler = new DbHandler(db_client);

const commandHandler = new CommandHandler(dbHandler, smsHandler);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/sms', async (req, res) => {
  await commandHandler.kingdomKeys(
    req.body.kk,
    '',
    smsHandler.sendSms.bind(this, ['08112907883'])
  );
  res.sendStatus(200);
});

app.post('/numbers', async (req, res) => {
  console.log('req?.body', req?.body);
  await commandHandler.addUser(
    req?.body?.number,
    '',
    smsHandler.sendSms.bind(this, ['08112907883'])
  );
  res.sendStatus(200);
});

app.get('/numbers', async (req, res) => {
  const numbers = await commandHandler.getAllUsers(
    smsHandler.sendSms.bind(this, ['08112907883'])
  );
  console.log(numbers);
  res.send(numbers);
});

app.listen(process.env.PORT || 3333, console.log.bind(this, 'Success'));
