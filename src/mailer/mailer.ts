import { EmailClient } from '@azure/communication-email';
import { configs } from '../config';
import { AzureMailDataType, PrepareAzureMailDataType } from '../helpers/types';
import { DefaultAzureCredential } from "@azure/identity";
let credential = new DefaultAzureCredential();

const connectionString = configs.AZURE_CONNECTION_STRING;
const client = new EmailClient('endpoint=https://swapcomm.unitedstates.communication.azure.com/;accesskey=NQzmSJC/YRAF5GH1QCDIQYxjDab4QGmv9y+jwHMa0n1dhYzqk3lltA8i8ttB+X+JHnYeGJK/KGWKfhv7lfgfnA==');

const sendEmail = async (data: AzureMailDataType) => {
  try {
    const message = {
      senderAddress: data.senderAddress,
      content: {
        subject: data.subject,
        html: data.html,
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
     html,
     address,
     displayName

}: PrepareAzureMailDataType) => {
     const _sendMail: any = await sendEmail({
          senderAddress ,
          subject,
          html,
          address, // users email
          displayName  
     });
     return { status: 'error', message: 'Failed to send email' };
};
