import nodemailer, { Transporter } from 'nodemailer';

import { PrepareMailDataType, SendMailDataType } from '../helpers/types';
import { configs } from '../config';

const sendEmail = async ({
  senderName,
  senderEmail,
  mailRecipients,
  mailSubject,
  mailBody,
}: SendMailDataType) => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      host: configs.MAIL_HOST,
      port: 2525,
      secure: false, // Set secure to false since STARTTLS is used
      auth: {
        user: configs.MAIL_USERNAME,
        pass: configs.MAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    const msg = {
      from: `${senderName} <${senderEmail}>`,
      to: mailRecipients,
      subject: mailSubject,
      html: mailBody,
    };
    await transporter.sendMail(msg);

    console.log('Email sent successfully, from setup');
  } catch (error) {
    console.log('Email not sent');
    console.log(error);
  }

  return { status: 'error', message: 'Failed to send email' };
};

export default sendEmail;

export const prepareMail = async ({
  mailRecipients,
  mailSubject,
  mailBody,
  senderName,
  senderEmail,
}: PrepareMailDataType) => {
  const _sendMail: any = await sendEmail({
    senderName,
    senderEmail,
    mailRecipients,
    mailSubject,
    mailBody,
  });
  return { status: 'error', message: 'Failed to send email' };
};
