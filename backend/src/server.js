import 'dotenv/config';
import { app } from './app.js';
import redisClient from './config/redis.js';

const port = Number(process.env.PORT || 3000);

redisClient.connect()   
  .then(() => {
    app.listen(port, () => {
      console.log(`API listening on ${port}`);
    });
  })
  .catch((error) => {
    console.error("Redis connection failed:", error);
    process.exit(1);
  });
