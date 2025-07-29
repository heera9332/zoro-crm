import { createClient } from "redis";

const getRadis = async () => {
  const redis = createClient({ url: process.env.REDIS_URL });
  await redis.connect();
}

export { getRadis }