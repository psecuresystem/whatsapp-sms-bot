const venom = require('venom-bot');
const fs = require('fs');

function createBot(messageHandler, db) {
  venom
    .create({
      session: 'kingdom_keys', //name of session
      multidevice: true, // for version not multidevice use false.(default: true)
    })
    .then((client) => {
      start(client, messageHandler, db);
    })
    .catch((erro) => {
      console.log(erro);
    });
}

let sms_wall = '120363028150181020@g.us';
function start(client, messageHandler, db_client) {
  client.onStateChange((state) => {
    console.log('State changed: ', state);
    // force whatsapp take over
    if ('CONFLICT'.includes(state)) client.useHere();
    // detect disconnect on whatsapp
    if ('UNPAIRED'.includes(state)) console.log('logout');
    // disconected
    if ('OPENING'.includes(state)) {
      // remove the token
      token_path = `tokens/${session_name}.data.json`;
      console.log('unlinking ', token_path);
      fs.unlink(`tokens/${session_name}.data.json`, (err) => console.log(err));
      console.log('REOPENING');
      // reinitiate venom
      client.close();
      init_venom(session_name, hook, handle_function);
      //client.restartService();
    }
  });

  client.onAnyMessage(async (message) => {
    try {
      if (
        message.to == sms_wall ||
        message.chat?.groupMetadata?.id == sms_wall
      ) {
        console.log(message.body.toLowerCase().startsWith('add user'));
        if (message.body.toLowerCase().startsWith('add user')) {
          console.log(message.body.toLowerCase().split('add user')[1].trim());
          await addUser(message.body.toLowerCase().split('add user')[1].trim());
          client.reply(sms_wall, 'Number has been added', message.id);
        }
        if (message.body.toLowerCase().startsWith('get remaining amount')) {
          let balance = await messageHandler.getBalance();
          console.log(balance);
          await client.reply(sms_wall, `${balance}`, message.id);
        }
        if (message.body.toLowerCase().startsWith('get all numbers')) {
          let numbers = (
            await db_client.query(`
            SELECT * FROM kk;
          `)
          ).rows.map((num) => `+234${num.number}`);
          console.log(numbers);
          client.reply(sms_wall, numbers.toString(), message.id);
        }
        if (message.body.toLowerCase().startsWith('remove number')) {
          let number = message.body.split(' ')[2];
          await db_client.query(`
            DELETE FROM kk
            WHERE number = "${number.split('+')[1]}";
          `);
          await client.reply(sms_wall, 'Successfully deleted', message.id);
        }
        if (message?.body?.toLowerCase()?.startsWith('kingdom keys')) {
          let numbers = (
            await db_client.query(`
                SELECT * FROM kk;
            `)
          ).rows.map((num) => `+234${num.number}`);
          let first_balance = await messageHandler.getBalance();
          let response = await messageHandler.sendSms(numbers, message.body);
          let second_balance = await messageHandler.getBalance();
          await client.reply(
            sms_wall,
            'Successfully sent ' + response?.data,
            message.id
          );
          let difference =
            parseInt(first_balance.slice(1)) -
            parseInt(second_balance.slice(1));
          await client.reply(
            sms_wall,
            `Amount Spent N${difference}`,
            message.id
          );
        }
      }
    } catch (err) {
      console.log(err);
      await client.reply(sms_wall, JSON.stringify(err), message.id);
    }
  });
}

async function addUser(number) {
  console.log(number);
  await db_client
    .query(
      `
		INSERT INTO kk(number)
		VALUES (${number});
	`
    )
    .catch((err) => console.log(err));
  console.log('success');
  console.log(
    (
      await db_client.query(`
		SELECT * FROM kk;
	`)
    ).rows
  );
}

module.exports = {
  createBot,
};
