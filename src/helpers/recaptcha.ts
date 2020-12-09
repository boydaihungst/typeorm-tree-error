import got from 'got';

export interface VerifyTokenResponse {
  action: string;
  score: number;
  success: true | false;
  challenge_ts: Date;
  hostname: string;
  'error-codes': string[];
}

export default class RecaptchaV3 {
  private secret: string;
  private token: string;
  private verifyApi = process.env.GOOGLE_RECAPTCHA_VERIFY_URL;

  public constructor(secretCode?: string, clientToken?: string) {
    this.secret = secretCode;
    this.token = clientToken;
  }

  public setSecret(secretCode: string) {
    this.secret = secretCode;
    return this;
  }

  public setClientToken(clientToken: string) {
    this.token = clientToken;
    return this;
  }

  public verifyToken(clientToken = this.token) {
    return got
      .post(this.verifyApi, {
        form: {
          secret: this.secret,
          response: clientToken,
        },
      })
      .json<VerifyTokenResponse>();
  }
}
