import { Request, Response } from 'express';
import prisma from '../DB/prisma';



const favorites = {
    const {}
    try {
    
        if(Saved) {
            const savedproperties = await prisma.property.findMany({
                select: {
                    id: true,
                    property_title: true,
                    property_type: true,
                    property_price: true
                }
            })
            return res.status(StatusCodes.OK).json({
                count: savedproperties.length,
                savedproperties,
            });
        }
    
      
 catch(error) {
    
        }

    }