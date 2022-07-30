const venom = require('venom-bot');
const fs = require('fs');
const { sms_wall } = require('../constants/constants');

const commands = [
  {
    name: 'add user',
    param: true,
    isTotal: false,
    commandFunc: 'addUser',
  },
  {
    name: 'remove user',
    param: true,
    isTotal: false,
    commandFunc: 'removeUser',
  },
  {
    name: 'get all users',
    param: false,
    isTotal: false,
    commandFunc: 'getAllUsers',
  },
  {
    name: 'get remaining amount',
    param: false,
    isTotal: false,
    commandFunc: 'getRemainingAmount',
  },
  {
    name: 'kingdom keys',
    param: true,
    isTotal: true,
    commandFunc: 'kingdomKeys',
  },
  {
    name: 'ping',
    param: false,
    isTotal: false,
    commandFunc: 'pong',
  },
];

class WhatsappBot {
  constructor(commandHandler, messageHandler) {
    this.commandHandler = commandHandler;
    this.messageHandler = messageHandler;
  }

  async init() {
    this.client = await venom.create({
      session: 'kingdom_keys', //name of session
      multidevice: true, // for version not multidevice use false.(default: true)
    });
    this.createBot();
  }

  async createBot() {
    this.client.onAnyMessage(async (message) => {
      if (
        message.to == sms_wall ||
        message.chat?.groupMetadata?.id == sms_wall
      ) {
        const id = this.decodeCommand(message);
        await this.commandHandler.action(
          message,
          id,
          this.messageHandler.sendSms.bind(this, ['08112907883'])
        );
      }
    });
  }
  decodeCommand(message) {
    let id = 0;
    for (const command of commands) {
      if (message.body.toLowerCase().startsWith(command.name)) {
        return id;
      }
      id += 1;
    }
    return null;
  }
}
(function () {}.bind());

module.exports = {
  WhatsappBot,
  commands,
};
