export interface MailgunAuth {
    auth: {
        api_key: string;
        domain: string;
    }
}

export const mailgunAuth: MailgunAuth = {
  auth: {
    api_key: '',
    domain: '',
  },
};
