// import Redis from 'ioredis';
// import sendEmail from '../utils/sendEmail';
// import { configs } from '../config';

// const redis = new Redis({
//   host: configs.REDIS_URL,
//   port: configs.REDIS_PORT,
// });

// const EMAIL_QUEUE = 'email_queue';

// const processEmailTask = async () => {
//   while (true) {
//     const serializedTask = await redis.rpop(EMAIL_QUEUE);
//     if (serializedTask) {
//       const task = JSON.parse(serializedTask);
//       await sendEmail(task);
//     }
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//   }
// };

// export { processEmailTask };
