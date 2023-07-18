import prisma from "../DB/prisma";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { id } from "date-fns/locale";

const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          number: true,
          email: true,
          type: true,
         
        },
        
      }); 

      const leads = await prisma.user.findMany({
        where: {
          id:
        }
      })

      res.status(StatusCodes.OK).json({
        count: users.length,
        users,
      }); 
    } catch (error) {
      console.error("Error retrieving users:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to retrieve users" });
    }
  },

  getAgentUsers: async (req: Request, res: Response) => {
    try {
      const agents = await prisma.user.findMany({
        where: {
          type: "AGENT",
        },
        select: {
          id: true,
          number: true,
          email: true,
          type: true,
          realtor: true,
        },
      });

      res.status(StatusCodes.OK).json({
        count: agents.length,
        user: agents,
      }); // Send the users as a JSON response
    } catch (error) {
      console.error("Error retrieving users:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to retrieve users" });
    }
  },

  getUsersWhichAreUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        where: {
          type: "USER",
        },
        select: {
          id: true,
          number: true,
          email: true,
          type: true,
          profile: {
            select: {
              fullname: true,
              address: true,
              image: true,
            },
          },
        },
      });
  
      const sanitizedUsers = users.map((user: any) => ({
        ...user,
        profile: user.profile ?? {
          fullname: null,
          address: null,
          image: null,
        },
      }));
  
      res.status(StatusCodes.OK).json({
        count: sanitizedUsers.length,
        users: sanitizedUsers,
      });
    } catch (error) {
      console.error("Error retrieving users:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to retrieve users" });
    }
  },
  
  getOneUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const oneUser = await prisma.user.findFirst({
        where: {
          id: id,
          type: "USER",
        },
        select: {
          id: true,
          email: true,
          number: true,
          type: true,
          profile: true,
        },
      });

      if (!oneUser) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "User not found",
        });
      }
      return res.status(StatusCodes.OK).json({
        user: oneUser,
      });
    } catch (error) {
      console.error("Error retrieving users:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to retrieve user" });
    }
  },
  getOneAgent: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const oneAgent = await prisma.user.findFirst({
        where: {
          id: id,
          type: "AGENT",
        },
        select: {
          id: true,
          email: true,
          number: true,
          type: true,
          realtor: true,
        },
      });

      if (!oneAgent) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "User not found",
        });
      }
      return res.status(StatusCodes.OK).json({
        user: oneAgent,
      });
    } catch (error) {
      console.error("Error retrieving users:", error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to retrieve user" });
    }
  },
};

export default userController;
