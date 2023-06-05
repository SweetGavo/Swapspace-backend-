import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
   
   async function product(params:any) {
    try {
        await prisma.$disconnect()
    } catch (error) {
        await prisma.$disconnect()
        
    }
   }



export default prisma;

