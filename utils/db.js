const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.URI = `mongodb://${host}:${port}/${database}`;
    this.client = new MongoClient(this.URI, { useUnifiedTopology: true });

    this.client.connect();
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const users = this.client.db().collection('users');
    return users.countDocuments();
  }

  async nbFiles() {
    const users = this.client.db().collection('files');
    return users.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
