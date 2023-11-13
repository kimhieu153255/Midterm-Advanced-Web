import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '@config';
import { IDatabase } from '.';

const connectString = DB_URI;

class MongoDBDatabase implements IDatabase {
  constructor() {
    // Empty constructor is intentional
  }

  connect() {
    // dev env
    if (NODE_ENV !== 'production') {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connectString)
      .then(() => {
        console.log('Connected MongoDB Success');
      })
      .catch(err => console.error(`Connected MongoDB Failed: ${err}`));
  }

  disconnect() {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log('Disconnected MongoDB');
  }
}

export default MongoDBDatabase;
