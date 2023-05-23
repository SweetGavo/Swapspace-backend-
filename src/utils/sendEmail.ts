import nodemailer, { Transporter } from 'nodemailer';

interface EmailOptions {
  email: string;
  subject: string;
  html: string;
}

const sendEmail = async ({ email, subject, html }: EmailOptions): Promise<void> => {
  try {
  
    const transporter: Transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 587,
      secure: true,
      auth: {
        user: 'slimnfine22@gmail.com',
        pass: 'zizyftdzapcvvhsw',
      },
    });

    await transporter.sendMail({
      from: '"SWAP SPACE" <slimnfine22@gmail.com>',
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
