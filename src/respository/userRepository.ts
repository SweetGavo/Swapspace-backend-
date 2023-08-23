import prisma from '../DB/prisma';
import { AgentDataType } from '../helpers/types';

const userRepository = {
  createUser: async (email: string, hashedPassword: string, number: string) => {
    try {
      const createdUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          number,
        },
      });
      return createdUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  createAgent: async (agentData:AgentDataType) => {
     try {
     const createdUser = await prisma.user.create({
          data: {
            email: agentData.email,
            password: agentData.password,
            number: agentData.number,
            type: agentData.type,
          },
        });
        return createdUser;
     } catch (error) {
          console.error('Error creating agent:', error);
          throw error;
        }
   },

  getUserByEmail: async (email: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  },

  getUserByNumber: async (number: string) => {
    try {
      const user = await prisma.user.findFirst({
        where: { number },
      });
      return user;
    } catch (error) {
      console.error('Error getting user by number:', error);
      throw error;
    }
  },

  getUserId: async (userId: number) => {
  
    
    
    try {
      const user = await prisma.user.findUnique({
        where: { 
          id:userId
         },
      });

      if (!user) {
        throw new Error(
           'User not found.',
        );
      }
      return user;
    } catch (error) {
      console.error('Error getting user by number:', error);
      throw error;
    }
  },

  updateUserLastLogin: async (userId: number, formattedLastLogin: string) => {
    try {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          lastLogin: formattedLastLogin,
        },
      });
    } catch (error) {
      console.error('Error updating user last login:', error);
      throw error;
    }
  },

  // updateUserId: async (userId: number) => {
  //   try {
  //     await prisma.user.update({
  //       where: {
  //         id: userId,
  //       },
  //       data: {
  //         realtorId: userId,
  //       },
        
  //     });
  //   } catch (error) {
  //     console.error('Error updating user last login:', error);
  //     throw error;
  //   }
  // },

   getAllUsers: async () => {
  return prisma.user.findMany();
},



 getUsersWhichAreUsers: async () => {
   const users = await prisma.user.findMany({
    where: {
      type: 'USER',
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

  return users.map((user) => ({
    ...user,
    profile: user.profile ?? {
      fullname: null,
      address: null,
      image: null,
    },
  }));
},

 getOneUser: async (id:number) => {
  return prisma.user.findFirst({
    where: {
      id,
      type: 'USER',
    },
    select: {
      id: true,
      email: true,
      number: true,
      type: true,
      profile: true,
    },
  });
},




 getUserCount: async () => {
   const userCount = await prisma.user.aggregate({
    where: {
      type: 'USER',
    },
    _count: true,
  });
  return userCount._count;
},

 blockUser:async (userId: number) => {
  return prisma.user.update({
    where: { id: userId },
    data: { block: true },
  });
},

 unBlockUser: async (userId: number) => {
  return prisma.user.update({
    where: { id: userId },
    data: { block: false },
  });
},
};

export default userRepository;
