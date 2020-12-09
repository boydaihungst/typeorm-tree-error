import * as nodemailer from 'nodemailer';
export interface MailData {
  type?: MailType;
  toEmail?: string;
  receiverName?: string;
  verifyCode?: string;
  code?: string;
  link?: string;
}
export enum MailType {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  SIGNUP_SEND_CONFIRM_CODE,
}
export class MailService {
  public async sendMail(data?: MailData): Promise<nodemailer.SentMessageInfo> {
    const mailData = await this.setMailContent(data);

    if (!mailData) return new Error('Mail data Error');
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'bookingcardtest',
        pass: 'Anhhoang123',
      },
    });
    // send mail with defined transport object
    return transporter.sendMail(mailData);
  }

  private async setMailContent(
    data: MailData,
  ): Promise<nodemailer.SendMailOptions> {
    switch (data.type) {
      case MailType.RESET_PASSWORD: {
        return {
          from: '"Customer Service" <no-reply@bookingcar.com>',
          to: `${data.toEmail}`,
          subject: `Please reset your password`,
          // text: `Reset password link: ${data.link}`,
          html: `<div>Reset password link: <a href="${data.link}">Reset</a></div>`,
        };
      }
      case MailType.RESET_PASSWORD_SUCCESS: {
        return {
          from: '"Customer Service" <no-reply@bookingcar.com>',
          to: `${data.toEmail}`,
          subject: `Password Reset Successful for ${data.receiverName}`,
          text: `Here is your new password: ${data.code}`,
          html: `<div>Here is your new password: <p style="color:red">${data.code}</p></div>`,
        };
      }
      case MailType.SIGNUP_SEND_CONFIRM_CODE: {
        return {
          from: '"Customer Service" <no-reply@bookingcar.com>',
          to: `${data.toEmail}`,
          subject: `Confirmation code for ${data.receiverName}`,
          text: `Verification code: ${data.verifyCode}`,
          html: `Verification code: <b style="color: red">${data.verifyCode}</b>`,
        };
      }
      default:
        break;
    }
  }
}
