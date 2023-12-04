const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (error) => {
      console.error(error);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    this.client.get(key, (error, value) => {
      if (!error) {
        return value;
      }
    });
  }

  async set(key, value, duration) {
    this.client.setex(key, duration, value, (error) => {
      if (error) {
        return error;
      }
    });
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
