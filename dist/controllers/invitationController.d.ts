import { Request, Response } from 'express';
declare const invitationController: {
    inviteTeamMember: (req: Request, res: Response) => Promise<Response>;
};
export default invitationController;
