const axios = require('axios');

class SmsHandler {
  async getBalance() {
    let data = await axios.get(
      'https://smsexperience.com/api/sms/balance?username=VisionOnyeaku&password=danz6278'
    );
    let balance = `N${data.data}`;
    return balance;
  }

  async sendSms(numbers, message) {
    let numbersInString = numbers.join(',');
    let data = await axios.get(
      `https://smsexperience.com/api/sms/sendsms?username=VisionOnyeaku&password=danz6278&sender=KWM%20KK&recipient=${numbersInString}&message=${replaceAll(
        message,
        ' ',
        '%20'
      )}`
    );
    return data;
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

module.exports = SmsHandler;
