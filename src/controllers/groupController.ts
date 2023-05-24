import { Request, Response } from "express";
import prisma from "../DB/prisma";
import { StatusCodes } from "http-status-codes";

const groupMembersController = {
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

      const newGroup = await prisma.group.create({
        data: {
          name: name,
          realtorId: realtorId,
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
      const groups = await prisma.group.findMany({});

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

  addmembersToGroup: async (req: Request, res: Response) => {
    try {
      const { groupId, memberId } = req.body;

      const checkId = await prisma.group.findUnique({
        where: {
          id: groupId,
        },
      });

      if (!checkId) {
        res.status(StatusCodes.NOT_FOUND).json({
          messagea: "realtor not found",
        });
      }

      const checkmemberId = await prisma.realtor.findUnique({
        where: {
          id: memberId,
        },
      });

      if (!checkmemberId) {
        res.status(StatusCodes.NOT_FOUND).json({
          messagea: "realtor not found",
        });
      }

      // Add the member to the group
      await prisma.group.update({
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
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to add member to group ",
        error: error,
      });
    }
  },
};

export default groupMembersController;
