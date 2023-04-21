export default {
  // port: 4000,
  port: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  BASE_PATH: process.env.BASE_PATH || "/api/v1",
};
