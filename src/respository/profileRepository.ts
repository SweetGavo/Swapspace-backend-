import prisma from '../DB/prisma';

const profileRepository = {
  createProfile: async (
    fullname: string,
    address: string,
    userId: number,
    imageUrl: string
  ) => {
    return prisma.profile.create({
      data: {
        fullname,
        address,
        image: imageUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  },

  getOneProfile: async (id: number) => {
    return prisma.profile.findFirst({
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
  },

  getAllProfiles: async () => {
    return prisma.profile.findMany({
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
  },

  deleteProfileAndRelatedProperties: async (profileId: number) => {
    await prisma.$transaction(async (prisma) => {
      const deletedProfile = await prisma.profile.delete({
        where: {
          id: profileId,
        },
      });

      // Delete other related properties associated with the user
      await prisma.property.deleteMany({
        where: {
          agentId: profileId,
        },
      });

      return deletedProfile;
    });
  },

  updateProfile: async (
    profileId: number,
    fullname: string,
    address: string
  ) => {
    return prisma.profile.update({
      where: {
        id: profileId,
      },
      data: {
        fullname,
        address,
      },
    });
  },
};

export default profileRepository;
