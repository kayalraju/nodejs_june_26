
const Redis = require("ioredis");

const redis = new Redis({
  // for locally use this
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

redis.on("connect", () => {
  //on method used for event listner (aslike mongodb event listner) then connected redis print this
  console.log("Redis connected");
});

redis.on("ready", () => {
  // redis fully ready to use then print this
  console.log("Redis ready");
});

redis.on("error", (error) => {
  console.error("Redis error:", error);
});

redis.on("close", () => {
  console.log("Redis connection closed");
});

module.exports = redis;