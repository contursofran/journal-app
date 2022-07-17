import dotenv from "dotenv";

dotenv.config();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST } = process.env;
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 3001;

export const config = {
  mongo: {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
