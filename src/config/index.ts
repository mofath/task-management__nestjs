import * as dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

if (envFound.error) {
  // This error should crash whole process
  throw new Error(`⚠️  Couldn't find .env.${process.env.NODE_ENV} file  ⚠️`);
}

export const config = () => ({
  PORT: parseInt(process.env.SERVER_PORT, 10) || 3030,
  DATABASE: require('./sequelize.config').default[process.env.NODE_ENV],
});
