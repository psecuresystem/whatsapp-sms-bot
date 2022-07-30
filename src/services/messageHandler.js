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
      `https://smsexperience.com/api/sms/sendsms?username=VisionOnyeaku&password=danz6278&sender=KWM KK&recipient=${numbersInString}&message=${message}`
    );
    return data;
  }
}

module.exports = SmsHandler;
