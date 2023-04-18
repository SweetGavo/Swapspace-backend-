import { PrismaClient } from "@prisma/client"; // import prisma client
const prisma = new PrismaClient(); // create prisma client instance
export default prisma; // export prisma client instance to access anywhere
