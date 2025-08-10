import { createClient } from 'redis';

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

// Handle Redis connection success
client.on("connect", () => {
  console.log("Connected to Redis");
});

// Handle Redis connection error
client.on("error", (err) => {
  console.error("Redis error:", err);
});

// Export the Redis client for use in other parts of your app
export default client;