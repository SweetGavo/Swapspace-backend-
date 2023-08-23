import prisma from '../DB/prisma';
import { PropertyDataType } from '../helpers/types';

const propertyRepository = {
  addProperty: async (propertyDataType: PropertyDataType) => {
    try {
      const newProperty = await prisma.property.create({
        data: {
          ...propertyDataType,
          agentId: propertyDataType.agentId, 
        },
      });
  
      return newProperty;
    } catch (error) {
      console.error('Error adding a property:', error);
      throw new Error('Failed to add a property');
    }
  },
  
  
  
  getAllProperties: async () => {
    try {
      const properties = await prisma.property.findMany({ take: 10 });

      return properties;
    } catch (error) {
      console.error('Error retrieving properties:', error);
      throw new Error('Failed to retrieve properties');
    }
  },
  getPropertyById: async (propertyId: number) => {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });
    return property;
  },

  updatePropertyImages: async (propertyId: number, images: string[]) => {
    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: {
        images: {
          push: images,
        },
      },
    });
    return updatedProperty;
  },


 getFilteredProperties: async (filters: any, skip: number, take: number) => {
    const properties = await prisma.property.findMany({
      where: filters,
      skip,
      take,
    });
    return properties;
  },
  
 getTotalFilteredProperties:  async (filters: any) => {
    const totalProperty = await prisma.property.count({
      where: filters,
    });
    return totalProperty;
  }
  ,

  updateProperty: async(id: number, data: any) => {
    const updatedProperty = await prisma.property.update({
      where: {
        id,
      },
      data,
    });
  
    return updatedProperty;
  },
  updateLeads: async(userId: number, propertyId: number)=> {
    const checkUserId = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  
    if (!checkUserId) {
      throw new Error('User not found');
    }
  
    const existingProperty = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });
  
    if (!existingProperty) {
      throw new Error('Property not found');
    }
  
    // Check if the user has already viewed the property
    const hasViewed = existingProperty.view_by_user.includes(userId);
    if (!hasViewed) {
      // Update the view_count and view_by_user fields
      const updateViewAndCount = await prisma.property.update({
        where: {
          id: propertyId,
        },
        data: {
          view_count: { increment: 1 },
          view_by_user: { push: userId },
        },
      });
  
      // TODO: Email & Notifications
    }
  },
   getLeads: async (agentId: number)=> {
    const realtorLeads = await prisma.property.findMany({
      where: {
        agentId: agentId,
      },
      select: {
        id: true,
        view_count: true,
        view_by_user: true,
      },
    });
  
    let result = realtorLeads.filter(
      (lead) => lead.view_count !== null || lead.view_by_user !== null
    );
  
    return result;
  }
};

export default propertyRepository;
