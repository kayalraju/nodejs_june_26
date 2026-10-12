require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/dbCon");
const redis = require("./src/config/redis");

const PORT = process.env.PORT || 5002;

// START SERVER AFTER DB CONNECT
const startServer = async () => {
  await connectDB();

  // Check Redis connection
  await redis.ping();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();