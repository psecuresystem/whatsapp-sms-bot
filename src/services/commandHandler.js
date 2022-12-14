const { sms_wall } = require('../constants/constants');
const { commands } = require('./bot');

class CommandHandler {
  constructor(dbHandler, smsHandler) {
    this.dbHandler = dbHandler;
    this.smsHandler = smsHandler;
  }

  async action(message, id, reply) {
    if (id) {
      console.log(commands);
      console.log(id);
      await this[commands[id].commandFunc](message, commands[id], reply);
    }
  }

  async addUser(message, command, reply) {
    const number = message;
    console.log(number);
    const status = await this.dbHandler.addUser(number);
  }

  async getRemainingAmount(message, command, reply) {
    let balance = await this.smsHandler.getBalance();
    await reply(`${balance}`);
  }

  async getAllUsers(reply) {
    let numbers = await this.dbHandler.getAllUsers();
    return numbers;
  }

  async removeUser(message, command, reply) {
    let number = message;
    const status = await this.dbHandler.removeUser(number);
    status
      ? await reply('Successfully deleted')
      : reply('Error occurred during deleting number');
  }

  async kingdomKeys(message, command, reply) {
    let numbers = await this.dbHandler.getAllUsers();
    console.log(numbers);
    if (!numbers) {
      return reply('Error occurred during attempt to get all numbers');
    }
    let first_balance = await this.smsHandler.getBalance();
    console.log(first_balance);
    let response = await this.smsHandler.sendSms(numbers, message);
    console.log(response);
    let second_balance = await this.smsHandler.getBalance();
    console.log(second_balance);
    await reply('Successfully sent ' + response?.data);
    let difference =
      parseInt(first_balance.slice(1)) - parseInt(second_balance.slice(1));
    console.log(difference);
    await reply(`Amount Spent N${difference}`);
  }

  async pong(message, command, reply) {
    console.log(message);
    console.log(reply);
    await reply('Pong');
  }
}

module.exports = CommandHandler;
