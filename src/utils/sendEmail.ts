import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer/lib/sendmail-transport';
import { Transporter } from 'nodemailer/lib/smtp-transport';

const sendEmail = async (email: string, subject: string, text: string): Promise<void> => {
  try {
    const transporter: Transporter<SentMessageInfo> = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: `"SWAPSPACE" ${process.env.USER}`,
      to: email,
      subject: subject,
      text: text,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Email not sent');
    console.log(error);
  }
};

export default sendEmail;
