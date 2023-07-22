import { EmailClient } from '@azure/communication-email';
import { configs } from '../config';
import { AzureMailDataType, PrepareAzureMailDataType } from '../helpers/types';

const connectionString = configs.AZURE_ENDPOINT;
const client = new EmailClient(connectionString);

const sendEmail = async (data: AzureMailDataType) => {
  try {
    const message = {
      senderAddress: data.senderAddress,
      content: {
        subject: data.subject,
        plainText: data.plainText,
      },
      recipients: {
        to: [
          {
            address: data.address,
            displayName: data.displayName,
          },
        ],
      },
    };

    // Send the email
    const poller = await client.beginSend(message);
    const response = await poller.pollUntilDone();
    console.log('Email sent successfully:', response);

    return { status: 'success', message: 'Email sent successfully' };
  } catch (error) {
    console.log('Failed to send email');
    console.log(error);
    return { status: 'error', message: 'Failed to send email' };
  }
};

export default sendEmail;



export const prepareMail = async ({
     senderAddress ,
     subject,
     plainText,
     address,
     displayName

}: PrepareAzureMailDataType) => {
     const _sendMail: any = await sendEmail({
          senderAddress ,
          subject,
          plainText,
          address, // users email
          displayName  
     });
     return { status: 'error', message: 'Failed to send email' };
};
