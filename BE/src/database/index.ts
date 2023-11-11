import MongoDBDatabase from './init.mongodb';

export interface IDatabase {
  connect(): void;
  disconnect(): void;
}

class Database {
  private static instance: Database | null = null;
  private isConnected = false;

  private constructor(private database: IDatabase) {}

  public static getInstance(database: IDatabase) {
    if (!Database.instance) {
      Database.instance = new Database(database);
    }
    return Database.instance;
  }

  public connect() {
    if (!this.isConnected) {
      this.database.connect();
      this.isConnected = true;
    }
  }

  public disconnect() {
    if (this.isConnected) {
      this.database.disconnect();
      this.isConnected = false;
    }
  }
}

// Usage with MongoDB
const mongoDBInstance = Database.getInstance(new MongoDBDatabase());

export { mongoDBInstance };
