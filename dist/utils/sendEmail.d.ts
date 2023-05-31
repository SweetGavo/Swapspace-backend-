interface EmailOptions {
    email: string;
    subject: string;
    html: string;
}
declare const sendEmail: ({ email, subject, html }: EmailOptions) => Promise<void>;
export default sendEmail;
