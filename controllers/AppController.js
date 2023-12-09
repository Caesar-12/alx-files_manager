const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const AppController = {
  getStatus: async (req, res) => {
    try {
      redisStatus = redisClient.isAlive();
      dbStatus = dbClient.isAlive();
      res.status(200).json({ redis: redisStatus, db: dbStatus });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getStats: async (req, res) => {
    try {
        const uesrCount = dbClient.nbUsers();
        const fileCount = dbClient.nbFiles();

        res.status(200).json({ users: uesrCount, files: fileCount });
    } catch (error) {
        res.status(500).json({ error: error});
    }
  },
};

module.exports = AppController;