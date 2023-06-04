import { Request, Response } from 'express';
import prisma from '../DB/prisma';
import { StatusCodes } from 'http-status-codes';
import generateInvitationToken from '../utils/randomtoken';
import sendEmail from '../utils/sendEmail';

const invitationController = {
  inviteTeamMember: async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    const invitationToken = generateInvitationToken();

    await prisma.invitation.create({
      data: {
        email,
        token: invitationToken,
      },
    });

    // Generate the invitation link using the invitation token
    const invitationLink = `http://localhost:6001/signup?token=${invitationToken}`;

    const emailOptions = {
      email: email,
      subject: 'You have been invited to join your team On Swapspace',
      html: `<p>Click on the link <b>${invitationLink}</b>  and complete your registration.</p>
     <p>This code <b>link expires in 7 days </b>.</p>`,
    };

    await sendEmail(emailOptions);

    return res.status(StatusCodes.CREATED).json({
      message: 'Invitation sent successfully',
    });
  },
};

export default invitationController;
