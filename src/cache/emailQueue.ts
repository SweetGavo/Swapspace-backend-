// import Redis from 'ioredis';
// import { Queue, Worker } from 'bullmq';
// import sendEmail from '../utils/sendEmail';
// import { SendMailDataType } from '../helpers/types';
// import { configs } from '../config';
// import  BullBoard  from 'bull-board';

// const redis = new Redis(); // Connect to the Redis server

// const emailQueue = new Queue('emailQueue', {
//   connection: redis as any, // Use the existing Redis connection
// });

// const worker = new Worker(
//   'emailQueue',
//   async (job) => {
//     try {
//       await sendEmail(job.data);
//       console.log(`Email sent successfully for job ${job.id}`);
//     } catch (error) {
//       console.log(`Failed to send email for job ${job.id}`);
//       console.log(error);
//     }
//   },
//   {
//     connection: redis as any, // Use the existing Redis connection
//   }
// );

// //BullBoard.addQueue(emailQueue);

// export { emailQueue };
