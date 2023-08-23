import prisma from '../DB/prisma';

const otpRepository = {
  createOtp: async (userId: number, otp: string, otpExpiry: Date): Promise<any> => {
    try {
      return await prisma.otp.create({
        data: {
          userId: userId,
          otp: otp,
          otp_expiry: otpExpiry,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  createAgentOtp: async (agentId: number, otp: string, otpExpiry: Date): Promise<any> => {
     try {
       return await prisma.otp.create({
         data: {
          agentId: agentId,
           otp: otp,
           otp_expiry: otpExpiry,
         },
       });
     } catch (error) {
       throw error;
     }
   },

  findOtpByUserIdAndOtp: async (userId: number, otp: string): Promise<any> => {
    try {
      return await prisma.otp.findFirst({
        where: {
          userId: userId,
          otp: otp,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  findOtpByAgentIdAndOtp: async (agentId: number, otp?: string): Promise<any> => {
     try {
       return await prisma.otp.findFirst({
         where: {
           agentId: agentId,
           otp: otp,
         },
       });
     } catch (error) {
       throw error;
     }
   },

  deleteOtpByUserId: async (userId: number): Promise<void> => {
    try {
      await prisma.otp.deleteMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  deleteExpiredOtps: async (): Promise<void> => {
    try {
      const expiredOtps = await prisma.otp.findMany({
        where: {
          otp_expiry: {
            lte: new Date(), // Find OTPs that have expired
          },
        },
      });

      await prisma.otp.deleteMany({
        where: {
          id: {
            in: expiredOtps.map((otp: any) => otp.id),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  },

  updateOtp: async (otpId: number, otp: string, otpExpiry: Date): Promise<any> => {
     try {
       return await prisma.otp.update({
         where: {
           id: otpId,
         },
         data: {
           otp: otp,
           otp_expiry: otpExpiry,
         },
       });
     } catch (error) {
       throw error;
     }
   },
};

export default otpRepository;
