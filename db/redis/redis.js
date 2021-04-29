const config = require("config");
const Redis = require("ioredis");
const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
});

module.exports = redis;
