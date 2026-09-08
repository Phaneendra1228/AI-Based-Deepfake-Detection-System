import mongoose from 'mongoose';

let isConnected = false;

export const connectDatabase = async (): Promise<boolean> => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/deepguard';

  try {
    mongoose.connection.on('connected', () => {
      isConnected = true;
      console.log('✅ [MongoDB] Connected successfully to:', uri.replace(/\/\/[^@]+@/, '//***@'));
    });

    mongoose.connection.on('error', (err) => {
      isConnected = false;
      console.error('❌ [MongoDB] Connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('⚠️ [MongoDB] Disconnected from database.');
    });

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      dbName: 'deepguard',
    });

    isConnected = true;
    return true;
  } catch (error: any) {
    isConnected = false;
    console.error('⚠️ [MongoDB] Warning: Could not connect to MongoDB at', uri);
    console.error('   Reason:', error.message);
    console.log('ℹ️ [MongoDB] Tip: Ensure MongoDB service is running locally, or supply a MongoDB Atlas connection string in server/.env');
    return false;
  }
};

export const isDbConnected = (): boolean => isConnected;
