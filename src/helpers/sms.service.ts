import { Twilio } from 'twilio';
export interface SmsData {
  toPhoneNumber?: string;
  receiverName?: string;
  verifyCode?: string;
}
export class SmsService {
  accountSid = process.env.TWILIO_ACCOUNT_SID;
  authToken = process.env.TWILIO_AUTH_TOKEN;
  sender = process.env.TWILIO_PHONE;
  client: Twilio;
  public constructor() {
    this.client = new Twilio(this.accountSid, this.authToken, {
      logLevel: 'debug',
    });
  }

  public async sendSms(data?: SmsData) {
    if (!data) return new Error('SMS data missing');
    const transporter = await this.client.messages.create({
      to: data.toPhoneNumber,
      from: this.sender,
      body: `VERIFY CODE: ${data.verifyCode}`,
    });
    return true;
  }
}
