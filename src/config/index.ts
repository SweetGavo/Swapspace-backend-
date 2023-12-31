import * as dotenv from 'dotenv';

dotenv.config();

// Parse the REDIS_PORT environment variable as a number
const redisPortString = process.env.REDIS_PORT;
const redisPort = redisPortString ? parseInt(redisPortString, 10) : undefined;


const azureEndPointString = process.env.AZURE_CONNECTION_STRING
const newAzureEndPoint = azureEndPointString ? parseInt(azureEndPointString, 10) : undefined;

export const configs =  {
     JWT_SECRET: process.env.JWT_SECRET || '',
     JWT_COOKIE: process.env.JWT_COOKIE,
     ACCESS_KEY:process.env.ACCESS_KEY,
     NODE_ENV:process.env.NODE_ENV,
     CLOUD_NAME:process.env.CLOUD_NAME,
     API_KEY:process.env.API_KEY,
     API_SECRET:process.env.API_SECRET,
     REDIS_URL:process.env.REDIS_URL,
     MAIL_HOST:process.env.MAIL_HOST,
     MAIL_PORT:process.env.MAIL_PORT || 2525,
     MAIL_USERNAME:process.env.MAIL_USERNAME,
     MAIL_PASS:process.env.MAIL_PASS,
     SENDERS_NAME:process.env.SENDERS_NAME || "swapspace",
     SENDERS_EMAIL:process.env.SENDERS_EMAIL || "DoNotReply@a522d213-9d1a-4e43-881e-5bae2a415930.azurecomm.net",
     URL: process.env.URL,
     REDIS_PORT:redisPort,
     AZURE_ENDPOINT:process.env.AZURE_ENDPOINT || 'https://notification-swapspace.communication.azure.com/',
     //AZURE_CONNECTION_STRING:process.env.CONNECTION_STRING,
     AZURE_CONNECTION_STRING:newAzureEndPoint
}
