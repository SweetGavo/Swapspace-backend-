import { Request, Response } from "express";
import prisma from "../DB/prisma";
import { StatusCodes } from "http-status-codes";

const teamController = {
  createGroup: async (req: Request, res: Response) => {
    try {
      const { name, realtorId } = req.body;

      const checkCrator = await prisma.realtor.findUnique({
        where: {
          id: realtorId,
        },
      });

      if (!checkCrator) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `Realtor ${realtorId} not found`,
        });
      }

      const newGroup = await prisma.team.create({
        data: {
          name: name,
          realtorId: realtorId,
          status: "CREATOR",
        },
      });

      return res.status(StatusCodes.CREATED).json({
        message: `Group ${name} created`,
        data: newGroup,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to create group",
        error: error,
      });
    }
  },

  getAllGroups: async (req: Request, res: Response) => {
    try {
      const groups = await prisma.team.findMany({
        include: {
          members: true,
        },
      });

      res.status(StatusCodes.OK).json({
        data: groups,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to fetch all groups",
        error: error,
      });
    }
  },

  addMembersToGroup: async (req: Request, res: Response) => {
    try {
      const { groupId, memberId } = req.body;

      const group = await prisma.team.findUnique({
        where: {
          id: groupId,
        },
        include: {
          members: true,
        },
      });

      if (!group) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Group not found",
        });
      }
      const isCreator = group.status === "CREATOR";

      if (!isCreator) {
        return res.status(StatusCodes.FORBIDDEN).json({
          message: "Only the group creator can add members",
        });
      }

      const memberExists = group.members.some(
        (member: any) => member.id === memberId
      );

      if (memberExists) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Member is already added to the group",
        });
      }

      const member = await prisma.coRealtor.findUnique({
        where: {
          id: memberId,
        },
      });

      if (!member) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "co-Realtor not found",
        });
      }

      // Add the member to the group
      await prisma.team.update({
        where: {
          id: groupId,
        },
        data: {
          members: {
            connect: {
              id: memberId,
            },
          },
        },
      });

      return res.status(StatusCodes.OK).json({
        message: "Member added to the group successfully",
      });
    } catch (error) {
      console.error("Failed to add member to group:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to add member to group",
        error: error,
      });
    }
  },
};

export default teamController;
