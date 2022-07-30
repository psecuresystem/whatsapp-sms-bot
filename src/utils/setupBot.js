const { WhatsappBot } = require('../services/bot');
const CommandHandler = require('../services/commandHandler');
const db_client = require('../db');
const DbHandler = require('../services/dbHandler');
const SmsHandler = require('../services/messageHandler');

module.exports = function () {
  const smsHandler = new SmsHandler();
  const dbHandler = new DbHandler(db_client);

  const commandHandler = new CommandHandler(dbHandler, smsHandler);
  const bot = new WhatsappBot(commandHandler, smsHandler);

  bot.init();
};
