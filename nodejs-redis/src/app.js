const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const Redis = require("ioredis");

const app = express();
const redis = new Redis();

// SECURITY MIDDLEWARE
app.use(helmet());

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS WHITELIST
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// ROUTES
 app.use(require("./router/index"));


 app.get('/data', async (req, res) => {
    res.send("data");
  });



module.exports = app;