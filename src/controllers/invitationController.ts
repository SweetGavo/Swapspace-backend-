import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import { prepareMail } from '../mailer/mailer';
import { configs } from '../config';
import { InvitationTemp } from '../mailer/invitationTemplate';

const invitationController = {
  inviteTeamMember: async (req: Request, res: Response): Promise<Response> => {
    const { email, realtorId } = req.body;

    //check realtorsID

    const ckeckRealtorID = await prisma.realtor.findFirst({
      where: {
        id: realtorId
      }
    })


    if(!ckeckRealtorID) return res.status(StatusCodes.NOT_FOUND).json({
      message: `Realtor Not found`
    })

    const invite = await prisma.invitation.create({
      data: {
        email,
        realtorId,
      },
    });
    // Generate the invitation link using the invitation token
    const invitationLink = `<a href="${configs.URL}/auth/co-realtor/signup">Click here to start your registration</a>`;

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
      senderAddress:configs.SENDERS_EMAIL,
      subject: mailSubject,
      html: mailBody,
      address:  invite.email,
      displayName: 'swapspace'
    });

    
 

    return res.status(StatusCodes.CREATED).json({
      message: 'Invitation sent successfully',
      invite,
    });
  },
};

export default invitationController;
//invite
