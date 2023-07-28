import prisma from '../DB/prisma';
import { RealtorDataType } from '../helpers/types';


const realtorRepository = {
     createAgentProfile: async (realtorData: RealtorDataType) => {
          try {
            return prisma.realtor.create({
              data: realtorData, // Pass realtorData directly as the data parameter
            });
          } catch (error) {
            console.error('Error creating agent profile:', error);
            throw error;
          }
        },
        
        updateUserWithRealtorId: async (userId: number, realtorId: number) => {
          try {
            return prisma.user.update({
              where: { id: userId },
              data: { realtorId },
            });
          } catch (error) {
            console.error('Error updating user with realtorId:', error);
            throw error;
          }
        },
        
        
         updateAgentProfileImage:async (userId:number, imageUrl: string) => {
          return prisma.realtor.update({
            where: { userId },
            data: { image: imageUrl },
          });
        },

         getAllRealtors: async (page:number, ITEMS_PER_PAGE:number) => {
          const skip = (page - 1) * ITEMS_PER_PAGE;
          const realtors = await prisma.realtor.findMany({
            skip: skip,
            take: ITEMS_PER_PAGE,
          });
        
          const totalCount = await prisma.realtor.count();
          const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
        
          return { realtors, totalPages };
        },
        
         getOneRealtor: async (id:number) => {
          return prisma.realtor.findUnique({
            where: {
              id: id,
            },
            
          });
        },

         
          getRealtorByUserId: async (userId: number) => {
            return prisma.realtor.findUnique({
              where: { userId },
            });
          },
        
         deleteRealtor: async (id:number) => {
          return prisma.realtor.delete({
            where: {
              id: id,
            },
          });
        }
}



export default realtorRepository;