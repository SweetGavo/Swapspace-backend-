import prisma from '../DB/prisma';
import { LandLordDataType } from '../helpers/types';


const landlordRepository = {

          createProperty: async (data: LandLordDataType) => {
               return await prisma.propertyForm.create({
                 data,
               });

          },
          updatePropertyImages: async (propertyId: number, propertyImages: string[]) => {
            return await prisma.propertyForm.update({
              where: { id: propertyId },
              data: {
                images: {
                  push: propertyImages,
                },
              },
            });
          },
        
          getPropertyById: async (propertyId: number) => {
            return await prisma.propertyForm.findUnique({
              where: { id: propertyId },
            });

          },

          updatePropertyRealtor: async (propertyId: number, realtorId: number) => {
            return await prisma.propertyForm.update({
              where: { id: propertyId },
              data: {
                realtorId: realtorId,
              },
            });
          },

          getListingsByRealtorId: async (realtorId: number) => {
            return await prisma.propertyForm.findMany({
              where: {
                realtorId: realtorId,
              },
            });
          },
}


export default landlordRepository