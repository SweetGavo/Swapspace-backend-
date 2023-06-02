import nodemailer, { Transporter } from 'nodemailer';

interface EmailOptions {
  email: string;
  subject: string;
  html: string;
}

const sendEmail = async ({ email, subject, html }: EmailOptions): Promise<void> => {
  try {
  
    const transporter: Transporter = nodemailer.createTransport({
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
      from: `"SWAP SPACE" ${process.env.USER}`,
      to: email,
      subject: subject,
      html: html,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.log('Email not sent');
    console.log(error);
  }
};

export default sendEmail;
