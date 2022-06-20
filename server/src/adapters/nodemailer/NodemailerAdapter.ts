import { MailAdapter, MailAdapterData } from "../MailAdapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c6f854b44844e8",
    pass: "26369ee9254833",
  },
});

export class NodemailerAdapter implements MailAdapter {
  async sendMail({ subject, body }: MailAdapterData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Bruno Yoichi Tanaka <brunoyoichi2@gmail.com>",
      subject,
      html: body,
    });
  }
}
