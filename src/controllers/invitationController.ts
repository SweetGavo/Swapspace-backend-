import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prepareMail } from '../mailer/mailer';
import { configs } from '../config';
import { InvitationTemp } from '../mailer/invitationTemplate';
import agentRepository from '../respository/agentRepository';
import inviteRepository from '../respository/invitationRepository';

const invitationController = {
  inviteTeamMember: async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    const agentId = parseInt(req.params.agentId);

    //check realtorsID

    const ckeckRealtorID = await agentRepository.getOneAgent(agentId);

    if (!ckeckRealtorID)
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `Realtor Not found`,
      });

    const invite = await inviteRepository.sendInvite(email, agentId);
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
      senderAddress: configs.SENDERS_EMAIL,
      subject: mailSubject,
      html: mailBody,
      address: invite.email,
      displayName: 'swapspace',
    });

    return res.status(StatusCodes.CREATED).json({
      message: 'Invitation sent successfully',
      invite,
    });
  },

  getAllIvites: async (req: Request, res: Response): Promise<Response> => {
    const result = await inviteRepository.getAllInvites();

    return res.status(StatusCodes.OK).json({
      count: result.length,
      result,
    });
  },
  deleteInvitation: async (req: Request, res: Response): Promise<Response> => {
    const inviteId = parseInt(req.params.inviteId);

    await inviteRepository.deleteInvite(inviteId);

    return res.status(StatusCodes.OK).json({
      message: 'Invite deleted successfully',
    });
  },
};

export default invitationController;
//invite
