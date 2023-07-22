import { Request, Response } from "express";
import prisma from "../DB/prisma";
import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const profileController = {
  createProfile: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { fullname, address, userId } = req.body;
      const file = req.file; // Assuming the image file is uploaded as 'file' in the request

      if (!fullname || !address || !userId || !file) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message:
            "Please provide all the required details and upload an image.",
        });
      }

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

      // Upload image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(file.path);

      const profile = await prisma.profile.create({
        data: {
          fullname,
          address,
          image: uploadedImage.secure_url, // Store the secure URL of the uploaded image
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return res.status(StatusCodes.CREATED).json({
        message: "Profile created successfully.",
        profile,
      });
    } catch (error) {
      console.log(error);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to create profile.",
      });
    }
  },

  getOneProfile: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const profile = await prisma.profile.findFirst({
        where: {
          id: id,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              number: true,
              type: true,
              verifiedEmail: true,
              verifiedNumber: true,
              
            },
          },
        },
      });

      if (!profile) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "user not found",
        });
      }

      res.status(StatusCodes.OK).json({
        user: profile,
      });
    } catch (error) {
      console.error("Error retrieving users:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to retrieve profile" });
    }
  },

  getAllProfile: async (req: Request, res: Response) => {
    try {
      const profiles = await prisma.profile.findMany({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              number: true,
              type: true,
              verifiedEmail: true,
              verifiedNumber: true,
              
            },
          },
        },
      });
  
      res.status(StatusCodes.OK).json({
        count: profiles?.length ?? 0, 
        profiles: profiles ?? [], 
      });
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to retrieve profiles" });
    }
  },

  deleteProfile: async (req: Request, res: Response) => {
    const profileId = req.params.profileId;
    //const userId = req.user.id; // Assuming the user ID is available in the request object (e.g., from authentication middleware)
  
    try {
      await prisma.$transaction(async (prisma: any) => {
        const deletedProfile = await prisma.profile.delete({
          where: {
            id: profileId,
          },
        });
  
        //Delete other related properties associated with the user
        await prisma.property.deleteMany({
          where: {
            userId: profileId,
          },
        });
  
        return res.status(StatusCodes.OK).json({
          message: "Profile and associated properties deleted successfully.",
          deletedProfile,
        });
      });
    } catch (error) {
      console.error(error);
  
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Failed to delete profile and associated properties.",
      });
    }
  },
  

  updateProfile: async (req: Request, res: Response) => {
  try {
    const profileId = req.params.profileId;
    const { fullname, address } = req.body;

    const updatedProfile = await prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        fullname: fullname, 
        address: address, 
      },
    });

    return res.status(StatusCodes.OK).json({
      message: "Profile updated successfully.",
      updatedProfile,
    });
  } catch (error) {
    console.error(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to update profile.",
    });
  }
},
 

  
};

export default profileController;
