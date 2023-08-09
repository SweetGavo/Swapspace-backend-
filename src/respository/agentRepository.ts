import { Agent } from '@prisma/client';
import prisma from '../DB/prisma';

const agentRepository = {
  createAgent: async (
    email: string,
    hashedPassword: string,
    number: string
  ) => {
    const creatAgent = await prisma.agent.create({
      data: {
        email,
        password: hashedPassword,
        number: number,
      },
    });
    return creatAgent;
  },

  getAgentId: async (agentId: number) => {
    const agent = await prisma.agent.findUnique({
      where: {
        id: agentId,
      },
    });

    if (!agent) {
      throw new Error(`Agent not found`);
    }
    return agent;
  },
  updateAgentLastLogin: async (agentId: number, formattedLastLogin: string) => {
    try {
      await prisma.agent.update({
        where: {
          id: agentId,
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

  getAgents: async () => {
    return prisma.agent.findMany({
      where: {
        type: 'AGENT',
      },
      select: {
        id: true,
        number: true,
        email: true,
        type: true,
        //     realtor: {
        //       select: {
        //         id: true,
        //         company_name: true,
        //         address: true,
        //         broker_BRN: true,
        //         agent_ORN: true,
        //         years_of_experience: true,
        //         specialty: true,
        //         role: true,
        //         language: true,
        //         description: true,
        //         license_number: true,
        //         broker_card_image: true,
        //         image: true,
        //         status: true,
        //       },
        //     },
      },
    });
  },

  getOneAgent: async (id: number) => {
    return prisma.agent.findFirst({
      where: {
        id,
        type: 'AGENT',
      },
      select: {
        id: true,
        email: true,
        number: true,
        type: true,
        // realtor: true,
      },
    });
  },

  getAgentByEmail: async (email: string): Promise<Agent | null> => {
    try {
      const user = await prisma.agent.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  },
  getAgentCount: async () => {
    const agentCount = await prisma.agent.aggregate({
      where: {
        type: 'AGENT',
      },
      _count: true,
    });
    return agentCount._count;
  },

  blockUser: async (agentId: number) => { //TODO: this agentId
    return prisma.user.update({
      where: { id: agentId },
      data: { block: true },
    });
  },

  unBlockUser: async (agentId: number) => { // TODO: agentId
    return prisma.user.update({
      where: { id: agentId },
      data: { block: false },
    });
  },

  uppdateAgentEmailVerify: async (agentId: number) => {
    return prisma.$transaction([
      prisma.agent.update({
        where: {
          id: agentId,
        },
        data: {
          verifiedEmail: true
        }
      }),
      prisma.otp.deleteMany({
        where: {
          agentId,
        },
      })
    ])
  },

  uppdateAgentNumberlVerify: async (agentId: number) => {
    return prisma.$transaction([
      prisma.agent.update({
        where: {
          id: agentId,
        },
        data: {
          verifiedNumber: true
        }
      }),
      prisma.otp.deleteMany({
        where: {
          agentId,
        },
      })
    ])
  },
  getAgentByNumber: async (number: string) => {

    const agent = await prisma.agent.findFirst({
      where: {
        number: number,
      },
    });

    return agent;
  }
  
};

export default agentRepository;
