export type OtpDataType = {
  subject: string;
  otp: string;
};

export type PrepareMailDataType = {
  mailRecipients: string[] | string;
  mailSubject?: string;
  mailBody: string;
  senderName: string;
  senderEmail: string;
};

export type SendMailDataType = {
  senderName: string;
  senderEmail: string;
  mailRecipients: string[] | string;
  mailSubject?: string;
  mailBody: string;
  mailAttachments?: string;
};
