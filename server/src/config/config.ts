import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.12rzz.mongodb.net/drawGuessDb`

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

export const config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: PORT,
    }
}