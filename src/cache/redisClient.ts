// import  Redis  from 'ioredis';
// import { promisify } from 'util';

// // Create the Redis client
// const redisClient = new Redis({
//      host: 'localhost', // Redis server host
//      port: 6379, // Redis server port
// });



// redisClient.on('error', err => console.log('Redis Client Error', err))



// // Default expiration time for cached data (2 hours)
// const DEFAULT_EXPIRATION = 7200; // en seconds

// // Function to get or set cache
// export function getOrSetCache(key: any , cb: any) {
//     return new Promise(async (resolve, reject) => {
//         // Try to get data from Redis using the provided key
//         const data = await redisClient.get(key)
//             .catch(error => {
//                 console.log(error);
//                 return reject(error);
//             })

//             console.log(data);

//         // If data exists in cache, parse and return it
//         if (data) return resolve(JSON.parse(data));

//         // If data doesn't exist in cache, invoke the callback function (cb) to fetch fresh data
//         const freshData = await cb();

//         // Store the fresh data in Redis cache with the specified key and expiration time
//         redisClient.set(key, JSON.stringify(freshData), 'EX', DEFAULT_EXPIRATION);

//         // Resolve the promise with the fresh data
//         resolve(freshData);
//     })
// }

// // Function to clear the entire cache
// export async function clearCache() {
//     console.log("cache cleared");
//     // Flush all keys from the Redis cache
//     await redisClient.flushall();
// }

