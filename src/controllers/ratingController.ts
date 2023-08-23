import { Request, Response } from "express";
import prisma from "../DB/prisma";
import { StatusCodes } from "http-status-codes";

const ratingController = {
 
     createRating: async (req: Request, res: Response) => {
          try {
            const { value, comment, userId, realtorId } = req.body;
      
            // Check if the user with the provided userId exists
            const user = await prisma.user.findUnique({
              where: {
                id: userId,
              },
            });
      
            if (!user) {
              return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found.",
              });
            }
      
            // Check if the realtor with the provided realtorId exists
            const realtor = await prisma.realtor.findUnique({
              where: {
                id: realtorId,
              },
            });
      
            if (!realtor) {
              return res.status(StatusCodes.NOT_FOUND).json({
                message: "Realtor not found.",
              });
            }
      
            const alreadySubmitted = await prisma.rating.findFirst({
              where: {
                realtorId: realtorId,
                userId: userId,
              },
            });
      
            if (alreadySubmitted) {
              return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Rating has already been submitted for this realtor.",
              });
            }
      
            const createdRating = await prisma.rating.create({
              data: {
                value,
                comment,
                userId,
                realtorId
                
              },
            });
      
            return res.status(StatusCodes.CREATED).json({
              message: "Rating created successfully.",
              rating: createdRating,
            });
          } catch (error) {
               console.log(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              message: "Failed to add rating.",
            });
          }
        },

  getAllRating: async (req: Request, res: Response) => {
    try {
      const ratings = await prisma.rating.findMany({
       
      });

      res.status(StatusCodes.OK).json({
        count: ratings.length,
        ratings,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to create profile.",
      });
    }
  },

  updateRating: async (req: Request, res: Response) => {
    try {
      const ratingId  = parseInt(req.params.ratingId);
    

      const { value, comment } = req.body;

      const newRating = await prisma.rating.update({
        where: {
          id: ratingId,
        },
        data: {
          comment,
          value,
        },
      });

      if (!newRating)
        return res.status(StatusCodes.NOT_FOUND).json({
          message: ` Rating not found`,
        });

      return res.status(StatusCodes.OK).json({
        message: `Rating updated successfully`,
        newRating,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to update rating.",
      });
    }
  },
  deleteRating: async (req: Request, res: Response) => {
    try {
      const ratingId = parseInt(req.params.ratingId);

      const deleteRating = await prisma.rating.delete({
        where: {
          id: ratingId,
        },
      });

      return res.status(StatusCodes.OK).json({
        message: "Profile and associated properties deleted successfully.",
        deleteRating,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to delete rating   .",
      });
    }
  },

  averageRating: async (req: Request, res: Response) => {
    try {
      

      const realtorId = parseInt(req.params.ratingId);

      const ratings = await prisma.rating.findMany({
        where: {
          realtorId: realtorId,
        },
      });

      if (!ratings || ratings.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `No ratings found for realtor with ID: ${realtorId}`,
        });
      }

      const totalRating = ratings.reduce(
        (sum: any, rating: any) => sum + rating.value,
        0
      );
      const averageRating = totalRating / ratings.length;
      console.log(averageRating);
      
      return res.status(StatusCodes.OK).json({
        message: "Average rating fetched.",
        data: averageRating,
      });
    } catch (error) {
      console.error(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to get average rating.",
      });
    }
  },

  getComment: async (req: Request, res: Response) => {
    try {
      const realtorId = parseInt(req.params.ratingId);
  
      const comments = await prisma.rating.findMany({
        where: {
          realtorId: realtorId,
        },
        select: {
          comment: true,
        },
      });
  
      if (comments.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: `No comments found for realtor with ID: ${realtorId}`,
        });
      }
  
      const commentTexts = comments.map((comment: any) => comment.comment);
  
      return res.status(StatusCodes.OK).json({
        comments: commentTexts,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to get comments for realtor.",
      });
    }
  },

  getmore: async(req: Request, res: Response) => {
    
  }

  
  
};

export default ratingController;
