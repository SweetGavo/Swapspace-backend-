import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { prepareMail } from '../utils/sendEmail';
import { configs } from '../config';
import { InvitationTemp } from '../mailer/invitationTemplate';

const invitationController = {
  inviteTeamMember: async (req: Request, res: Response): Promise<Response> => {
    const { email, realtorId } = req.body;

    const invite = await prisma.invitation.create({
      data: {
        email,
        realtorId,
      },
    });

    // Generate the invitation link using the invitation token
    const invitationLink = `${configs.URL}/auth/co-realtor/signup`;

    const emailOptions = {
      email: email,
      subject: 'You have been invited to join your team On Swapspace',
      html: `
        <p>Use this Link <b>${invitationLink}</b>  and complete your registration. Also use this email <b>${email}</b></p>
      `,
    };
    console.log(invitationLink);

    const mailSubject = 'INVITATION';
    const mailBody1 = `${invitationLink}`;
    const mailBody2 = `${email}`;
    const mailBodyPromise = InvitationTemp({
      subject: mailSubject,
      email: mailBody2,
      invitationLink: mailBody1,
    });
    const mailBody = await mailBodyPromise;

    await prepareMail({
      mailRecipients: invite.email,
      mailSubject: mailSubject,
      mailBody: mailBody,
      senderName: configs.SENDERS_NAME,
      senderEmail: configs.SENDERS_EMAIL,
    });

    return res.status(StatusCodes.CREATED).json({
      message: 'Invitation sent successfully',
      invite,
    });
  },
};

export default invitationController;
//invite
