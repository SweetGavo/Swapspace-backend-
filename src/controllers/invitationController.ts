import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import sendEmail from '../utils/sendEmail';

const invitationController = {
  inviteTeamMember: async (req: Request, res: Response): Promise<Response> => {
    const { email, realtorId } = req.body;

    await prisma.invitation.create({
      data: {
        email,
        realtorId,
      },
    });

    // Generate the invitation link using the invitation token
    const invitationLink = `http://localhost:6001/api/v1/auth/co-realtor/signup`;

    const emailOptions = {
      email: email,
      subject: 'You have been invited to join your team On Swapspace',
      html: `
        <p>Use this Link <b>${invitationLink}</b>  and complete your registration. Also use this email <b>${email}</b></p>
      `,
    };
    console.log(invitationLink);
    await sendEmail(emailOptions);

    return res.status(StatusCodes.CREATED).json({
      message: 'Invitation sent successfully',
    });
  },
};

export default invitationController;
