const redis = require("../config/redis");

// GET cache
const getCache = async (key) => {
  try {
    const data = await redis.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Redis GET Error:", error);
    return null;
  }
};

// SET cache
const setCache = async (key, data, expiry = 300) => {
  try {
    await redis.set(
      key,
      JSON.stringify(data),
      "EX",
      expiry
    );

    return true;
  } catch (error) {
    console.error("Redis SET Error:", error);
    return false;
  }
};

// DELETE cache
const deleteCache = async (key) => {
  try {
    await redis.del(key);

    return true;
  } catch (error) {
    console.error("Redis DELETE Error:", error);
    return false;
  }
};

module.exports = {
  getCache,
  setCache,
  deleteCache,
};